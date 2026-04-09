import Link from "next/link";
import { redirect } from "next/navigation";
import ShariSignActions from "@/components/investor/ShariSignActions";
import { isShariPortalAuthorized } from "@/lib/investor/shari-access";

function getDocMeta(doc?: string) {
  switch (doc) {
    case "equity":
      return {
        title: "Investment Agreement",
        file: "/investor/shari/docs/Investment_Agreement.pdf",
        description: "Direct ownership structure based on the original discussion."
      };
    case "safe":
      return {
        title: "SAFE Agreement",
        file: "/investor/shari/docs/SAFE_Agreement.pdf",
        description: "Startup-friendly structure with flexible future valuation."
      };
    case "note":
      return {
        title: "Convertible Note",
        file: "/investor/shari/docs/Convertible_Note.pdf",
        description: "More structured investment format with conversion mechanics."
      };
    default:
      return null;
  }
}

export default async function SignPage({ searchParams }: any) {
  const token = searchParams?.token || "";
  const doc = searchParams?.doc || "";
  const meta = getDocMeta(doc);

  if (!isShariPortalAuthorized(token)) {
    redirect("/");
  }

  if (!meta) {
    redirect(token ? `/investor/shari?token=${encodeURIComponent(token)}` : "/investor/shari");
  }

  const backHref = token
    ? `/investor/shari?token=${encodeURIComponent(token)}`
    : "/investor/shari";

  const advisorUrl = token
    ? `/investor/shari?token=${encodeURIComponent(token)}&stage=advisor`
    : "/investor/shari?stage=advisor";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
            Signature Preparation
          </div>

          <h1 className="mt-4 text-4xl font-bold">{meta.title}</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{meta.description}</p>

          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
            <div className="text-lg font-semibold text-cyan-100">Selected version</div>
            <p className="mt-2 text-sm leading-6 text-cyan-50/90">
              This is the selected structure for the next step. Review the document, then choose whether to move forward, send it to an advisor, or request the final signing copy.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={meta.file}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950"
            >
              Review selected document
            </a>

            <Link
              href={backHref}
              className="inline-flex rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white"
            >
              Back to investor portal
            </Link>
          </div>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Choose the next action</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            This section lets Shari take the exact next step without confusion.
          </p>

          <div className="mt-6">
            <ShariSignActions
              title={meta.title}
              fileUrl={meta.file}
              advisorUrl={advisorUrl}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Suggested flow</div>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
            <div>1. Review the selected document carefully</div>
            <div>2. Decide whether to move forward directly or ask for advisor review</div>
            <div>3. Send the matching email draft immediately</div>
            <div>4. Finalize the signature-ready version</div>
            <div>5. Begin the first funding tranche</div>
          </div>
        </section>
      </section>
    </main>
  );
}
