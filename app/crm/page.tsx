"use client";

import { useState } from "react";

export default function CRMPage() {
  const [number, setNumber] = useState("");

  function call() {
    window.location.href = `tel:${number}`;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Church Outreach CRM</h1>

      <input
        className="border p-2 mt-4"
        placeholder="Enter phone number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <button
        onClick={call}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Call Church
      </button>
    </div>
  );
}



