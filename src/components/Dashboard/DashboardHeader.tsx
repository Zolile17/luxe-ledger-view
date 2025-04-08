import { cn } from "@/lib/utils";
import { LvLogo } from "./LvLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  StoreIcon,
  UserIcon,
  MenuIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { storeLocations } from "@/data/dashboardData";
import { useNavigate } from "react-router-dom";

// Using a context to manage store selection would be better in a real app

interface DashboardHeaderProps {
  className?: string;
  toggleSidebar?: () => void;
  sidebarExpanded?: boolean;
  isMobile?: boolean;
  onStoreChange?: (store: string) => void;
}

export function DashboardHeader({
  className,
  toggleSidebar,
  sidebarExpanded,
  isMobile,
  onStoreChange,
}: DashboardHeaderProps) {
  const [selectedStore, setSelectedStore] = useState("All Stores");
  const [userRole, setUserRole] = useState("admin"); // admin or store-manager
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();

  const handleStoreChange = (value: string) => {
    setSelectedStore(value);
    if (onStoreChange) {
      onStoreChange(value);
    }
  };

  useEffect(() => {
    // Initialize with default store
    if (onStoreChange) {
      onStoreChange(selectedStore);
    }
  }, []);

  const handleLogout = () => {
    // TODO: Implement actual logout logic (clear tokens, etc.)
    navigate("/login");
  };

  const handleNavigation = (path: string) => {
    setActiveItem(path);
    navigate(`/dashboard/${path}`);
  };

  return (
    <header
      className={cn(
        "px-4 sm:px-6 lg:px-8 py-4 border-b border-border flex items-center justify-between bg-background",
        className
      )}
    >
      <div className="flex items-center space-x-4">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="mr-2"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        )}
        {/* Only show logo in header when sidebar is collapsed or on mobile */}
        {(isMobile || !sidebarExpanded) && <LvLogo size="lg" />}
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block">
          <Select value={selectedStore} onValueChange={handleStoreChange}>
            <SelectTrigger className="w-[180px] bg-muted/50 border-0 focus:ring-lv-gold">
              <StoreIcon className="h-4 w-4 mr-2 text-lv-gold" />
              <SelectValue placeholder="Select Store" />
            </SelectTrigger>
            <SelectContent>
              {storeLocations.map((store) => (
                <SelectItem key={store} value={store}>
                  {store}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="hidden sm:flex items-center bg-muted rounded-full px-3 py-1.5 ml-2">
          <SearchIcon className="h-4 w-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm w-40 placeholder:text-muted-foreground"
          />
        </div>

        <Button variant="outline" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-8 w-8 overflow-hidden"
            >
              <Avatar>
                <AvatarImage src="/public/images/user-profile.png" alt="User" />
                <AvatarFallback className="bg-lv-brown text-primary-foreground">
                  LV
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4">
                <img
                  src="/images/user-profile.png"
                  alt="user profile"
                  width={50}
                  height={50}
                />
              </UserIcon>
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-muted-foreground">
              {userRole === "admin"
                ? "Regional Admin / Head Office"
                : "Store Manager"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600">
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span onClick={handleLogout}>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
