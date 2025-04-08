
import { useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { MetricCard } from "@/components/Dashboard/MetricCard";
import { ReconciliationTable } from "@/components/Dashboard/ReconciliationTable";
import { StoreComparisonChart } from "@/components/Dashboard/StoreComparisonChart";
import { ExportReportDialog } from "@/components/Dashboard/ExportReportDialog";
import { 
  BarChart3Icon, 
  CircleDollarSignIcon, 
  FileDownIcon,
  ShoppingBagIcon, 
  UsersIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for store comparison
const storeComparisonData = [
  { name: "Mon", johannesburg: 40000, capeTown: 24000 },
  { name: "Tue", johannesburg: 30000, capeTown: 27000 },
  { name: "Wed", johannesburg: 45000, capeTown: 33000 },
  { name: "Thu", johannesburg: 50000, capeTown: 29000 },
  { name: "Fri", johannesburg: 65000, capeTown: 43000 },
  { name: "Sat", johannesburg: 75000, capeTown: 55000 },
  { name: "Sun", johannesburg: 60000, capeTown: 40000 },
];

// Mock data for reconciliation report
const reconciliationData = [
  {
    id: "1",
    date: "2025-04-07",
    expectedRevenue: 356200,
    actualRevenue: 356200,
    variance: 0,
    status: "balanced" as const,
    store: "Johannesburg"
  },
  {
    id: "2",
    date: "2025-04-07",
    expectedRevenue: 244500,
    actualRevenue: 238750,
    variance: -5750,
    status: "warning" as const,
    store: "Cape Town"
  },
  {
    id: "3",
    date: "2025-04-06",
    expectedRevenue: 412300,
    actualRevenue: 396800,
    variance: -15500,
    status: "critical" as const,
    store: "Johannesburg"
  },
  {
    id: "4",
    date: "2025-04-06",
    expectedRevenue: 287600,
    actualRevenue: 302400,
    variance: 14800,
    status: "warning" as const,
    store: "Cape Town"
  },
  {
    id: "5",
    date: "2025-04-05",
    expectedRevenue: 368900,
    actualRevenue: 368900,
    variance: 0,
    status: "balanced" as const,
    store: "Johannesburg"
  },
];

const Index = () => {
  const [userRole, setUserRole] = useState<"admin" | "store-manager">("admin");
  const [selectedStore, setSelectedStore] = useState<string>("all");

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-medium text-lv-brown">Dashboard Overview</h1>
            <p className="text-muted-foreground">Welcome back to your Louis Vuitton sales overview</p>
          </div>
          <ExportReportDialog 
            trigger={
              <Button className="bg-lv-gold hover:bg-lv-gold/90 text-black">
                <FileDownIcon className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            }
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Today's Sales"
            value="R356,200"
            icon={<CircleDollarSignIcon className="h-4 w-4" />}
            change={12}
            changeText="from yesterday"
          />
          <MetricCard
            title="Weekly Revenue"
            value="R2,432,678"
            icon={<BarChart3Icon className="h-4 w-4" />}
            change={5.3}
            changeText="from last week"
          />
          <MetricCard
            title="Products Sold"
            value="236"
            icon={<ShoppingBagIcon className="h-4 w-4" />}
            change={-2.3}
            changeText="from yesterday"
          />
          <MetricCard
            title="Store Visitors"
            value="845"
            icon={<UsersIcon className="h-4 w-4" />}
            change={8.1}
            changeText="from yesterday"
          />
        </div>

        <div className="mb-8">
          <StoreComparisonChart data={storeComparisonData} />
        </div>

        <ReconciliationTable data={reconciliationData} />

        <div className="mt-8 text-xs text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Louis Vuitton. All rights reserved.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
