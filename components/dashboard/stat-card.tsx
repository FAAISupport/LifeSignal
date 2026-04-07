type StatCardProps = {
  label?: string;
  value?: string;
  description?: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-sm opacity-70">{label ?? "Stat"}</div>
      <div className="mt-2 text-2xl font-semibold">{value ?? "--"}</div>
      <div className="mt-2 text-sm opacity-70">{description ?? ""}</div>
    </div>
  );
}


