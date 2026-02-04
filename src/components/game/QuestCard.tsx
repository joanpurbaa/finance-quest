import { cn } from "@/lib/utils";
import { Quest } from "@/lib/gameData";
import { Button } from "@/components/ui/button";
import { CheckCircle, Gift, Zap } from "lucide-react";

interface QuestCardProps {
	quest: Quest;
	onClaim?: (questId: string) => void;
	className?: string;
}

export function QuestCard({ quest, onClaim, className }: QuestCardProps) {
	const progressPercentage = Math.min(
		(quest.progress / quest.target) * 100,
		100,
	);
	const isLimitQuest = quest.type === "limit";

	return (
		<div
			className={cn(
				"quest-card",
				quest.completed && quest.claimed && "completed",
				className,
			)}>
			<div className="flex items-start gap-3 mb-3">
				<span className="text-3xl">{quest.icon}</span>
				<div className="flex-1 min-w-0">
					<h3 className="font-display font-semibold text-foreground truncate">
						{quest.title}
					</h3>
					<p className="text-sm text-muted-foreground line-clamp-2">
						{quest.description}
					</p>
				</div>
				{quest.completed && quest.claimed && (
					<CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
				)}
			</div>

			<div className="mb-3">
				<div className="flex justify-between text-xs mb-1">
					<span className="text-muted-foreground">Progress</span>
					<span
						className={cn(
							"font-medium",
							quest.completed ? "text-success" : "text-foreground",
						)}>
						{isLimitQuest
							? `${quest.progress.toLocaleString()} / ${quest.target.toLocaleString()} IDR`
							: `${quest.progress} / ${quest.target}`}
					</span>
				</div>
				<div className="h-2 bg-muted rounded-full overflow-hidden">
					<div
						className={cn(
							"h-full rounded-full transition-all duration-500",
							quest.completed
								? "bg-success"
								: isLimitQuest && quest.progress > quest.target * 0.8
									? "bg-warning"
									: "bg-primary",
						)}
						style={{ width: `${progressPercentage}%` }}
					/>
				</div>
			</div>

			<div className="flex items-center gap-3 mb-3 text-sm">
				<div className="flex items-center gap-1">
					<Zap className="w-4 h-4 text-primary" />
					<span className="text-muted-foreground">+{quest.xpReward} XP</span>
				</div>
				<div className="flex items-center gap-1">
					<span>🪙</span>
					<span className="text-muted-foreground">+{quest.coinReward}</span>
				</div>
				<div className="flex items-center gap-1">
					<span>🌱</span>
					<span className="text-muted-foreground">+{quest.petPoints}</span>
				</div>
			</div>

			{quest.completed && !quest.claimed && (
				<Button
					onClick={() => onClaim?.(quest.id)}
					className="w-full bg-gradient-to-r from-secondary to-coin-glow text-secondary-foreground font-display font-semibold hover:opacity-90 transition-opacity">
					<Gift className="w-4 h-4 mr-2" />
					Claim Rewards!
				</Button>
			)}

			{quest.completed && quest.claimed && (
				<div className="text-center text-sm text-success font-medium">
					✨ Completed & Claimed ✨
				</div>
			)}
		</div>
	);
}
