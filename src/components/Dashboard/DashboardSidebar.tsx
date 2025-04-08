
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LvLogo } from "./LvLogo";
import { 
  BarChart3Icon, 
  CalendarIcon,
  CircleDollarSignIcon,
  FileBarChartIcon,
  FileTextIcon, // Changed from FileExportIcon to FileTextIcon
  HomeIcon, 
  LayoutDashboardIcon, 
  LogOutIcon, 
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon, 
  StoreIcon,
  UserIcon
} from "lucide-react";
import { useState } from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon, label, active, onClick }: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start pl-3 mb-1",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Button>
  );
}

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <aside
      className={cn(
        "flex flex-col h-screen pb-4 bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
        className
      )}
    >
      <div className="px-3 py-4 flex items-center justify-between">
        <LvLogo className="text-sidebar-foreground" />
      </div>
      
      <div className="px-3 py-2">
        <p className="text-xs uppercase font-medium text-sidebar-foreground/50 mb-2 pl-3">
          Main Menu
        </p>
        <nav className="space-y-0.5">
          <SidebarItem 
            icon={<LayoutDashboardIcon className="h-4 w-4" />} 
            label="Dashboard Overview" 
            active={activeItem === "dashboard"}
            onClick={() => setActiveItem("dashboard")}
          />
          <SidebarItem 
            icon={<BarChart3Icon className="h-4 w-4" />} 
            label="Sales Reports" 
            active={activeItem === "sales"}
            onClick={() => setActiveItem("sales")}
          />
          <SidebarItem 
            icon={<CircleDollarSignIcon className="h-4 w-4" />} 
            label="Reconciliation" 
            active={activeItem === "reconciliation"}
            onClick={() => setActiveItem("reconciliation")}
          />
        </nav>
      </div>

      <Separator className="my-4 bg-sidebar-border/50" />

      <div className="px-3 py-2">
        <p className="text-xs uppercase font-medium text-sidebar-foreground/50 mb-2 pl-3">
          Store Management
        </p>
        <nav className="space-y-0.5">
          <SidebarItem 
            icon={<PackageIcon className="h-4 w-4" />} 
            label="Products & Categories" 
            active={activeItem === "products"}
            onClick={() => setActiveItem("products")}
          />
          <SidebarItem 
            icon={<StoreIcon className="h-4 w-4" />} 
            label="Store Performance" 
            active={activeItem === "stores"}
            onClick={() => setActiveItem("stores")}
          />
          <SidebarItem 
            icon={<FileTextIcon className="h-4 w-4" />} 
            label="Export Reports" 
            active={activeItem === "export"}
            onClick={() => setActiveItem("export")}
          />
        </nav>
      </div>

      <div className="mt-auto px-3 pt-4">
        <Separator className="mb-4 bg-sidebar-border/50" />
        <nav className="space-y-1">
          <SidebarItem 
            icon={<UserIcon className="h-4 w-4" />} 
            label="Profile" 
            active={activeItem === "profile"}
            onClick={() => setActiveItem("profile")}
          />
          <SidebarItem 
            icon={<SettingsIcon className="h-4 w-4" />} 
            label="Settings" 
            active={activeItem === "settings"}
            onClick={() => setActiveItem("settings")}
          />
          <SidebarItem 
            icon={<LogOutIcon className="h-4 w-4" />} 
            label="Logout" 
          />
        </nav>
      </div>
    </aside>
  );
}
