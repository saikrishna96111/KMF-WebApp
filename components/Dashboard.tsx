"use client";

import React from "react";
import { staticDashboardData } from "@/lib/staticDashboardData";
import SummaryCard from "@/components/SummaryCard";
import AlertList from "@/components/AlertList";
import KPISection from "@/components/KPISection";
import QuickActions from "@/components/QuickActions";

// Dashboard: high-level component assembling components and data.
export default function Dashboard() {
  const { summary, alerts, kpis } = staticDashboardData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">Overview & quick insights</p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Last updated: Now</div>
      </header>

      {/* Top summary cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Sales" value={summary.totalSales} accent="border-indigo-500" />
        <SummaryCard title="Milk Procurement Volume" value={summary.milkProcurementVolume} accent="border-emerald-500" />
        <SummaryCard title="Production Output Today" value={summary.productionOutputToday} accent="border-blue-500" />
        <SummaryCard title="Current Finance Balance" value={summary.currentFinanceBalance} accent="border-yellow-400" />
      </section>

      {/* Alerts + KPIs + Quick actions layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AlertList items={alerts} />
          <div className="mt-6">
            <QuickActions />
          </div>
        </div>

        <div className="lg:col-span-2">
          <KPISection
            milkVolumeTrend={kpis.milkVolumeTrend}
            revenueTrend={kpis.revenueTrend}
            qualityRatio={kpis.qualityRatio}
          />
        </div>
      </section>
    </div>
  );
}
