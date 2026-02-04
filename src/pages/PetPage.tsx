import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { PetDisplay } from "@/components/game/PetDisplay";
import { AchievementBadge } from "@/components/game/AchievementBadge";
import {
	mockUser,
	mockPet,
	mockAchievements,
	petStages,
	Pet,
} from "@/lib/gameData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const allPetStages: Pet[] = [
	{
		id: "baby",
		name: "Sprout",
		stage: "baby",
		happiness: 100,
		growthPoints: 0,
		pointsToEvolve: 100,
		accessories: [],
	},
	{
		id: "teen",
		name: "Goldie",
		stage: "teen",
		happiness: 85,
		growthPoints: 340,
		pointsToEvolve: 500,
		accessories: ["bow"],
	},
	{
		id: "adult",
		name: "Guardian",
		stage: "adult",
		happiness: 90,
		growthPoints: 800,
		pointsToEvolve: 1000,
		accessories: ["crown"],
	},
	{
		id: "legendary",
		name: "Sage",
		stage: "legendary",
		happiness: 100,
		growthPoints: 1500,
		pointsToEvolve: 1500,
		accessories: ["crown", "aura"],
	},
];

export default function PetPage() {
	const [selectedStage, setSelectedStage] = useState<Pet["stage"]>(
		mockPet.stage,
	);
	const displayPet =
		allPetStages.find((p) => p.stage === selectedStage) || mockPet;

	const unlockedAchievements = mockAchievements.filter((a) => a.unlocked);
	const lockedAchievements = mockAchievements.filter((a) => !a.unlocked);

	return (
		<div className="min-h-screen bg-background pb-24 lg:pb-8">
			<Navbar coins={mockUser.coins} level={mockUser.level} />

			<main className="container mx-auto px-4 pt-20 lg:pt-24">
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
						💖 Pet Companion
					</h1>
					<p className="text-muted-foreground">
						Nurture your financial companion with good habits
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-8">
					<div className="space-y-6">
						<div className="p-8 rounded-2xl bg-card border border-border">
							<div className="text-center mb-6">
								<span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
									Your Current Companion
								</span>
							</div>
							<PetDisplay pet={mockPet} size="xl" />

							<div className="mt-6 p-4 rounded-xl bg-muted/50 text-center">
								<p className="text-sm text-muted-foreground mb-2">
									{petStages[mockPet.stage].description}
								</p>
								<p className="text-primary font-medium">
									{mockPet.pointsToEvolve - mockPet.growthPoints} points until evolution!
								</p>
							</div>
						</div>

						<div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20">
							<h3 className="font-display font-bold text-foreground mb-3">
								🌟 How to Grow Your Pet
							</h3>
							<ul className="space-y-2 text-sm text-muted-foreground">
								<li className="flex items-start gap-2">
									<span className="text-primary">✓</span>
									Complete daily quests for growth points
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary">✓</span>
									Maintain saving streaks for bonus happiness
								</li>
								<li className="flex items-start gap-2">
									<span className="text-primary">✓</span>
									Stay under budget to keep your pet happy
								</li>
								<li className="flex items-start gap-2">
									<span className="text-warning">!</span>
									Overspending makes your pet sad
								</li>
							</ul>
						</div>
					</div>

					<div className="space-y-6">
						<div className="p-6 rounded-2xl bg-card border border-border">
							<h2 className="font-display font-bold text-lg text-foreground mb-4">
								🌱 Evolution Stages
							</h2>
							<div className="grid grid-cols-4 gap-2">
								{Object.entries(petStages).map(([stage, info]) => {
									const isUnlocked =
										allPetStages.findIndex((p) => p.stage === stage) <=
										allPetStages.findIndex((p) => p.stage === mockPet.stage);
									const isCurrent = stage === mockPet.stage;

									return (
										<button
											key={stage}
											onClick={() => isUnlocked && setSelectedStage(stage as Pet["stage"])}
											disabled={!isUnlocked}
											className={cn(
												"p-3 rounded-xl text-center transition-all",
												isCurrent
													? "bg-accent/20 border-2 border-accent"
													: isUnlocked
														? "bg-muted hover:bg-muted/80 border border-border"
														: "bg-muted/50 opacity-50 border border-dashed border-muted-foreground/30",
											)}>
											<div className={cn("text-3xl mb-1", !isUnlocked && "grayscale")}>
												{info.emoji}
											</div>
											<p className="text-xs font-medium text-foreground truncate">
												{info.name.split(" ")[0]}
											</p>
										</button>
									);
								})}
							</div>

							{selectedStage !== mockPet.stage && (
								<div className="mt-4 p-4 rounded-xl bg-muted/50 text-center animate-scale-in">
									<div className="text-5xl mb-2">{petStages[selectedStage].emoji}</div>
									<h3 className="font-display font-bold text-foreground">
										{petStages[selectedStage].name}
									</h3>
									<p className="text-sm text-muted-foreground mt-1">
										{petStages[selectedStage].description}
									</p>
								</div>
							)}
						</div>

						<div className="p-6 rounded-2xl bg-card border border-border">
							<h2 className="font-display font-bold text-lg text-foreground mb-4">
								🏆 Achievements
							</h2>

							<div className="mb-6">
								<h3 className="text-sm font-medium text-muted-foreground mb-3">
									Unlocked ({unlockedAchievements.length})
								</h3>
								<div className="grid grid-cols-3 gap-4">
									{unlockedAchievements.map((achievement) => (
										<AchievementBadge
											key={achievement.id}
											achievement={achievement}
											size="sm"
										/>
									))}
								</div>
							</div>

							<div>
								<h3 className="text-sm font-medium text-muted-foreground mb-3">
									Locked ({lockedAchievements.length})
								</h3>
								<div className="grid grid-cols-3 gap-4">
									{lockedAchievements.map((achievement) => (
										<AchievementBadge
											key={achievement.id}
											achievement={achievement}
											size="sm"
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
