// src/server.ts
import express from "express";
import cors from "cors";
import { pool } from "./db";
import { sendDueCheckins, processMissedCheckins } from "./checkinEngine";
import bodyParser from "body-parser"; // at top

// Add this BEFORE routes:
app.use("/webhooks/twilio", bodyParser.urlencoded({ extended: false }));

// Twilio will POST here for incoming SMS
app.post("/webhooks/twilio/sms", async (req, res) => {
  const from = req.body.From as string | undefined;
  const body = (req.body.Body as string | undefined)?.trim().toUpperCase();

  if (!from) {
    return res.status(400).send("Missing From");
  }

  const client = await pool.connect();
  try {
    if (body === "YES" || body === "Y" || body === "OK") {
      // Find the most recent 'sent' checkin for this phone in the last 24 hours
      const result = await client.query(
        `
        SELECT c.id
        FROM checkins c
        JOIN seniors s ON s.id = c.senior_id
        WHERE s.phone_number = $1
          AND c.status IN ('sent','pending')
          AND c.scheduled_at > now() - interval '24 hours'
        ORDER BY c.scheduled_at DESC
        LIMIT 1;
        `,
        [from]
      );

      if (result.rowCount > 0) {
        const checkinId = result.rows[0].id;
        await client.query(
          `
          UPDATE checkins
          SET status = 'ok',
              responded_at = now()
          WHERE id = $1;
          `,
          [checkinId]
        );
      }
    }

    // Twilio expects some response; simple empty 200 is fine
    res.set("Content-Type", "text/plain");
    return res.send("OK");
  } catch (err) {
    console.error("Error handling Twilio SMS webhook:", err);
    return res.status(500).send("Error");
  } finally {
    client.release();
  }
});


const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "Senior Safety Backend" });
});

// POST /api/leads
app.post("/api/leads", async (req, res) => {
  try {
    const {
      contact_name,
      contact_email,
      senior_name,
      senior_location,
      plan_code,
      source,
    } = req.body || {};
// Trigger sending due checkins (could be called by cron)
app.post("/internal/checkins/run", async (_req, res) => {
  try {
    await sendDueCheckins();
    return res.json({ ok: true });
  } catch (err: any) {
    console.error("Error running sendDueCheckins:", err);
    return res.status(500).json({ error: err?.message || "Error sending due checkins" });
  }
});

// Trigger missed-check processing (could be separate cron)
app.post("/internal/checkins/sweep-missed", async (_req, res) => {
  try {
    await processMissedCheckins();
    return res.json({ ok: true });
  } catch (err: any) {
    console.error("Error running processMissedCheckins:", err);
    return res.status(500).json({ error: err?.message || "Error processing missed checkins" });
  }
});

    // Basic validation
    if (!contact_name || !contact_email || !senior_name || !plan_code) {
      return res.status(400).json({
        error:
          "Missing required fields (contact_name, contact_email, senior_name, plan_code).",
      });
    }

    // Insert into the leads table
    const result = await pool.query(
      `
      INSERT INTO leads (
        contact_name,
        contact_email,
        senior_name,
        senior_location,
        plan_code,
        source
      )
      VALUES ($1, $2, $3, $4, $5, COALESCE($6, 'lifesignal-site'))
      RETURNING id, created_at, status;
    `,
      [
        contact_name,
        contact_email,
        senior_name,
        senior_location || null,
        plan_code,
        source || "lifesignal-site",
      ],
    );

    const lead = result.rows[0];

    return res.status(201).json({
      ok: true,
      lead,
    });
    } catch (err: any) {
    console.error("Error creating lead:", err);
    return res.status(500).json({
      error: err?.message || "Internal server error while creating lead.",
    });
  }

});

app.listen(PORT, () => {
  console.log(`Senior Safety backend running on http://localhost:${PORT}`);
});
