import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  iconEmoji?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'warning' | 'success';
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  subtitle,
  icon: Icon,
  iconEmoji,
  trend,
  trendValue,
  variant = 'default',
  className 
}: StatCardProps) {
  const variantClasses = {
    default: 'border-border',
    primary: 'border-primary/50 shadow-glow',
    secondary: 'border-secondary/50 shadow-glow-gold',
    accent: 'border-accent/50 shadow-glow-purple',
    warning: 'border-warning/50',
    success: 'border-success/50',
  };

  const iconContainerClasses = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary/20 text-primary',
    secondary: 'bg-secondary/20 text-secondary',
    accent: 'bg-accent/20 text-accent',
    warning: 'bg-warning/20 text-warning',
    success: 'bg-success/20 text-success',
  };

  return (
    <div className={cn(
      "stat-card",
      variantClasses[variant],
      className
    )}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-muted-foreground font-medium">{title}</span>
        {(Icon || iconEmoji) && (
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            iconContainerClasses[variant]
          )}>
            {Icon ? <Icon className="w-5 h-5" /> : <span className="text-xl">{iconEmoji}</span>}
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="text-2xl font-display font-bold text-foreground">
          {value}
        </div>
        
        {(subtitle || trendValue) && (
          <div className="flex items-center gap-2">
            {trendValue && (
              <span className={cn(
                "text-xs font-medium",
                trend === 'up' && "text-success",
                trend === 'down' && "text-destructive",
                trend === 'neutral' && "text-muted-foreground"
              )}>
                {trend === 'up' && '↑'}
                {trend === 'down' && '↓'}
                {trendValue}
              </span>
            )}
            {subtitle && (
              <span className="text-xs text-muted-foreground">{subtitle}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
