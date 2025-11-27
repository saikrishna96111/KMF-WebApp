"use client";

import React from "react";

interface AlertListProps {
  items: string[];
}

/**
 * AlertList renders a simple list of alerts. Each item should be clickable
 * to navigate to a detailed view in future versions.
 */
export default function AlertList({ items }: AlertListProps) {
  return (
    <div className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Real-time Alerts</h3>
      <ul className="mt-3 divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((a, idx) => (
          <li key={idx} className="py-2 text-sm text-gray-700 dark:text-gray-200">
            • {a}
          </li>
        ))}
      </ul>
    </div>
  );
}
