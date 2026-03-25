import { hasActiveMessagingConsent } from "@/lib/compliance/consent";

export async function assertMessagingConsentOrThrow(phone: string) {
  const ok = await hasActiveMessagingConsent(phone);

  if (!ok) {
    throw new Error(`Blocked outbound message. No active messaging consent for ${phone}.`);
  }
}

export async function canSendLifecycleMessage(phone: string): Promise<boolean> {
  return hasActiveMessagingConsent(phone);
}