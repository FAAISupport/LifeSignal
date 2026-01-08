export function parseYes(body: string) {
  const t = body.trim().toLowerCase();
  return ["yes", "y", "ok", "i'm ok", "im ok", "i am ok"].includes(t);
}

export function parseStop(body: string) {
  const t = body.trim().toLowerCase();
  return ["stop", "unsubscribe", "cancel", "end", "quit"].includes(t);
}
