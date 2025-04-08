
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileExportIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExportReportDialogProps {
  trigger?: React.ReactNode;
}

export function ExportReportDialog({ trigger }: ExportReportDialogProps) {
  const [reportType, setReportType] = useState("sales");
  const [store, setStore] = useState("all");
  const [exportFormat, setExportFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("this-week");

  const handleExport = () => {
    console.log({
      reportType,
      store,
      exportFormat,
      dateRange,
    });
    // Implement actual export functionality here
  };

  const defaultTrigger = (
    <Button>
      <FileExportIcon className="h-4 w-4 mr-2" />
      Export Report
    </Button>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lv-brown font-serif">Export Report</DialogTitle>
          <DialogDescription>
            Configure your report export settings.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="reconciliation">Reconciliation Report</SelectItem>
                <SelectItem value="products">Products Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store">Store</Label>
            <Select value={store} onValueChange={setStore}>
              <SelectTrigger id="store">
                <SelectValue placeholder="Select Store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                <SelectItem value="johannesburg">Johannesburg</SelectItem>
                <SelectItem value="cape-town">Cape Town</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date-range">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger id="date-range">
                <SelectValue placeholder="Select Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="last-week">Last Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Export Format</Label>
            <Tabs defaultValue="pdf" value={exportFormat} onValueChange={setExportFormat}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pdf">PDF</TabsTrigger>
                <TabsTrigger value="excel">Excel</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="border-lv-brown text-lv-brown"
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="bg-lv-gold hover:bg-lv-gold/90 text-black"
            onClick={handleExport}
          >
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
