
import { ActivityItem } from "@/components/Dashboard/ActivityFeed";
import { Transaction } from "@/components/Dashboard/TransactionsTable";

// Store names/locations
export const storeLocations = [
  "All Stores",
  "New York 5th Avenue",
  "Paris Champs-Élysées",
  "London Bond Street",
  "Milan Via Montenapoleone",
  "Tokyo Ginza",
  "Hong Kong Canton Road",
  "Dubai Mall",
  "Los Angeles Rodeo Drive",
  "Shanghai IFC Mall",
  "Madrid Serrano",
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
  "New York 5th Avenue": {
    revenue: [24500, 22000, 18600, 21800, 25200, 27400, 32000, 30500, 29800, 28300, 30000, 31700, 35300, 38000],
    salesCount: 112,
    averageOrder: 2580,
    newCustomers: 32
  },
  "Paris Champs-Élysées": {
    revenue: [26500, 24000, 22600, 25800, 28200, 30400, 34000, 32500, 30800, 29300, 31000, 32700, 36300, 39000],
    salesCount: 124,
    averageOrder: 2760,
    newCustomers: 35
  },
  "London Bond Street": {
    revenue: [18500, 17000, 16600, 18800, 20200, 22400, 26000, 24500, 23800, 22300, 24000, 25700, 28300, 30000],
    salesCount: 98,
    averageOrder: 2340,
    newCustomers: 28
  },
  "Milan Via Montenapoleone": {
    revenue: [19500, 18000, 17600, 19800, 21200, 23400, 27000, 25500, 24800, 23300, 25000, 26700, 29300, 31000],
    salesCount: 86,
    averageOrder: 2520,
    newCustomers: 24
  },
  "Tokyo Ginza": {
    revenue: [21500, 20000, 19600, 21800, 23200, 24400, 28000, 26500, 25800, 24300, 26000, 27700, 30300, 32000],
    salesCount: 92,
    averageOrder: 2680,
    newCustomers: 27
  },
  "Hong Kong Canton Road": {
    revenue: [20500, 19000, 18600, 20800, 22200, 23400, 27000, 25500, 24800, 23300, 25000, 26700, 29300, 31000],
    salesCount: 88,
    averageOrder: 2600,
    newCustomers: 25
  },
  "Dubai Mall": {
    revenue: [23500, 22000, 21600, 23800, 25200, 26400, 30000, 28500, 27800, 26300, 28000, 29700, 32300, 34000],
    salesCount: 94,
    averageOrder: 2920,
    newCustomers: 29
  },
  "Los Angeles Rodeo Drive": {
    revenue: [22500, 21000, 20600, 22800, 24200, 25400, 29000, 27500, 26800, 25300, 27000, 28700, 31300, 33000],
    salesCount: 90,
    averageOrder: 2780,
    newCustomers: 26
  },
  "Shanghai IFC Mall": {
    revenue: [19500, 18000, 17600, 19800, 21200, 22400, 26000, 24500, 23800, 22300, 24000, 25700, 28300, 30000],
    salesCount: 84,
    averageOrder: 2620,
    newCustomers: 23
  },
  "Madrid Serrano": {
    revenue: [17500, 16000, 15600, 17800, 19200, 20400, 24000, 22500, 21800, 20300, 22000, 23700, 26300, 28000],
    salesCount: 78,
    averageOrder: 2480,
    newCustomers: 21
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
  },
  {
    id: "T1009",
    productName: "Petit Palais Clutch",
    customer: "Naomi Campbell",
    date: "Apr 3, 2025",
    amount: 2150,
    status: "completed",
    storeLocation: "Paris Champs-Élysées",
  },
  {
    id: "T1010",
    productName: "Monogram Belt",
    customer: "James Wilson",
    date: "Apr 3, 2025",
    amount: 525,
    status: "completed",
    storeLocation: "Dubai Mall",
  },
  {
    id: "T1011",
    productName: "Alma BB Handbag",
    customer: "Olivia Chen",
    date: "Apr 2, 2025",
    amount: 1590,
    status: "completed",
    storeLocation: "Hong Kong Canton Road",
  },
  {
    id: "T1012",
    productName: "Dauphine Wallet",
    customer: "Emma Watson",
    date: "Apr 2, 2025",
    amount: 750,
    status: "completed",
    storeLocation: "London Bond Street",
  }
];

// Filter activities by store
export const getActivitiesByStore = (store: string = "All Stores") => {
  if (store === "All Stores") {
    return activitiesData;
  }
  
  return activitiesData.filter(activity => {
    // Check if the activity description contains the store name
    return activity.description.includes(store) || 
           (activity.storeLocation && activity.storeLocation === store);
  });
};

// Recent activities data with store location
export const activitiesData: (ActivityItem & { storeLocation?: string })[] = [
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
    type: "sale",
    storeLocation: "Paris Champs-Élysées"
  },
  {
    id: "A1003",
    title: "Inventory Alert",
    description: "Pochette Metis is low on stock in New York store.",
    timestamp: "6 hours ago",
    type: "alert",
    storeLocation: "New York 5th Avenue"
  },
  {
    id: "A1004",
    title: "Customer Refund",
    description: "Processed refund of €1,290 for Emma Thompson.",
    timestamp: "8 hours ago",
    type: "refund",
    storeLocation: "London Bond Street"
  },
  {
    id: "A1005",
    title: "New Stock Arrival",
    description: "Spring/Summer ready-to-wear collection arrived at London flagship.",
    timestamp: "12 hours ago",
    type: "restock",
    storeLocation: "London Bond Street"
  },
  {
    id: "A1006",
    title: "VIP Client Purchase",
    description: "Private client purchased limited edition trunks worth €45,000.",
    timestamp: "1 day ago",
    type: "sale",
    storeLocation: "Dubai Mall"
  },
  {
    id: "A1007",
    title: "Staff Training Completed",
    description: "New product training completed for all sales associates in Milan store.",
    timestamp: "1 day ago",
    type: "staff",
    storeLocation: "Milan Via Montenapoleone"
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
    description: "Tokyo store will undergo maintenance on April 12th, operating with limited capacity.",
    timestamp: "2 days ago",
    type: "alert",
    storeLocation: "Tokyo Ginza"
  },
  {
    id: "A1010",
    title: "New Regional Manager",
    description: "Sarah Chen appointed as the new regional manager for Asia Pacific region.",
    timestamp: "3 days ago",
    type: "staff"
  }
];
