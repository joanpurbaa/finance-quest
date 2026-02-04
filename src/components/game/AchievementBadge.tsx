import { cn } from "@/lib/utils";
import { Achievement } from "@/lib/gameData";
import { Lock } from "lucide-react";

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  className?: string;
}

export function AchievementBadge({ 
  achievement, 
  size = 'md', 
  showDetails = true,
  className 
}: AchievementBadgeProps) {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
  };

  return (
    <div className={cn("text-center", className)}>
      <div 
        className={cn(
          "mx-auto rounded-full flex items-center justify-center transition-all duration-300",
          sizeClasses[size],
          achievement.unlocked
            ? "bg-gradient-to-br from-accent to-purple-600 shadow-glow-purple"
            : "bg-muted border-2 border-dashed border-muted-foreground/30"
        )}
      >
        {achievement.unlocked ? (
          <span>{achievement.icon}</span>
        ) : (
          <Lock className="w-1/2 h-1/2 text-muted-foreground/50" />
        )}
      </div>

      {showDetails && (
        <div className="mt-2">
          <h4 className={cn(
            "font-display font-semibold text-sm",
            achievement.unlocked ? "text-foreground" : "text-muted-foreground"
          )}>
            {achievement.name}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {achievement.description}
          </p>
          {achievement.unlocked && achievement.unlockedAt && (
            <p className="text-xs text-accent mt-1">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
