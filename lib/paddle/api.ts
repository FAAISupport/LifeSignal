function getPaddleApiBaseUrl() {
  const environment =
    process.env.PADDLE_ENV ||
    process.env.NEXT_PUBLIC_PADDLE_ENV ||
    "sandbox";

  return environment === "production"
    ? "https://api.paddle.com"
    : "https://sandbox-api.paddle.com";
}

export async function paddleFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.PADDLE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing PADDLE_API_KEY");
  }

  const response = await fetch(`${getPaddleApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Paddle API request failed: ${response.status} ${text}`);
  }

  return (await response.json()) as T;
}

export const paddleApiFetch = paddleFetch;

export { getPaddleApiBaseUrl };

