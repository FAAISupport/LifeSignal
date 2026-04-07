import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  await supabase.from("inbound_leads").insert({
    name: body.name,
    church_name: body.churchName,
    email: body.email,
    phone: body.phone,
    source: body.source || "landing_page",
  });

  return new Response("ok");
}



