import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={[
        "w-full rounded-2xl border border-neutral-200 bg-white px-3 py-2 text-sm",
        "shadow-sm outline-none transition",
        "placeholder:text-neutral-400",
        "focus:border-brand-blue/40 focus:ring-2 focus:ring-brand-blue/20",
        "disabled:cursor-not-allowed disabled:bg-neutral-50",
        className
      ].join(" ")}
    />
  );
}
