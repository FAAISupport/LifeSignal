import * as React from "react";

export type Variant =
  | "default"
  | "outline"
  | "ghost"
  | "secondary"
  | "destructive"
  | "link"
  | "soft";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variants: Record<Variant, string> = {
  default: "bg-brand-navy text-white hover:opacity-90",
  outline: "border border-brand-navy/20 bg-white hover:bg-brand-mist",
  ghost: "hover:bg-brand-mist",
  secondary: "bg-brand-mist text-brand-navy hover:opacity-90",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  link: "underline underline-offset-4 hover:opacity-80 bg-transparent",
  soft: "bg-brand-blue/10 text-brand-navy hover:bg-brand-blue/15",
};

function cn(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({ variant = "default", className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
    />
  );
}
