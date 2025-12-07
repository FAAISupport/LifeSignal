// src/checkinEngine.ts
import { pool } from "./db";
import { sendCheckinSms } from "./twilioClient";

/**
 * Create a checkin row (e.g., from your scheduler) for a given subscription.
 */
export async function createCheckin(
  subscriptionId: string,
  options: { scheduledAt: Date; channel?: "sms" | "voice" } 
) {
  const client = await pool.connect();
  try {
    const { scheduledAt, channel = "sms" } = options;

    // Grab senior info + phone from subscription
    const subRes = await client.query(
      `
      SELECT s.id AS senior_id, s.phone_number
      FROM subscriptions sub
      JOIN seniors s ON s.id = sub.senior_id
      WHERE sub.id = $1
      `,
      [subscriptionId]
    );

    if (subRes.rowCount === 0) {
      throw new Error("Subscription not found for createCheckin");
    }

    const { senior_id, phone_number } = subRes.rows[0];

    const insertRes = await client.query(
      `
      INSERT INTO checkins (
        subscription_id,
        senior_id,
        channel,
        scheduled_at,
        status
      )
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING id, scheduled_at;
      `,
      [subscriptionId, senior_id, channel, scheduledAt]
    );

    return insertRes.rows[0];
  } finally {
    client.release();
  }
}

/**
 * Send all due checkins: status = 'pending' AND scheduled_at <= now()
 * Marks them as 'sent' and stores Twilio SID.
 */
export async function sendDueCheckins() {
  const client = await pool.connect();
  try {
    // Get pending, due checkins + senior phone numbers
    const res = await client.query(
      `
      SELECT c.id, c.scheduled_at, s.phone_number, s.name AS senior_name
      FROM checkins c
      JOIN seniors s ON s.id = c.senior_id
      WHERE c.status = 'pending'
      AND c.scheduled_at <= now()
      ORDER BY c.scheduled_at ASC
      LIMIT 50;
      `
    );

    for (const row of res.rows) {
      const { id, phone_number, senior_name } = row;
      const body = `Hi ${senior_name}, this is LifeSignal. Please reply YES to confirm you're okay today.`;

      try {
        const message = await sendCheckinSms(phone_number, body);

        await client.query(
          `
          UPDATE checkins
          SET status = 'sent',
              sent_at = now(),
              twilio_sid = $1
          WHERE id = $2;
          `,
          [message.sid, id]
        );
      } catch (err) {
        console.error("Failed to send SMS for checkin", id, err);
        // You could mark as failed or leave as pending to retry.
      }
    }
  } finally {
    client.release();
  }
}

/**
 * Mark missed checkins and create alerts for contacts.
 * "Missed" = sent, no response, and scheduled_at is more than 30 min ago.
 */
export async function processMissedCheckins() {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `
      SELECT c.id AS checkin_id,
             c.subscription_id,
             c.senior_id,
             s.name AS senior_name,
             s.location AS senior_location
      FROM checkins c
      JOIN seniors s ON s.id = c.senior_id
      WHERE c.status = 'sent'
        AND c.responded_at IS NULL
        AND c.scheduled_at < now() - interval '30 minutes';
      `
    );

    for (const row of res.rows) {
      const { checkin_id, subscription_id, senior_name, senior_location } = row;

      // Get contacts for this subscription's account
      const contactsRes = await client.query(
        `
        SELECT ct.id, ct.phone_number, ct.name
        FROM subscriptions sub
        JOIN accounts a ON a.id = sub.account_id
        JOIN contacts ct ON ct.account_id = a.id
        WHERE sub.id = $1
          AND ct.phone_number IS NOT NULL;
        `,
        [subscription_id]
      );

      // Mark checkin as missed
      await client.query(
        `
        UPDATE checkins
        SET status = 'missed'
        WHERE id = $1;
        `,
        [checkin_id]
      );

      for (const contact of contactsRes.rows) {
        const alertText = `LifeSignal: We could not confirm today's check-in for ${senior_name} (${senior_location}). Please call or check on them.`;

        try {
          if (contact.phone_number) {
            await sendCheckinSms(contact.phone_number, alertText);
          }

          await client.query(
            `
            INSERT INTO alerts (checkin_id, contact_id, type, status)
            VALUES ($1, $2, 'missed_checkin', 'sent');
            `,
            [checkin_id, contact.id]
          );
        } catch (err) {
          console.error("Failed to send alert for checkin", checkin_id, err);
          await client.query(
            `
            INSERT INTO alerts (checkin_id, contact_id, type, status)
            VALUES ($1, $2, 'missed_checkin', 'failed');
            `,
            [checkin_id, contact.id]
          );
        }
      }
    }
  } finally {
    client.release();
  }
}
