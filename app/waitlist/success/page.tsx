import Link from "next/link";

type Props = {
  searchParams?: {
    code?: string;
    email?: string;
    rank?: string;
  };
};

export default function Page({ searchParams }: Props) {
  const code = searchParams?.code ?? "";
  const email = searchParams?.email ?? "";
  const rank = searchParams?.rank ?? "";

  const sharePath = code ? "/beta?ref=" + encodeURIComponent(code) : "/beta";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-bold">You are on the list 🎉</h1>

        <p className="mt-4 text-slate-300">
          LifeSignal keeps people safe with daily check-ins and smart escalation.
        </p>

        <div className="mt-6 space-y-2 text-sm">
          <div>Code: {code || "Pending"}</div>
          <div>Email: {email || "N/A"}</div>
          <div>Rank: {rank || "Updating"}</div>
        </div>

        <div className="mt-6">
          <Link href={sharePath} className="text-emerald-400 underline">
            Share your referral link
          </Link>
        </div>
      </div>
    </main>
  );
}
