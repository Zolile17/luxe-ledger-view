import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LvLogo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div
      className={cn(
        "font-serif font-bold tracking-tight",
        sizeClasses[size],
        className
      )}
    >
      <span className="text-lv-gold">Louis</span>
      <span className="text-lv-gold">Vuitton</span>
    </div>
  );
}
