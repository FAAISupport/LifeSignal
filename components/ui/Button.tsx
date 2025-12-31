import React from "react";

type Variant = "primary" | "ghost" | "soft" | "danger";

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
) {
  const { variant = "primary", className = "", ...rest } = props;

  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    "disabled:opacity-60 disabled:cursor-not-allowed";

  const styles =
    variant === "primary"
      ? "bg-brand-blue text-white shadow-glow hover:bg-brand-navy"
      : variant === "soft"
      ? "bg-brand-blue/10 text-brand-navy hover:bg-brand-blue/15"
      : variant === "danger"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-transparent text-brand-navy hover:bg-brand-blue/10";

  return <button className={`${base} ${styles} ${className}`} {...rest} />;
}
