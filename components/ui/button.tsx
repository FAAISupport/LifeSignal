import * as React from "react";
import { cn } from "@/lib/utils";

export function Button({ className, variant, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }) {
  return <button className={cn("rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-black", className)} {...props} />;
}
