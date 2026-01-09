import * as React from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-2xl font-medium transition " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    "disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-brand-navy text-white hover:opacity-95",
    secondary: "bg-brand-blue/10 text-brand-navy hover:bg-brand-blue/15",
    ghost: "bg-transparent text-brand-navy hover:bg-brand-blue/10",
    outline:
      "bg-transparent border border-brand-blue/30 text-brand-navy hover:bg-brand-blue/10",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      type={type}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export default Button;
