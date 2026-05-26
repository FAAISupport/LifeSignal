import * as React from "react";
import { cn } from "@/lib/utils";
export function Badge({ className, ...props }: any) { return <span className={cn("inline-flex rounded-full bg-slate-700 px-2 py-0.5 text-xs", className)} {...props} />; }
