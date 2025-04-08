import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon, FilterIcon } from "lucide-react";

// Mock data for products
const products = [
  {
    id: "P001",
    name: "Neverfull MM Tote",
    category: "Handbags",
    price: 1650,
    stock: 24,
    status: "In Stock"
  },
  {
    id: "P002",
    name: "Speedy 30 Handbag",
    category: "Handbags",
    price: 1350,
    stock: 12,
    status: "Low Stock"
  },
  {
    id: "P003",
    name: "Monogram Shawl",
    category: "Accessories",
    price: 490,
    stock: 45,
    status: "In Stock"
  },
  {
    id: "P004",
    name: "Horizon 55 Luggage",
    category: "Luggage",
    price: 2800,
    stock: 8,
    status: "Low Stock"
  },
  {
    id: "P005",
    name: "Tambour Watch",
    category: "Watches",
    price: 4950,
    stock: 15,
    status: "In Stock"
  },
  {
    id: "P006",
    name: "Capucines MM Bag",
    category: "Handbags",
    price: 4650,
    stock: 6,
    status: "Low Stock"
  },
  {
    id: "P007",
    name: "LV Archlight Sneakers",
    category: "Shoes",
    price: 1090,
    stock: 32,
    status: "In Stock"
  }
];

export default function ProductsPage() {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-medium text-lv-brown">
              Products & Categories
            </h1>
            <p className="text-muted-foreground">
              Manage your product inventory and categories
            </p>
          </div>
          <Button className="bg-lv-gold hover:bg-lv-gold/90 text-black">
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-medium">Product Inventory</CardTitle>
              <Button variant="outline" size="sm">
                <FilterIcon className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.status === "In Stock" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {product.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
} 