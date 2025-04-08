
import { cn } from "@/lib/utils";
import { LvLogo } from "./LvLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { BellIcon, LogOutIcon, SearchIcon, SettingsIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  className?: string;
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  return (
    <header className={cn("px-4 sm:px-6 lg:px-8 py-4 border-b border-border flex items-center justify-between bg-background", className)}>
      <div className="flex items-center">
        <LvLogo size="lg" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex items-center bg-muted rounded-full px-3 py-1.5">
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
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 overflow-hidden">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback className="bg-lv-brown text-primary-foreground">LV</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <LogOutIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
