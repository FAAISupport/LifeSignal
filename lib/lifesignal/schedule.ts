export function withinCheckinWindow(now: Date, startHour: number, endHour: number) {
  const hour = now.getUTCHours();
  return hour >= startHour && hour <= endHour;
}
