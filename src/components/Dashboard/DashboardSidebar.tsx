import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LvLogo } from "./LvLogo";
import { 
  BarChart3Icon, 
  CalendarIcon,
  CircleDollarSignIcon,
  FileBarChartIcon,
  FileTextIcon,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  expanded: boolean;
}

function SidebarItem({ icon, label, active, onClick, expanded }: SidebarItemProps) {
  const content = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start pl-3 mb-1",
        expanded ? "" : "px-0 justify-center",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
      )}
      onClick={onClick}
    >
      <span className={expanded ? "mr-3" : ""}>{icon}</span>
      {expanded && label}
    </Button>
  );

  if (!expanded) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={50}>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-sidebar-accent text-sidebar-accent-foreground">            
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}

interface DashboardSidebarProps {
  className?: string;
  expanded: boolean;
}

export function DashboardSidebar({ className, expanded }: DashboardSidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Implement actual logout logic (clear tokens, etc.)
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    navigate(`/dashboard/${path}`);
  };

  return (
    <aside
      className={cn(
        "flex flex-col h-screen pb-4 bg-sidebar text-sidebar-foreground border-r border-sidebar-border",
        expanded ? "w-64" : "w-16",
        className
      )}
    >
      <div className={cn(
        "py-4 flex items-center", 
        expanded ? "px-3 justify-between" : "justify-center"
      )}>
        {expanded ? (
          <LvLogo className="text-sidebar-foreground" />
        ) : (
          <LayoutDashboardIcon className="h-6 w-6 text-sidebar-foreground" />
        )}
      </div>
      
      <div className={cn("py-2", expanded ? "px-3" : "px-0")}>
        {expanded && (
          <p className="text-xs uppercase font-medium text-sidebar-foreground/50 mb-2 pl-3">
            Main Menu
          </p>
        )}
        <nav className="space-y-0.5">
          <SidebarItem 
            icon={<LayoutDashboardIcon className="h-4 w-4" />} 
            label="Dashboard Overview" 
            active={activeItem === "dashboard"}
            onClick={() => handleNavigation("")}
            expanded={expanded}
          />
          <SidebarItem 
            icon={<BarChart3Icon className="h-4 w-4" />} 
            label="Sales Reports" 
            active={activeItem === "sales"}
            onClick={() => handleNavigation("sales")}
            expanded={expanded}
          />
          <SidebarItem 
            icon={<CircleDollarSignIcon className="h-4 w-4" />} 
            label="Reconciliation" 
            active={activeItem === "reconciliation"}
            onClick={() => handleNavigation("reconciliation")}
            expanded={expanded}
          />
        </nav>
      </div>

      <Separator className="my-4 bg-sidebar-border/50" />

      <div className={cn("py-2", expanded ? "px-3" : "px-0")}>
        {expanded && (
          <p className="text-xs uppercase font-medium text-sidebar-foreground/50 mb-2 pl-3">
            Store Management
          </p>
        )}
        <nav className="space-y-0.5">
          <SidebarItem 
            icon={<PackageIcon className="h-4 w-4" />} 
            label="Products & Categories" 
            active={activeItem === "products"}
            onClick={() => setActiveItem("products")}
            expanded={expanded}
          />
          <SidebarItem 
            icon={<StoreIcon className="h-4 w-4" />} 
            label="Store Performance" 
            active={activeItem === "stores"}
            onClick={() => setActiveItem("stores")}
            expanded={expanded}
          />
          <SidebarItem 
            icon={<FileTextIcon className="h-4 w-4" />} 
            label="Export Reports" 
            active={activeItem === "export"}
            onClick={() => setActiveItem("export")}
            expanded={expanded}
          />
        </nav>
      </div>

      <div className={cn("mt-auto pt-4", expanded ? "px-3" : "px-0")}>
        <Separator className="mb-4 bg-sidebar-border/50" />
        <nav className="space-y-1">
          <SidebarItem 
            icon={<UserIcon className="h-4 w-4" />} 
            label="Profile" 
            active={activeItem === "profile"}
            onClick={() => setActiveItem("profile")}
            expanded={expanded}
          />
          <SidebarItem 
            icon={<SettingsIcon className="h-4 w-4" />} 
            label="Settings" 
            active={activeItem === "settings"}
            onClick={() => setActiveItem("settings")}
            expanded={expanded}
          />
          <SidebarItem 
            icon={<LogOutIcon className="h-4 w-4" />} 
            label="Logout"
            onClick={handleLogout}
            expanded={expanded}
          />
        </nav>
      </div>
    </aside>
  );
}
