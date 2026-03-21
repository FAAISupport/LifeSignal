import { env } from '@/lib/env';

export function isAuthorizedCronRequest(request: Request): boolean {
  const expected = env.cronSecret;
  if (!expected) {
    return false;
  }

  const header = request.headers.get('authorization');
  const bearer = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
  const direct = request.headers.get('x-cron-secret');
  return bearer === expected || direct === expected;
}

export function assertAuthorizedCronRequest(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    throw new Error('Unauthorized cron request.');
  }
}
