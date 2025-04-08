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
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#8B4513'
  },
  subtitle: {
    fontSize: 14,
    color: '#666666'
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#8B4513'
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 10
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: 1,
    paddingVertical: 5
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold'
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 10
  },
  metric: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  metricLabel: {
    fontSize: 12,
    color: '#666666'
  },
  metricValue: {
    fontSize: 12,
    fontWeight: 'bold'
  }
});

// PDF Document Component
const SalesReportPDF = ({ data, store, dateRange }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Sales Report</Text>
        <Text style={styles.subtitle}>{store} - {dateRange}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Total Sales:</Text>
          <Text style={styles.metricValue}>${data.totalSales.toLocaleString()}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Sales Count:</Text>
          <Text style={styles.metricValue}>{data.salesCount}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Average Order Value:</Text>
          <Text style={styles.metricValue}>${data.averageOrder.toLocaleString()}</Text>
        </View>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>New Customers:</Text>
          <Text style={styles.metricValue}>{data.newCustomers}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const TransactionsReportPDF = ({ data, store, dateRange }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions Report</Text>
        <Text style={styles.subtitle}>{store} - {dateRange}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>ID</Text>
            <Text style={styles.tableCell}>Product</Text>
            <Text style={styles.tableCell}>Customer</Text>
            <Text style={styles.tableCell}>Amount</Text>
            <Text style={styles.tableCell}>Status</Text>
          </View>
          {data.map((transaction) => (
            <View key={transaction.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{transaction.id}</Text>
              <Text style={styles.tableCell}>{transaction.productName}</Text>
              <Text style={styles.tableCell}>{transaction.customer}</Text>
              <Text style={styles.tableCell}>${transaction.amount.toLocaleString()}</Text>
              <Text style={styles.tableCell}>{transaction.status}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const ActivitiesReportPDF = ({ data, store, dateRange }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Activities Report</Text>
        <Text style={styles.subtitle}>{store} - {dateRange}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>ID</Text>
            <Text style={styles.tableCell}>Title</Text>
            <Text style={styles.tableCell}>Description</Text>
            <Text style={styles.tableCell}>Type</Text>
            <Text style={styles.tableCell}>Timestamp</Text>
          </View>
          {data.map((activity) => (
            <View key={activity.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{activity.id}</Text>
              <Text style={styles.tableCell}>{activity.title}</Text>
              <Text style={styles.tableCell}>{activity.description}</Text>
              <Text style={styles.tableCell}>{activity.type}</Text>
              <Text style={styles.tableCell}>{activity.timestamp}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

interface ExportReportDialogProps {
  trigger?: React.ReactNode;
  selectedStore?: string;
}

export function ExportReportDialog({ trigger, selectedStore = "All Stores" }: ExportReportDialogProps) {
  const [reportType, setReportType] = useState("sales");
  const [store, setStore] = useState(selectedStore);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("this-week");
  const [showPDFPreview, setShowPDFPreview] = useState(false);

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

    if (exportFormat === "pdf") {
      setShowPDFPreview(true);
    } else {
      // For Excel, we'll create a CSV
      let csvContent = '';
      if (Array.isArray(dataToExport)) {
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

  const renderPDFPreview = () => {
    const storeData = getStoreData(store);
    let PDFComponent;

    switch (reportType) {
      case "sales":
        PDFComponent = (
          <SalesReportPDF
            data={{
              totalSales: storeData.revenue[storeData.revenue.length - 1],
              salesCount: storeData.salesCount,
              averageOrder: storeData.averageOrder,
              newCustomers: storeData.newCustomers
            }}
            store={store}
            dateRange={dateRange}
          />
        );
        break;
      case "reconciliation":
        PDFComponent = (
          <TransactionsReportPDF
            data={getTransactionsByStore(store)}
            store={store}
            dateRange={dateRange}
          />
        );
        break;
      case "products":
        PDFComponent = (
          <ActivitiesReportPDF
            data={getActivitiesByStore(store)}
            store={store}
            dateRange={dateRange}
          />
        );
        break;
      default:
        return null;
    }

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-4 w-[90%] h-[90%]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">PDF Preview</h2>
            <Button
              variant="outline"
              onClick={() => setShowPDFPreview(false)}
            >
              Close
            </Button>
          </div>
          <PDFViewer className="w-full h-[calc(100%-4rem)]">
            {PDFComponent}
          </PDFViewer>
        </div>
      </div>
    );
  };

  const defaultTrigger = (
    <Button>
      <FileTextIcon className="h-4 w-4 mr-2" />
      Export Report
    </Button>
  );

  return (
    <>
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
      {showPDFPreview && renderPDFPreview()}
    </>
  );
}
