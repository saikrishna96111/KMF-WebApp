"use client";

import React from "react";

interface QuickActionsProps {
  onCreateIndent?: () => void;
  onGenerateInvoice?: () => void;
  onAddProcurement?: () => void;
}

/**
 * QuickActions shows a set of prominent action buttons. Callbacks provided are optional and currently just log actions.
 */
export default function QuickActions({ onCreateIndent, onGenerateInvoice, onAddProcurement }: QuickActionsProps) {
  return (
    <div className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Quick Actions</h3>
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => { (onCreateIndent || (() => console.log("Create Indent")))(); }}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm"
        >
          + Create Indent
        </button>

        <button
          onClick={() => { (onGenerateInvoice || (() => console.log("Generate Invoice")))(); }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md shadow-sm"
        >
          + Generate Invoice
        </button>

        <button
          onClick={() => { (onAddProcurement || (() => console.log("Add Procurement")))(); }}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-sm"
        >
          + Add Procurement Entry
        </button>
      </div>
    </div>
  );
}
