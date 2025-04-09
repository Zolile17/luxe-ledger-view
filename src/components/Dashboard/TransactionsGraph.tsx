
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";
import { Transaction } from "@/components/Dashboard/TransactionsTable";
import { useEffect, useState } from "react";

interface TransactionsGraphProps {
  transactions: Transaction[];
  className?: string;
}

interface TransactionsByDate {
  date: string;
  count: number;
}

export function TransactionsGraph({ transactions, className }: TransactionsGraphProps) {
  const [graphData, setGraphData] = useState<TransactionsByDate[]>([]);

  useEffect(() => {
    // Group transactions by date and count them
    const transactionsByDate = transactions.reduce((acc: Record<string, number>, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += 1;
      return acc;
    }, {});

    // Convert to array for the chart
    const dataArray = Object.entries(transactionsByDate).map(([date, count]) => ({
      date,
      count,
    }));

    // Sort by date
    dataArray.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    setGraphData(dataArray);
  }, [transactions]);

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Transaction Volume</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={graphData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 25,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                label={{ 
                  value: 'Number of Transactions', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }} 
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-md">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">Date:</span>
                          <span>{payload[0].payload.date}</span>
                          <span className="font-medium">Transactions:</span>
                          <span>{payload[0].value}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Transactions" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
