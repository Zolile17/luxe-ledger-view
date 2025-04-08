
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-3 left-3 z-50" 
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <XIcon className="h-5 w-5" />
          ) : (
            <MenuIcon className="h-5 w-5" />
          )}
        </Button>
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          !isMobile && "relative"
        )}
      >
        <DashboardSidebar />
      </div>

      {/* Main content */}
      <div className={cn(
        "flex flex-col flex-1 overflow-hidden transition-all duration-300",
        sidebarOpen && !isMobile && "ml-64"
      )}>
        <DashboardHeader className={cn(
          isMobile && sidebarOpen && "pl-16"
        )} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
