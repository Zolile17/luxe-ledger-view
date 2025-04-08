import { ActivityItem } from "@/components/Dashboard/ActivityFeed";
import { Transaction } from "@/components/Dashboard/TransactionsTable";

// Store names/locations
export const storeLocations = [
  "All Stores",
  "Johannesburg",
  "Cape Town",
  "Online Store"
];

// Mock data for different stores
const storeData = {
  "All Stores": {
    revenue: [98500, 92000, 85600, 97800, 105200, 112400, 132000, 124500, 119800, 115300, 121000, 128700, 142300, 156000],
    salesCount: 476,
    averageOrder: 2240,
    newCustomers: 138
  },
  "Johannesburg": {
    revenue: [24500, 22000, 18600, 21800, 25200, 27400, 32000, 30500, 29800, 28300, 30000, 31700, 35300, 38000],
    salesCount: 112,
    averageOrder: 2580,
    newCustomers: 32
  },
  "Cape Town": {
    revenue: [26500, 24000, 22600, 25800, 28200, 30400, 34000, 32500, 30800, 29300, 31000, 32700, 36300, 39000],
    salesCount: 124,
    averageOrder: 2760,
    newCustomers: 35
  },
  "Online Store": {
    revenue: [27500, 26000, 25600, 27800, 29200, 30400, 34000, 32500, 31800, 30300, 32000, 33700, 36300, 38000],
    salesCount: 132,
    averageOrder: 2360,
    newCustomers: 42
  }
};

// Get data for a specific store
export const getStoreData = (store: string = "All Stores") => {
  return storeData[store as keyof typeof storeData] || storeData["All Stores"];
};

// Generate revenue data for charts
export const getRevenueData = (store: string = "All Stores") => {
  const dates = [
    "2025-03-01", "2025-03-02", "2025-03-03", "2025-03-04", "2025-03-05", "2025-03-06", "2025-03-07",
    "2025-03-08", "2025-03-09", "2025-03-10", "2025-03-11", "2025-03-12", "2025-03-13", "2025-03-14"
  ];

  const storeRevenue = storeData[store as keyof typeof storeData]?.revenue || storeData["All Stores"].revenue;

  return dates.map((date, index) => ({
    date,
    revenue: storeRevenue[index]
  }));
};

// Default revenue data for initial display
export const revenueData = getRevenueData();

// Filter transactions by store
export const getTransactionsByStore = (store: string = "All Stores") => {
  if (store === "All Stores") {
    return transactionsData;
  }
  return transactionsData.filter(transaction => transaction.storeLocation === store);
};

// Sample transactions
export const transactionsData: Transaction[] = [
  {
    id: "T1001",
    productName: "Neverfull MM Tote",
    customer: "Emily Parker",
    date: "Apr 7, 2025",
    amount: 1650,
    status: "completed",
    storeLocation: "Cape Town",
  },
  {
    id: "T1002",
    productName: "Speedy 30 Handbag",
    customer: "Sarah Johnson",
    date: "Apr 7, 2025",
    amount: 1350,
    status: "completed",
    storeLocation: "Johannesburg",
  },
  {
    id: "T1003",
    productName: "Monogram Shawl",
    customer: "Thomas Wright",
    date: "Apr 6, 2025",
    amount: 490,
    status: "pending",
    storeLocation: "Johannesburg",
  },
  {
    id: "T1004",
    productName: "Horizon 55 Luggage",
    customer: "David Chen",
    date: "Apr 6, 2025",
    amount: 2800,
    status: "completed",
    storeLocation: "Cape Town",
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
    storeLocation: "Cape Town",
  },
  {
    id: "T1007",
    productName: "LV Archlight Sneakers",
    customer: "Michael Brown",
    date: "Apr 4, 2025",
    amount: 1090,
    status: "completed",
    storeLocation: "Johannesburg",
  },
  {
    id: "T1008",
    productName: "Twist Chain Wallet",
    customer: "Sophia Garcia",
    date: "Apr 4, 2025",
    amount: 1850,
    status: "pending",
    storeLocation: "Cape Town",
  },
  {
    id: "T1009",
    productName: "Petit Palais Clutch",
    customer: "Naomi Campbell",
    date: "Apr 3, 2025",
    amount: 2150,
    status: "completed",
    storeLocation: "Cape Town",
  },
  {
    id: "T1010",
    productName: "Monogram Belt",
    customer: "James Wilson",
    date: "Apr 3, 2025",
    amount: 525,
    status: "completed",
    storeLocation: "Johannesburg",
  },
  {
    id: "T1011",
    productName: "Alma BB Handbag",
    customer: "Olivia Chen",
    date: "Apr 2, 2025",
    amount: 1590,
    status: "completed",
    storeLocation: "Cape Town",
  },
  {
    id: "T1012",
    productName: "Dauphine Wallet",
    customer: "Emma Watson",
    date: "Apr 2, 2025",
    amount: 750,
    status: "completed",
    storeLocation: "Johannesburg",
  }
];

// Filter activities by store
export const getActivitiesByStore = (store: string = "All Stores") => {
  if (store === "All Stores") {
    return activitiesData;
  }

  return activitiesData.filter(activity => {
    return activity.description.includes(store) || 
           (activity.storeLocation && activity.storeLocation === store);
  });
};

// Recent activities data with store location
export const activitiesData: (ActivityItem & { storeLocation?: string })[] = [
  {
    id: "A1011",
    title: "New Store Opening",
    description: "Grand opening of our new flagship store in Sandton City, Johannesburg.",
    timestamp: "Just now",
    type: "campaign",
    storeLocation: "Johannesburg"
  },
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
    description: "Sophia Williams purchased Petite Malle handbag for €7,900 in Cape Town.",
    timestamp: "4 hours ago",
    type: "sale",
    storeLocation: "Cape Town"
  },
  {
    id: "A1003",
    title: "Inventory Alert",
    description: "Pochette Metis is low on stock in Johannesburg store.",
    timestamp: "6 hours ago",
    type: "alert",
    storeLocation: "Johannesburg"
  },
  {
    id: "A1004",
    title: "Customer Refund",
    description: "Processed refund of €1,290 for Emma Thompson.",
    timestamp: "8 hours ago",
    type: "refund",
    storeLocation: "Johannesburg"
  },
  {
    id: "A1005",
    title: "New Stock Arrival",
    description: "Spring/Summer ready-to-wear collection arrived at Johannesburg flagship.",
    timestamp: "12 hours ago",
    type: "restock",
    storeLocation: "Johannesburg"
  },
  {
    id: "A1006",
    title: "VIP Client Purchase",
    description: "Private client purchased limited edition trunks worth €45,000.",
    timestamp: "1 day ago",
    type: "sale",
    storeLocation: "Johannesburg"
  },
  {
    id: "A1007",
    title: "Staff Training Completed",
    description: "New product training completed for all sales associates in Cape Town store.",
    timestamp: "1 day ago",
    type: "staff",
    storeLocation: "Cape Town"
  },
  {
    id: "A1008",
    title: "Online Sale Peak",
    description: "Record-breaking single hour sales of €125,000 achieved on our e-commerce platform.",
    timestamp: "2 days ago",
    type: "sale",
    storeLocation: "Online Store"
  },
  {
    id: "A1009",
    title: "Maintenance Scheduled",
    description: "Cape Town store will undergo maintenance on April 12th, operating with limited capacity.",
    timestamp: "2 days ago",
    type: "alert",
    storeLocation: "Cape Town"
  },
  {
    id: "A1010",
    title: "New Regional Manager",
    description: "Sarah Chen appointed as the new regional manager for Asia Pacific region.",
    timestamp: "3 days ago",
    type: "staff"
  }
];
