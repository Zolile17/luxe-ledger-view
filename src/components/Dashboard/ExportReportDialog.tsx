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
import { FileTextIcon } from "lucide-react";
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
import { 
  getStoreData, 
  getTransactionsByStore,
  getActivitiesByStore,
  transactionsData,
  activitiesData
} from "@/data/dashboardData";

interface ExportReportDialogProps {
  trigger?: React.ReactNode;
  selectedStore?: string;
}

export function ExportReportDialog({ trigger, selectedStore = "All Stores" }: ExportReportDialogProps) {
  const [reportType, setReportType] = useState("sales");
  const [store, setStore] = useState(selectedStore);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("this-week");

  const handleExport = () => {
    let dataToExport;
    let fileName;
    const storeData = getStoreData(store);

    switch (reportType) {
      case "sales":
        dataToExport = {
          totalSales: storeData.revenue[storeData.revenue.length - 1],
          salesCount: storeData.salesCount,
          averageOrder: storeData.averageOrder,
          newCustomers: storeData.newCustomers,
          revenueData: storeData.revenue
        };
        fileName = `sales-report-${store.toLowerCase().replace(/\s+/g, '-')}`;
        break;
      case "reconciliation":
        dataToExport = getTransactionsByStore(store);
        fileName = `reconciliation-report-${store.toLowerCase().replace(/\s+/g, '-')}`;
        break;
      case "products":
        dataToExport = getActivitiesByStore(store);
        fileName = `products-report-${store.toLowerCase().replace(/\s+/g, '-')}`;
        break;
      default:
        return;
    }

    // Convert data to the selected format
    let exportContent;
    if (exportFormat === "pdf") {
      // For PDF, we'll create a text representation
      exportContent = JSON.stringify(dataToExport, null, 2);
      const blob = new Blob([exportContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // For Excel, we'll create a CSV
      let csvContent = '';
      if (Array.isArray(dataToExport)) {
        // Handle array data (transactions or activities)
        const headers = Object.keys(dataToExport[0]);
        csvContent = headers.join(',') + '\n';
        dataToExport.forEach(item => {
          const values = headers.map(header => {
            const value = item[header];
            return typeof value === 'string' ? `"${value}"` : value;
          });
          csvContent += values.join(',') + '\n';
        });
      } else {
        // Handle object data (sales report)
        csvContent = Object.entries(dataToExport)
          .map(([key, value]) => `${key},${value}`)
          .join('\n');
      }
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const defaultTrigger = (
    <Button>
      <FileTextIcon className="h-4 w-4 mr-2" />
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
                <SelectItem value="All Stores">All Stores</SelectItem>
                <SelectItem value="New York 5th Avenue">New York 5th Avenue</SelectItem>
                <SelectItem value="Paris Champs-Élysées">Paris Champs-Élysées</SelectItem>
                <SelectItem value="London Bond Street">London Bond Street</SelectItem>
                <SelectItem value="Milan Via Montenapoleone">Milan Via Montenapoleone</SelectItem>
                <SelectItem value="Tokyo Ginza">Tokyo Ginza</SelectItem>
                <SelectItem value="Hong Kong Canton Road">Hong Kong Canton Road</SelectItem>
                <SelectItem value="Dubai Mall">Dubai Mall</SelectItem>
                <SelectItem value="Los Angeles Rodeo Drive">Los Angeles Rodeo Drive</SelectItem>
                <SelectItem value="Shanghai IFC Mall">Shanghai IFC Mall</SelectItem>
                <SelectItem value="Madrid Serrano">Madrid Serrano</SelectItem>
                <SelectItem value="Online Store">Online Store</SelectItem>
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
