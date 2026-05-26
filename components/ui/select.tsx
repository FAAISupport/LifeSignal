import * as React from "react";

type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
};

export const Select = ({ children }: SelectProps) => <div>{children}</div>;
export const SelectTrigger = ({ children, ...props }: any) => <button className="rounded border border-slate-700 px-2 py-1" {...props}>{children}</button>;
export const SelectValue = ({ placeholder }: { placeholder?: string }) => <span>{placeholder ?? "Select"}</span>;
export const SelectContent = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const SelectItem = ({ children, ...props }: any) => <div {...props}>{children}</div>;
