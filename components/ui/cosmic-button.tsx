import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CosmicButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export function CosmicButton({
  children,
  icon: Icon,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: CosmicButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary: "from-black/80 to-black/60 border-yellow-500/50 text-yellow-500 hover:border-yellow-400 hover:text-yellow-400",
    secondary: "from-black/60 to-black/40 border-yellow-500/30 text-yellow-500/80 hover:border-yellow-500/50 hover:text-yellow-500",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative group",
        "rounded-xl border",
        "bg-gradient-to-b backdrop-blur-sm",
        "transition-all duration-300",
        "transform hover:-translate-y-0.5 active:translate-y-0",
        "shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]",
        variants[variant],
        sizeClasses[size],
        "flex items-center justify-center gap-2",
        "before:absolute before:inset-[1px] before:rounded-[10px]",
        "before:bg-gradient-to-b before:from-black/80 before:to-black/40",
        "before:z-0 hover:before:opacity-90",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2 font-medium">
        {Icon && <Icon className="w-5 h-5" />}
        {children}
      </span>
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent rounded-xl" />
      </div>
    </button>
  );
}