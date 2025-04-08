
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";
import { TransactionsTable } from "@/components/Dashboard/TransactionsTable";
import { ActivityFeed } from "@/components/Dashboard/ActivityFeed";
import { activitiesData, revenueData, transactionsData } from "@/data/dashboardData";
import { BarChart3Icon, DollarSignIcon, ShoppingBagIcon, UsersIcon } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-medium text-lv-brown">Financial Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to your Louis Vuitton sales overview</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Today's Revenue"
            value="€156,200"
            icon={<DollarSignIcon className="h-4 w-4" />}
            change={12}
            changeText="from yesterday"
          />
          <MetricCard
            title="Weekly Sales"
            value="€945,678"
            icon={<BarChart3Icon className="h-4 w-4" />}
            change={5.3}
            changeText="from last week"
          />
          <MetricCard
            title="Products Sold"
            value="5,426"
            icon={<ShoppingBagIcon className="h-4 w-4" />}
            change={-2.3}
            changeText="from yesterday"
          />
          <MetricCard
            title="Active Customers"
            value="3,856"
            icon={<UsersIcon className="h-4 w-4" />}
            change={8.1}
            changeText="from last month"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <RevenueChart data={revenueData} className="md:col-span-2" />
          <ActivityFeed activities={activitiesData} />
        </div>

        <TransactionsTable transactions={transactionsData} />

        <div className="mt-8 text-xs text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Louis Vuitton. All rights reserved.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
