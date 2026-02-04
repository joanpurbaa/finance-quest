import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/gameData";

interface BudgetProgressProps {
	spent: number;
	budget: number;
	showWarning?: boolean;
	className?: string;
}

export function BudgetProgress({
	spent,
	budget,
	showWarning = true,
	className,
}: BudgetProgressProps) {
	const percentage = Math.min((spent / budget) * 100, 100);
	const remaining = budget - spent;
	const isOverBudget = spent > budget;
	const isWarningZone = percentage >= 80 && percentage < 100;

	return (
		<div className={cn("space-y-3", className)}>
			<div className="flex items-center justify-between">
				<span className="text-sm text-muted-foreground">Monthly Budget</span>
				<span
					className={cn(
						"text-sm font-medium",
						isOverBudget
							? "text-destructive"
							: isWarningZone
								? "text-warning"
								: "text-foreground",
					)}>
					{formatCurrency(spent)} / {formatCurrency(budget)}
				</span>
			</div>

			<div className="relative h-4 bg-muted rounded-full overflow-hidden">
				<div className="absolute inset-0 flex">
					<div className="w-[60%] border-r border-background/20" />
					<div className="w-[20%] border-r border-background/20" />
					<div className="w-[20%] bg-destructive/20" />
				</div>

				<div
					className={cn(
						"absolute top-0 left-0 h-full rounded-full transition-all duration-700",
						isOverBudget
							? "bg-gradient-to-r from-destructive to-boss-glow"
							: isWarningZone
								? "bg-gradient-to-r from-primary to-warning"
								: "bg-gradient-to-r from-primary to-xp-glow",
					)}
					style={{
						width: `${percentage}%`,
						boxShadow: isOverBudget
							? "var(--shadow-glow-danger)"
							: "var(--shadow-glow-primary)",
					}}
				/>
			</div>

			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">Safe Zone</span>
				<span className="text-warning">Warning</span>
				<span className="text-destructive">Danger</span>
			</div>

			<div
				className={cn(
					"p-3 rounded-lg text-center",
					isOverBudget
						? "bg-destructive/10 border border-destructive/30"
						: "bg-primary/10 border border-primary/30",
				)}>
				{isOverBudget ? (
					<>
						<p className="text-destructive font-display font-bold">
							⚠️ You've stepped into the Impulse Trap!
						</p>
						<p className="text-sm text-destructive/80">
							Overspent by {formatCurrency(Math.abs(remaining))}
						</p>
					</>
				) : (
					<>
						<p className="text-primary font-display font-bold">
							💪 {formatCurrency(remaining)} remaining
						</p>
						<p className="text-sm text-primary/80">Keep going, Budget Warrior!</p>
					</>
				)}
			</div>

			{showWarning && isWarningZone && !isOverBudget && (
				<div className="p-3 rounded-lg bg-warning/10 border border-warning/30 text-center animate-pulse">
					<p className="text-warning font-medium">
						⚡ Approaching the Danger Zone! Proceed with caution.
					</p>
				</div>
			)}
		</div>
	);
}
