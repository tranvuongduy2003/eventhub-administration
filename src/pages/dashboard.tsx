import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { LowStockTable } from "@/components/dashboard/low-stock-table";
import { RecentOrdersTable } from "@/components/dashboard/recent-orders-table";
import { RevenueDistributionChart } from "@/components/dashboard/revenue-distribution-chart";
import { SalesOverviewChart } from "@/components/dashboard/sales-overview-chart";

export default function DashboardPage() {
  const salesData = [
    { name: "Jan", total: 4500 },
    { name: "Feb", total: 3800 },
    { name: "Mar", total: 6000 },
    { name: "Apr", total: 5400 },
    { name: "May", total: 7300 },
    { name: "Jun", total: 6800 },
  ];

  const revenueData = [
    { name: "Electronics", value: 45 },
    { name: "Clothing", value: 25 },
    { name: "Accessories", value: 20 },
    { name: "Other", value: 10 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your e-commerce overview
          </p>
        </div>
      </div>

      <DashboardStats />

      <div className="grid gap-6 md:grid-cols-2">
        <SalesOverviewChart data={salesData} />
        <RevenueDistributionChart data={revenueData} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentOrdersTable />
        <LowStockTable />
      </div>
    </div>
  );
}
