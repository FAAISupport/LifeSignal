import * as React from "react";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={[
        "rounded-xl border border-gray-200 bg-white p-4 shadow-sm",
        className,
      ].join(" ")}
      {...props}
    />
  );
}