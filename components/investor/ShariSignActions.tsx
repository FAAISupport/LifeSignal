"use client";

import { useMemo, useState } from "react";

type ShariSignActionsProps = {
  title: string;
  fileUrl: string;
  advisorUrl: string;
};

export default function ShariSignActions({
  title,
  fileUrl,
  advisorUrl
}: ShariSignActionsProps) {
  const [selectedAction, setSelectedAction] = useState<"" | "choose" | "advisor" | "sign">("");
  const [copied, setCopied] = useState<"" | "choose" | "advisor" | "sign">("");

  const messages = useMemo(() => {
    return {
      choose: {
        subject: `I want to move forward with the ${title}`,
        body: `Hi Judd,

I reviewed the ${title} and I want to move forward with this structure.

Please prepare this version as the final agreement for signature.

Thanks,
Shari`
      },
      advisor: {
        subject: `Please review this ${title}`,
        body: `Hi,

I reviewed this investment option and would like you to review it before I move forward.

Selected document:
${fileUrl}

Advisor review page:
${advisorUrl}

Please let me know if you have any concerns or recommended changes.

Thank you,
Shari Shaw`
      },
      sign: {
        subject: `I am ready to sign the ${title}`,
        body: `Hi Judd,

I reviewed the ${title} and I am ready to sign this version.

Please send me the final signature-ready copy and next steps for the first funding tranche.

Thanks,
Shari`
      }
    };
  }, [title, fileUrl, advisorUrl]);

  async function copyText(value: string, kind: "choose" | "advisor" | "sign") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("");
    }
  }

  function mailto(subject: string, body: string) {
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5">
        <div className="text-lg font-semibold text-emerald-100">1. I choose this structure</div>
        <p className="mt-2 text-sm leading-6 text-emerald-50/90">
          Confirms this is the preferred version and asks for the final signature-ready copy.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedAction("choose")}
            className="rounded-xl bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950"
          >
            Select this option
          </button>
          <a
            href={mailto(messages.choose.subject, messages.choose.body)}
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
          >
            Open email draft
          </a>
          <button
            type="button"
            onClick={() => copyText(messages.choose.body, "choose")}
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
          >
            {copied === "choose" ? "Copied" : "Copy email"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-5">
        <div className="text-lg font-semibold text-cyan-100">2. Send this to my advisor</div>
        <p className="mt-2 text-sm leading-6 text-cyan-50/90">
          Forwards the selected structure and advisor review link for outside review before signing.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedAction("advisor")}
            className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950"
          >
            Select this option
          </button>
          <a
            href={mailto(messages.advisor.subject, messages.advisor.body)}
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
          >
            Open advisor draft
          </a>
          <button
            type="button"
            onClick={() => copyText(messages.advisor.body, "advisor")}
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
          >
            {copied === "advisor" ? "Copied" : "Copy advisor email"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 p-5">
        <div className="text-lg font-semibold text-amber-100">3. I’m ready to sign</div>
        <p className="mt-2 text-sm leading-6 text-amber-50/90">
          Confirms review is complete and requests the final signature-ready execution step.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setSelectedAction("sign")}
            className="rounded-xl bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-950"
          >
            Select this option
          </button>
          <a
            href={mailto(messages.sign.subject, messages.sign.body)}
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
          >
            Open signing draft
          </a>
          <button
            type="button"
            onClick={() => copyText(messages.sign.body, "sign")}
            className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white"
          >
            {copied === "sign" ? "Copied" : "Copy signing email"}
          </button>
        </div>
      </div>

      {selectedAction ? (
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <div className="text-sm uppercase tracking-[0.18em] text-slate-400">Current selection</div>
          <div className="mt-3 text-base font-semibold text-white">
            {selectedAction === "choose" && "Selected: I choose this structure"}
            {selectedAction === "advisor" && "Selected: Send this to my advisor"}
            {selectedAction === "sign" && "Selected: I’m ready to sign"}
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Use the matching email draft above to send the next step immediately.
          </p>
        </div>
      ) : null}
    </div>
  );
}
