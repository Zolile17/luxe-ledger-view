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
import { Transaction } from "./TransactionsTable";

interface ReconciliationTableProps {
  transactions: Transaction[];
  formatCurrency: (value: number) => string;
}

export function ReconciliationTable({ transactions, formatCurrency }: ReconciliationTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Reconciliation</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.productName}</TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      transaction.status === "completed"
                        ? "default"
                        : transaction.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.storeLocation}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <button className="text-sm text-blue-600 hover:underline">
                      View Details
                    </button>
                    <button className="text-sm text-green-600 hover:underline">
                      Reconcile
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
