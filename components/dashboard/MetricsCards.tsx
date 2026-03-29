export type MetricCard = {
  label: string;
  value: string;
  helper?: string;
};

export function MetricsCards({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{metric.label}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{metric.value}</p>
          {metric.helper ? <p className="mt-1 text-xs text-gray-500">{metric.helper}</p> : null}
        </article>
      ))}
    </div>
  );
}
