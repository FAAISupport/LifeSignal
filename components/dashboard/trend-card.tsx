type TrendPoint = {
  label?: string;
  value?: string | number;
};

type TrendCardProps = {
  title?: string;
  value?: string;
  trend?: string;
  description?: string;
  text?: string;
  points?: TrendPoint[];
};

export function TrendCard({
  title,
  value,
  trend,
  description,
  text,
  points = []
}: TrendCardProps) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-sm opacity-70">{title ?? "Trend"}</div>
      {value ? <div className="mt-2 text-2xl font-semibold">{value}</div> : null}
      {trend ? <div className="mt-1 text-sm">{trend}</div> : null}
      {description ? <div className="mt-2 text-sm opacity-70">{description}</div> : null}
      {text ? <div className="mt-2 text-sm opacity-70">{text}</div> : null}
      {points.length > 0 ? (
        <div className="mt-4 space-y-2">
          {points.map((point, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span>{point.label ?? ""}</span>
              <span>{point.value ?? ""}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}


