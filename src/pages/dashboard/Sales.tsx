import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, DownloadIcon, FilterIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState } from "react";
import { addDays } from "date-fns";

// Mock data for sales reports
const salesData = [
  { date: "2024-01-01", sales: 12000, orders: 45 },
  { date: "2024-01-02", sales: 15000, orders: 52 },
  { date: "2024-01-03", sales: 18000, orders: 60 },
  { date: "2024-01-04", sales: 14000, orders: 48 },
  { date: "2024-01-05", sales: 16000, orders: 55 },
  { date: "2024-01-06", sales: 20000, orders: 65 },
  { date: "2024-01-07", sales: 22000, orders: 70 },
];

const topProducts = [
  { name: "Neverfull MM Tote", sales: 25000, units: 15 },
  { name: "Speedy 30 Handbag", sales: 18000, units: 12 },
  { name: "Capucines MM Bag", sales: 15000, units: 8 },
  { name: "Horizon 55 Luggage", sales: 12000, units: 4 },
  { name: "Tambour Watch", sales: 10000, units: 2 },
];

export default function SalesPage() {
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-medium text-lv-brown">
              Sales Reports
            </h1>
            <p className="text-muted-foreground">
              Analyze and track your sales performance
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
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$117,000</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">355</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$3,296</div>
              <p className="text-xs text-muted-foreground">
                +4.1% from last period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8%</div>
              <p className="text-xs text-muted-foreground">
                +0.5% from last period
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#D4AF37" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.units} units sold
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(product.sales)}</p>
                      <p className="text-sm text-muted-foreground">
                        {((product.sales / 117000) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
} 