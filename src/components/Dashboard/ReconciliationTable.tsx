
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
  FilterIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

export interface Transaction {
  id: string;
  productName: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  storeLocation: string;
  // Added new fields
  rrn?: string;
  cardNumber?: string;
  servedBy?: string;
  paymentMethod?: string;
  notes?: string;
}

interface ReconciliationTableProps {
  transactions: Transaction[];
  formatCurrency: (value: number) => string;
}

export function ReconciliationTable({
  transactions,
  formatCurrency,
}: ReconciliationTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Calculate total number of pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Get current transactions to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle view details click
  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailsOpen(true);
  };

  return (
    <>
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
                <TableHead>RRN</TableHead>
                <TableHead>Served By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
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
                          : transaction.status === "refund"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.rrn || "N/A"}</TableCell>
                  <TableCell>{transaction.servedBy || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => handleViewDetails(transaction)}
                      >
                        View Details
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, transactions.length)} of{" "}
              {transactions.length} transactions
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Previous
              </Button>
              <span className="flex items-center px-3">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                Next
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Transaction Details
              <DialogClose className="h-4 w-4 opacity-70" />
            </DialogTitle>
            <DialogDescription>
              {/* Complete information about transaction {selectedTransaction?.id} */}
            </DialogDescription>
          </DialogHeader>

          {selectedTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">ID:</div>
                <div className="col-span-3">{selectedTransaction.id}</div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Product:</div>
                <div className="col-span-3">
                  {selectedTransaction.productName}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Customer:</div>
                <div className="col-span-3">{selectedTransaction.customer}</div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Date:</div>
                <div className="col-span-3">{selectedTransaction.date}</div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Amount:</div>
                <div className="col-span-3">
                  {formatCurrency(selectedTransaction.amount)}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Status:</div>
                <div className="col-span-3">
                  <Badge
                    variant={
                      selectedTransaction.status === "completed"
                        ? "default"
                        : selectedTransaction.status === "pending"
                        ? "secondary"
                        : selectedTransaction.status === "refund"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {selectedTransaction.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Store:</div>
                <div className="col-span-3">
                  {selectedTransaction.storeLocation}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">RRN:</div>
                <div className="col-span-3">
                  {selectedTransaction.rrn || "N/A"}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Card Number:</div>
                <div className="col-span-3">
                  {selectedTransaction.cardNumber || "N/A"}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Served By:</div>
                <div className="col-span-3">
                  {selectedTransaction.servedBy || "N/A"}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Payment Method:</div>
                <div className="col-span-3">
                  {selectedTransaction.paymentMethod || "Credit Card"}
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <div className="font-semibold text-left">Notes:</div>
                <div className="col-span-3">
                  {selectedTransaction.notes || "No additional notes"}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={() => setIsDetailsOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
