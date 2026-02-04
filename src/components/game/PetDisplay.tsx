import { cn } from "@/lib/utils";
import { Pet, petStages } from "@/lib/gameData";

interface PetDisplayProps {
	pet: Pet;
	size?: "sm" | "md" | "lg" | "xl";
	showInfo?: boolean;
	className?: string;
}

export function PetDisplay({
	pet,
	size = "md",
	showInfo = true,
	className,
}: PetDisplayProps) {
	const stage = petStages[pet.stage];
	const growthPercentage = (pet.growthPoints / pet.pointsToEvolve) * 100;

	const happinessColor =
		pet.happiness >= 70
			? "text-pet-happy"
			: pet.happiness >= 40
				? "text-pet-neutral"
				: "text-pet-sad";

	const happinessEmoji =
		pet.happiness >= 70 ? "😊" : pet.happiness >= 40 ? "😐" : "😢";

	const sizeClasses = {
		sm: "text-4xl",
		md: "text-6xl",
		lg: "text-8xl",
		xl: "text-9xl",
	};

	return (
		<div className={cn("pet-container text-center", className)}>
			<div className={cn("float-animation mb-4", sizeClasses[size])}>
				{stage.emoji}
			</div>

			{showInfo && (
				<>
					<h3 className="font-display font-bold text-xl text-foreground mb-1">
						{pet.name}
					</h3>
					<p className="text-sm text-accent font-medium mb-4">{stage.name}</p>

					<div className="flex items-center justify-center gap-2 mb-3">
						<span className={cn("text-lg", happinessColor)}>{happinessEmoji}</span>
						<span className={cn("text-sm font-medium", happinessColor)}>
							{pet.happiness}% Happy
						</span>
					</div>

					<div className="max-w-[200px] mx-auto">
						<div className="flex justify-between text-xs mb-1">
							<span className="text-muted-foreground">Evolution</span>
							<span className="text-accent font-medium">
								{pet.growthPoints} / {pet.pointsToEvolve}
							</span>
						</div>
						<div className="h-2 bg-muted rounded-full overflow-hidden">
							<div
								className="h-full rounded-full bg-gradient-to-r from-accent to-purple-400 transition-all duration-500"
								style={{ width: `${growthPercentage}%` }}
							/>
						</div>
					</div>

					{pet.accessories.length > 0 && (
						<div className="mt-4 flex justify-center gap-2">
							{pet.accessories.map((acc) => (
								<span
									key={acc}
									className="inline-flex items-center px-2 py-1 rounded-full bg-muted text-xs">
									{acc === "bow" ? "🎀" : acc === "crown" ? "👑" : "✨"} {acc}
								</span>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
}
