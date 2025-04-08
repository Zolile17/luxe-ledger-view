
import { ActivityItem } from "@/components/Dashboard/ActivityFeed";
import { Transaction } from "@/components/Dashboard/TransactionsTable";

// Mock data for the revenue chart
export const revenueData = [
  { date: "2025-03-01", revenue: 98500 },
  { date: "2025-03-02", revenue: 92000 },
  { date: "2025-03-03", revenue: 85600 },
  { date: "2025-03-04", revenue: 97800 },
  { date: "2025-03-05", revenue: 105200 },
  { date: "2025-03-06", revenue: 112400 },
  { date: "2025-03-07", revenue: 132000 },
  { date: "2025-03-08", revenue: 124500 },
  { date: "2025-03-09", revenue: 119800 },
  { date: "2025-03-10", revenue: 115300 },
  { date: "2025-03-11", revenue: 121000 },
  { date: "2025-03-12", revenue: 128700 },
  { date: "2025-03-13", revenue: 142300 },
  { date: "2025-03-14", revenue: 156000 },
];

// Sample transactions
export const transactionsData: Transaction[] = [
  {
    id: "T1001",
    productName: "Neverfull MM Tote",
    customer: "Emily Parker",
    date: "Apr 7, 2025",
    amount: 1650,
    status: "completed",
    storeLocation: "Paris Champs-Élysées",
  },
  {
    id: "T1002",
    productName: "Speedy 30 Handbag",
    customer: "Sarah Johnson",
    date: "Apr 7, 2025",
    amount: 1350,
    status: "completed",
    storeLocation: "New York 5th Avenue",
  },
  {
    id: "T1003",
    productName: "Monogram Shawl",
    customer: "Thomas Wright",
    date: "Apr 6, 2025",
    amount: 490,
    status: "pending",
    storeLocation: "London Bond Street",
  },
  {
    id: "T1004",
    productName: "Horizon 55 Luggage",
    customer: "David Chen",
    date: "Apr 6, 2025",
    amount: 2800,
    status: "completed",
    storeLocation: "Shanghai IFC Mall",
  },
  {
    id: "T1005",
    productName: "Tambour Watch",
    customer: "Julia Roberts",
    date: "Apr 5, 2025",
    amount: 4950,
    status: "failed",
    storeLocation: "Online Store",
  },
  {
    id: "T1006",
    productName: "Capucines MM Bag",
    customer: "Alexandra Smith",
    date: "Apr 5, 2025",
    amount: 4650,
    status: "completed",
    storeLocation: "Milan Via Montenapoleone",
  },
  {
    id: "T1007",
    productName: "LV Archlight Sneakers",
    customer: "Michael Brown",
    date: "Apr 4, 2025",
    amount: 1090,
    status: "completed",
    storeLocation: "Los Angeles Rodeo Drive",
  },
  {
    id: "T1008",
    productName: "Twist Chain Wallet",
    customer: "Sophia Garcia",
    date: "Apr 4, 2025",
    amount: 1850,
    status: "pending",
    storeLocation: "Madrid Serrano",
  }
];

// Recent activities data
export const activitiesData: ActivityItem[] = [
  {
    id: "A1001",
    title: "Limited Edition Collection Launch",
    description: "The Spring/Summer collection is now available in all flagship stores.",
    timestamp: "2 hours ago",
    type: "campaign"
  },
  {
    id: "A1002",
    title: "High-value Sale",
    description: "Sophia Williams purchased Petite Malle handbag for €7,900 in Paris.",
    timestamp: "4 hours ago",
    type: "sale"
  },
  {
    id: "A1003",
    title: "Inventory Alert",
    description: "Pochette Metis is low on stock in New York store.",
    timestamp: "6 hours ago",
    type: "alert"
  },
  {
    id: "A1004",
    title: "Customer Refund",
    description: "Processed refund of €1,290 for Emma Thompson.",
    timestamp: "8 hours ago",
    type: "refund"
  },
  {
    id: "A1005",
    title: "New Stock Arrival",
    description: "Spring/Summer ready-to-wear collection arrived at London flagship.",
    timestamp: "12 hours ago",
    type: "restock"
  },
  {
    id: "A1006",
    title: "VIP Client Purchase",
    description: "Private client purchased limited edition trunks worth €45,000.",
    timestamp: "1 day ago",
    type: "sale"
  }
];
