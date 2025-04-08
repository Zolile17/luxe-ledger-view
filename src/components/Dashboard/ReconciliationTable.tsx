
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { 
  FileDownIcon, 
  FilterIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReconciliationItem {
  id: string;
  date: string;
  expectedRevenue: number;
  actualRevenue: number;
  variance: number;
  status: "balanced" | "warning" | "critical";
  store: string;
}

interface ReconciliationTableProps {
  data: ReconciliationItem[];
  className?: string;
}

export function ReconciliationTable({ data, className }: ReconciliationTableProps) {
  // Calculate variance percentage
  const getVariancePercentage = (expected: number, actual: number) => {
    if (expected === 0) return 0;
    return ((actual - expected) / expected) * 100;
  };

  // Determine status badge styling
  const getStatusBadge = (status: ReconciliationItem["status"]) => {
    switch (status) {
      case "balanced":
        return <Badge className="bg-emerald-600">Balanced</Badge>;
      case "warning":
        return <Badge className="bg-lv-gold text-black">Review</Badge>;
      case "critical":
        return <Badge className="bg-red-600">Critical</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
    }).format(amount);
  };

  return (
    <Card className={cn("shadow-md overflow-hidden", className)}>
      <CardHeader className="bg-background pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-lv-brown">
          Reconciliation Report
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="h-8">
            <FilterIcon className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-8">
            <FileDownIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Expected Revenue</TableHead>
                <TableHead>Actual Revenue</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => {
                const variancePercentage = getVariancePercentage(
                  item.expectedRevenue,
                  item.actualRevenue
                );
                const isNegative = item.variance < 0;

                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.store}</TableCell>
                    <TableCell>{formatCurrency(item.expectedRevenue)}</TableCell>
                    <TableCell>{formatCurrency(item.actualRevenue)}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-medium",
                          isNegative ? "text-red-600" : "text-emerald-600"
                        )}
                      >
                        {isNegative ? "-" : "+"}
                        {formatCurrency(Math.abs(item.variance))} ({Math.abs(variancePercentage).toFixed(2)}%)
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
