import * as React from "react";
import { cn } from "@/lib/utils";
export const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea className={cn("w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm", className)} {...props} />;
