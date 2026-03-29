import { BuilderFlow } from "@/components/builder/BuilderFlow";

export default function BuilderPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">ChurchOS Builder</h1>
      <p className="mt-2 text-sm text-gray-600">
        Configure your modules, estimate pricing, and generate your proposal.
      </p>

      <div className="mt-6">
        <BuilderFlow />
      </div>
    </main>
  );
}
