"use client";

import * as React from "react";

export default function DashboardClientUX({ created }: { created: boolean }) {
  React.useEffect(() => {
    if (!created) return;
    const el = document.getElementById("checklist");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [created]);

  return null;
}
