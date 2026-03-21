const nonDigits = /\D+/g;

export function normalizePhoneNumber(phone: string): string {
  const raw = phone.trim();
  if (!raw) {
    throw new Error('Phone number is required.');
  }

  if (raw.startsWith('+')) {
    const digits = `+${raw.slice(1).replace(nonDigits, '')}`;
    if (digits.length < 8 || digits.length > 16) {
      throw new Error('Phone number must be a valid E.164 number.');
    }
    return digits;
  }

  const digits = raw.replace(nonDigits, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  throw new Error('Phone number must include a country code or be a valid 10-digit US number.');
}
