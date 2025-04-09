
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "sidebar";
}

export function LvLogo({ className, size = "md", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const textColorClass = variant === "sidebar" ? "text-white" : "text-lv-gold";

  return (
    <div
      className={cn(
        "font-serif font-bold tracking-tight",
        sizeClasses[size],
        className
      )}
    >
      <span className={textColorClass}>Louis</span>
      <span className={textColorClass}>Vuitton</span>
    </div>
  );
}
