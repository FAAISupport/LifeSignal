import * as React from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

  const variants: Record<string, string> = {
    default: "bg-slate-700 text-white",
    secondary: "bg-slate-500 text-white",
    success: "bg-emerald-500/20 text-emerald-300",
    warning: "bg-amber-500/20 text-amber-300",
    destructive: "bg-red-500/20 text-red-300",
  };

  return (
    <span
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}
