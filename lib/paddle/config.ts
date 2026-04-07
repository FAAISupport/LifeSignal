export type PaddleEnv = "sandbox" | "production";

export const PADDLE_ENV: PaddleEnv =
  process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox" ? "sandbox" : "production";

export const PADDLE_CLIENT_SIDE_TOKEN =
  process.env.NEXT_PUBLIC_PADDLE_CLIENT_SIDE_TOKEN ?? "";

export const PADDLE_API_KEY = process.env.PADDLE_API_KEY ?? "";
export const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET ?? "";

export const PADDLE_PRICE_IDS = {
  lifesignalFamilyMonthly:
    process.env.NEXT_PUBLIC_PADDLE_PRICE_LIFESIGNAL_FAMILY_MONTHLY ?? "",
  lifesignalCaregiverMonthly:
    process.env.NEXT_PUBLIC_PADDLE_PRICE_LIFESIGNAL_CAREGIVER_MONTHLY ?? "",
  faithsignalChurchMonthly:
    process.env.NEXT_PUBLIC_PADDLE_PRICE_FAITHSIGNAL_CHURCH_MONTHLY ?? "",
  faithsignalPastoralRounds:
    process.env.NEXT_PUBLIC_PADDLE_PRICE_FAITHSIGNAL_PASTORAL_ROUNDS ?? "",
} as const;

export function getPaddleApiBaseUrl() {
  return PADDLE_ENV === "sandbox"
    ? "https://sandbox-api.paddle.com"
    : "https://api.paddle.com";
}

export function isPaddleConfigured() {
  return Boolean(
    PADDLE_CLIENT_SIDE_TOKEN &&
      PADDLE_API_KEY &&
      PADDLE_WEBHOOK_SECRET
  );
}

