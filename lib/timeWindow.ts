export function isWithinWindow(
  scheduled: Date,
  now: Date,
  windowMinutes: number
) {
  const diffMs = now.getTime() - scheduled.getTime();
  if (diffMs < 0) return false;
  return diffMs <= windowMinutes * 60 * 1000;
}
