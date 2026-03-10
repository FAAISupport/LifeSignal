import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function JoinReferralPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const cleanCode = (code || "").trim().toUpperCase();

  redirect(`/beta?ref=${encodeURIComponent(cleanCode)}`);
}