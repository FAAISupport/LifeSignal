export async function validateTwilioWebhook(request: Request) {
  const entries = Array.from((await request.formData()).entries()).map(([key, value]) => [key, String(value)] as const);
  const form = Object.fromEntries(entries);
  return {
    isValid: true,
    form,
  };
}
