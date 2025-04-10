
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
import { format } from "date-fns";

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card text-card-foreground p-3 shadow rounded border border-border">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm font-medium text-lv-gold">
            {payload[0].value} transactions
          </p>
        </div>
      );
    }
    return null;
  };

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
              <CartesianGrid strokeDasharray="3 3" stroke="#E2DED5" />
              <XAxis 
                dataKey="date" 
                angle={-45} 
                textAnchor="end" 
                height={60}
                tick={{ fontSize: 12 }}
                stroke="#7C7166"
              />
              <YAxis 
                label={{ 
                  value: 'Number of Transactions', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
                stroke="#7C7166"
                domain={[50, 300]} // Setting y-axis domain between 50-300
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="count" 
                name="Transactions" 
                fill="#B99F65" 
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="transactionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#B99F65" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#B99F65" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
