import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";
import { ActivityFeed } from "@/components/Dashboard/ActivityFeed";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { DownloadIcon, FilterIcon, CircleDollarSignIcon, BarChart3Icon, ShoppingBagIcon, UsersIcon } from "lucide-react";
import { useState } from "react";
import { isWithinInterval, parseISO } from "date-fns";
import { getRevenueData } from "@/data/dashboardData";
import { activitiesData } from "@/data/dashboardData";
import { DateRange } from "react-day-picker";

export default function OverviewPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date("2024-01-01"),
    to: new Date("2024-01-14"),
  });

  const allRevenueData = getRevenueData("All Stores");
  const filteredRevenueData = allRevenueData.filter((item) => {
    const itemDate = parseISO(item.date);
    return isWithinInterval(itemDate, { start: dateRange.from!, end: dateRange.to! });
  });

  const totalRevenue = filteredRevenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSales = filteredRevenueData.length;
  const averageOrder = totalRevenue / totalSales;
  const newCustomers = Math.floor(totalSales * 0.2); // Assuming 20% of sales are from new customers

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-medium text-lv-brown">
              Dashboard Overview
            </h1>
            <p className="text-muted-foreground">
              Welcome to your luxury retail dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
            />
            <Button variant="outline">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-lv-gold hover:bg-lv-gold/90 text-black">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Sales"
            value={formatCurrency(totalRevenue)}
            change={12.5}
            changeText="vs last period"
            icon={<CircleDollarSignIcon className="h-4 w-4" />}
          />
          <MetricCard
            title="Sales Count"
            value={totalSales.toString()}
            change={8.2}
            changeText="vs last period"
            icon={<BarChart3Icon className="h-4 w-4" />}
          />
          <MetricCard
            title="Average Order"
            value={formatCurrency(averageOrder)}
            change={4.1}
            changeText="vs last period"
            icon={<ShoppingBagIcon className="h-4 w-4" />}
          />
          <MetricCard
            title="New Customers"
            value={newCustomers.toString()}
            change={15.3}
            changeText="vs last period"
            icon={<UsersIcon className="h-4 w-4" />}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <RevenueChart data={filteredRevenueData} />
          <ActivityFeed activities={activitiesData} />
        </div>
      </div>
    </DashboardLayout>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(value);
} 