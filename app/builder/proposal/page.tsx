import { Suspense } from "react";
import ProposalPageClient from "./ProposalPageClient";

export default function ProposalPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading proposal builder...</div>}>
      <ProposalPageClient />
    </Suspense>
  );
}
