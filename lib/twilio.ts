import { env } from '@/lib/env';

export type TwilioSendResult = {
  sid: string;
  status: string;
  to: string;
  direction?: string;
};

function requireTwilioConfig() {
  if (!env.twilioAccountSid || !env.twilioAuthToken || !env.twilioPhoneNumber) {
    throw new Error('Twilio is not fully configured.');
  }

  return {
    accountSid: env.twilioAccountSid,
    authToken: env.twilioAuthToken,
    fromPhoneNumber: env.twilioPhoneNumber,
  };
}

function formBody(values: Record<string, string>) {
  const body = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    body.set(key, value);
  }
  return body;
}

export async function sendSms(params: {
  to: string;
  body: string;
  statusCallback?: string;
}) {
  const config = requireTwilioConfig();
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.accountSid}:${config.authToken}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody({
        To: params.to,
        From: config.fromPhoneNumber,
        Body: params.body,
        ...(params.statusCallback ? { StatusCallback: params.statusCallback } : {}),
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio SMS send failed (${response.status}): ${errorText}`);
  }

  const payload = (await response.json()) as TwilioSendResult;
  return payload;
}

export async function placeVoiceCall(params: {
  to: string;
  twimlUrl: string;
  statusCallback?: string;
}) {
  const config = requireTwilioConfig();
  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Calls.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${config.accountSid}:${config.authToken}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody({
        To: params.to,
        From: config.fromPhoneNumber,
        Url: params.twimlUrl,
        ...(params.statusCallback ? { StatusCallback: params.statusCallback } : {}),
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Twilio voice call failed (${response.status}): ${errorText}`);
  }

  const payload = (await response.json()) as TwilioSendResult;
  return payload;
}
