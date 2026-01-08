export const publicEnv = {
  PADDLE_ENV: process.env.NEXT_PUBLIC_PADDLE_ENV ?? "sandbox",
  PADDLE_CLIENT_TOKEN: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN ?? ""
};
