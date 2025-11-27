"use client";

import React from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  accent?: string; // Tailwind color class for accent border or background
}

/**
 * SummaryCard displays a title and a value in a compact card.
 * Kept simple — swap to a more complex chart or sparkline later.
 */
export default function SummaryCard({ title, value, accent = "border-indigo-500" }: SummaryCardProps) {
  return (
    <div className={`rounded-lg border ${accent} bg-white dark:bg-slate-900 p-4 shadow-sm`}> 
      <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
      <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
    </div>
  );
}
