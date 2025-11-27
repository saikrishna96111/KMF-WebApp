export const staticDashboardData = {
  summary: {
    totalSales: "₹ 1,25,40,000",
    milkProcurementVolume: "58,000 Liters",
    productionOutputToday: "45,500 Liters",
    currentFinanceBalance: "₹ 87,30,000",
  },
  alerts: [
    "Low stock alert for Packaging Material (SKU-PACK-01)",
    "Pending route confirmation for Route 08",
    "Unapproved contractor bill #CB1005",
  ],
  kpis: {
    milkVolumeTrend: {
      // Static sample values to be fed to charts in future
      values: [48000, 50000, 47000, 45500, 46000, 45000, 45500],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    revenueTrend: {
      values: [1200000, 1400000, 1350000, 1250000, 1320000, 1300000, 1500000],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    qualityRatio: {
      good: 92,
      poor: 8,
    },
  },
};
