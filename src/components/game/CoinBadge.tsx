import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/gameData";

interface CoinBadgeProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function CoinBadge({ amount, size = 'md', showIcon = true, className }: CoinBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <div className={cn("coin-badge", sizeClasses[size], className)}>
      {showIcon && <span className="text-lg">🪙</span>}
      <span className="font-bold">{formatNumber(amount)}</span>
    </div>
  );
}
