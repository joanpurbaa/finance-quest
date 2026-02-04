import { cn } from "@/lib/utils";

interface XPBarProps {
	current: number;
	max: number;
	level: number;
	showLabel?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
}

export function XPBar({
	current,
	max,
	level,
	showLabel = true,
	size = "md",
	className,
}: XPBarProps) {
	const percentage = Math.min((current / max) * 100, 100);

	const sizeClasses = {
		sm: "h-2",
		md: "h-4",
		lg: "h-6",
	};

	return (
		<div className={cn("w-full", className)}>
			{showLabel && (
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-display font-bold text-sm">
							{level}
						</span>
						<span className="text-sm font-medium text-muted-foreground">
							Level {level}
						</span>
					</div>
					<span className="text-sm font-medium text-primary">
						{current.toLocaleString()} / {max.toLocaleString()} XP
					</span>
				</div>
			)}
			<div className={cn("xp-bar", sizeClasses[size])}>
				<div className="xp-bar-fill" style={{ width: `${percentage}%` }} />
			</div>
		</div>
	);
}
