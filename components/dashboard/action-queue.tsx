type ActionItem = {
  id?: string | number;
  title?: string;
  description?: string;
  due?: string;
  status?: string;
};

type ActionQueueProps = {
  title?: string;
  items?: ActionItem[];
};

export function ActionQueue({ title, items = [] }: ActionQueueProps) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-lg font-semibold">{title ?? "Action Queue"}</div>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm opacity-70">No actions queued.</div>
        ) : (
          items.map((item, index) => (
            <div key={item.id ?? index} className="rounded-lg border p-3">
              <div className="font-medium">{item.title ?? "Untitled action"}</div>
              {item.description ? (
                <div className="mt-1 text-sm opacity-70">{item.description}</div>
              ) : null}
              <div className="mt-2 text-xs opacity-60">
                {item.due ? `Due: ${item.due}` : (item.status ?? "")}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
