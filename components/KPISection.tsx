"use client";

import React from "react";

interface KPISectionProps {
  milkVolumeTrend: { labels: string[]; values: number[] };
  revenueTrend: { labels: string[]; values: number[] };
  qualityRatio: { good: number; poor: number };
}

/**
 * KPISection displays placeholder areas for three charts.
 * Replace the placeholder divs with real charting components in the future.
 */
export default function KPISection({ milkVolumeTrend, revenueTrend, qualityRatio }: KPISectionProps) {
  return (
    <div className="rounded-lg bg-white dark:bg-slate-900 p-4 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Key Performance Indicators</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-44 bg-gray-50 dark:bg-slate-800 rounded flex flex-col p-3">
          <div className="text-sm text-gray-500">Milk volume trend</div>
          <div className="flex-1 mt-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 rounded"></div>
          <div className="mt-2 text-xs text-gray-500">Static sample values: {milkVolumeTrend.values.join(", ")}</div>
        </div>

        <div className="h-44 bg-gray-50 dark:bg-slate-800 rounded flex flex-col p-3">
          <div className="text-sm text-gray-500">Revenue trend</div>
          <div className="flex-1 mt-2 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-slate-700 dark:to-slate-800 rounded"></div>
          <div className="mt-2 text-xs text-gray-500">Static sample values: {revenueTrend.values.join(", ")}</div>
        </div>

        <div className="h-44 bg-gray-50 dark:bg-slate-800 rounded flex flex-col p-3">
          <div className="text-sm text-gray-500">Quality issue ratio</div>
          <div className="flex-1 mt-2 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-700 dark:to-slate-800 rounded"></div>
          <div className="mt-2 text-xs text-gray-500">Good: {qualityRatio.good}% • Poor: {qualityRatio.poor}%</div>
        </div>
      </div>
    </div>
  );
}
