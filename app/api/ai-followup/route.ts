export async function POST(req: Request) {
  const { message } = await req.json();

  // VERY SIMPLE AI RESPONSE (upgrade later)
  let reply = "Would you like me to show you how this works for your church?";

  if (message.toLowerCase().includes("price")) {
    reply = "Most churches start around $79–$199/month depending on size.";
  }

  if (message.toLowerCase().includes("not interested")) {
    reply = "Totally understand. If anything changes, I’m here.";
  }

  return Response.json({ reply });
}
