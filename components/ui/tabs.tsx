import * as React from "react";
export const Tabs = ({ children, ...props }: any) => <div {...props}>{children}</div>;
export const TabsList = ({ children, ...props }: any) => <div className="flex gap-2" {...props}>{children}</div>;
export const TabsTrigger = ({ children, ...props }: any) => <button className="rounded bg-slate-800 px-2 py-1" {...props}>{children}</button>;
export const TabsContent = ({ children, ...props }: any) => <div {...props}>{children}</div>;
