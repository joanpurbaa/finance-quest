import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { mockUser, formatCurrency } from "@/lib/gameData";
import { cn } from "@/lib/utils";
import {
	Swords,
	Shield,
	Trophy,
	Heart,
	TrendingDown,
	Sparkles,
} from "lucide-react";

type BattleState = "ready" | "fighting" | "victory" | "defeat";

export default function BossFight() {
	const [battleState, setBattleState] = useState<BattleState>("ready");
	const [bossHealth, setBossHealth] = useState(100);
	const [playerHealth, setPlayerHealth] = useState(100);

	const isUnderBudget = mockUser.monthlySpent <= mockUser.monthlyBudget;
	const budgetPercentage =
		(mockUser.monthlySpent / mockUser.monthlyBudget) * 100;
	const damage = Math.max(0, 100 - budgetPercentage);

	const startBattle = () => {
		setBattleState("fighting");

		let currentBossHealth = 100;
		let currentPlayerHealth = 100;

		const battleInterval = setInterval(() => {
			if (isUnderBudget) {
				currentBossHealth -= Math.random() * 20 + 10;
				currentPlayerHealth -= Math.random() * 5;
			} else {
				currentPlayerHealth -= Math.random() * 15 + 10;
				currentBossHealth -= Math.random() * 10;
			}

			setBossHealth(Math.max(0, currentBossHealth));
			setPlayerHealth(Math.max(0, currentPlayerHealth));

			if (currentBossHealth <= 0 || currentPlayerHealth <= 0) {
				clearInterval(battleInterval);
				setTimeout(() => {
					setBattleState(currentBossHealth <= 0 ? "victory" : "defeat");
				}, 500);
			}
		}, 300);
	};

	const resetBattle = () => {
		setBattleState("ready");
		setBossHealth(100);
		setPlayerHealth(100);
	};

	return (
		<div className="min-h-screen bg-background pb-24 lg:pb-8">
			<Navbar coins={mockUser.coins} level={mockUser.level} />

			<main className="container mx-auto px-4 pt-20 lg:pt-24">
				<div className="text-center mb-8">
					<h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
						⚔️ Monthly Boss Battle
					</h1>
					<p className="text-muted-foreground">
						Face the Debt Monster at the end of each month!
					</p>
				</div>

				<div className="max-w-2xl mx-auto">
					<div
						className={cn(
							"relative p-8 rounded-3xl border-2 overflow-hidden",
							battleState === "victory"
								? "bg-success/10 border-success animate-pulse"
								: battleState === "defeat"
									? "bg-destructive/10 border-destructive"
									: "bg-card border-border",
						)}>
						{battleState === "fighting" && (
							<div className="absolute inset-0 overflow-hidden">
								<div className="absolute top-0 left-1/4 w-32 h-32 bg-destructive/20 rounded-full blur-3xl animate-pulse" />
								<div className="absolute bottom-0 right-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
							</div>
						)}

						{battleState === "ready" && (
							<div className="relative z-10 space-y-8">
								<div className="text-center">
									<div className="text-8xl mb-4 animate-float">👹</div>
									<h2 className="text-2xl font-display font-bold text-destructive mb-2">
										The Debt Monster
									</h2>
									<p className="text-muted-foreground">
										A fearsome beast born from overspending and impulse buys!
									</p>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="p-4 rounded-xl bg-muted/50 text-center">
										<p className="text-sm text-muted-foreground mb-1">
											Your Budget Power
										</p>
										<p
											className={cn(
												"text-2xl font-display font-bold",
												isUnderBudget ? "text-success" : "text-destructive",
											)}>
											{isUnderBudget ? "STRONG 💪" : "WEAKENED 😰"}
										</p>
									</div>
									<div className="p-4 rounded-xl bg-muted/50 text-center">
										<p className="text-sm text-muted-foreground mb-1">Budget Used</p>
										<p className="text-2xl font-display font-bold text-foreground">
											{budgetPercentage.toFixed(0)}%
										</p>
									</div>
								</div>

								<div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
									<p className="text-center text-primary font-medium">
										{isUnderBudget
											? `🗡️ You'll deal ${damage.toFixed(0)}% damage to the boss!`
											: `⚠️ The boss has the advantage! You overspent by ${formatCurrency(mockUser.monthlySpent - mockUser.monthlyBudget)}`}
									</p>
								</div>

								<Button
									onClick={startBattle}
									size="lg"
									className="w-full h-16 text-xl font-display font-bold bg-gradient-to-r from-destructive to-boss-glow text-destructive-foreground shadow-glow-danger hover:opacity-90">
									<Swords className="w-6 h-6 mr-3" />
									Begin Battle!
								</Button>
							</div>
						)}

						{battleState === "fighting" && (
							<div className="relative z-10 space-y-6">
								<div className="flex items-center justify-between">
									<div className="text-center flex-1">
										<div className="text-6xl mb-2 animate-wiggle">🦸</div>
										<p className="font-display font-bold text-foreground">You</p>
										<div className="mt-2">
											<div className="h-3 bg-muted rounded-full overflow-hidden">
												<div
													className="h-full bg-success rounded-full transition-all duration-300"
													style={{ width: `${playerHealth}%` }}
												/>
											</div>
											<p className="text-sm text-muted-foreground mt-1">
												{playerHealth.toFixed(0)}%
											</p>
										</div>
									</div>

									<div className="px-4">
										<div className="text-3xl font-display font-bold text-destructive animate-pulse">
											VS
										</div>
									</div>

									<div className="text-center flex-1">
										<div className="text-6xl mb-2 animate-shake">👹</div>
										<p className="font-display font-bold text-destructive">
											Debt Monster
										</p>
										<div className="mt-2">
											<div className="h-3 bg-muted rounded-full overflow-hidden">
												<div
													className="h-full bg-destructive rounded-full transition-all duration-300"
													style={{ width: `${bossHealth}%` }}
												/>
											</div>
											<p className="text-sm text-muted-foreground mt-1">
												{bossHealth.toFixed(0)}%
											</p>
										</div>
									</div>
								</div>

								<div className="p-4 rounded-xl bg-muted/50 text-center">
									<p className="text-foreground font-medium animate-pulse">
										⚔️ Battle in progress...
									</p>
								</div>
							</div>
						)}

						{battleState === "victory" && (
							<div className="relative z-10 text-center space-y-6">
								<div className="text-8xl animate-bounce">🏆</div>
								<h2 className="text-3xl font-display font-bold text-success">
									VICTORY!
								</h2>
								<p className="text-lg text-foreground">
									You defeated the Debt Monster!
								</p>

								<div className="grid grid-cols-2 gap-4">
									<div className="p-4 rounded-xl bg-success/10 border border-success/30">
										<Sparkles className="w-8 h-8 mx-auto text-success mb-2" />
										<p className="text-success font-bold">+200 XP</p>
									</div>
									<div className="p-4 rounded-xl bg-secondary/10 border border-secondary/30">
										<span className="text-3xl">🪙</span>
										<p className="text-secondary font-bold mt-1">+200 Coins</p>
									</div>
								</div>

								<div className="p-4 rounded-xl bg-accent/10 border border-accent/30">
									<p className="text-accent font-medium">
										🌟 Your pet gained 50 growth points from this victory!
									</p>
								</div>

								<Button onClick={resetBattle} variant="outline" size="lg">
									Battle Again
								</Button>
							</div>
						)}

						{battleState === "defeat" && (
							<div className="relative z-10 text-center space-y-6">
								<div className="text-8xl">😔</div>
								<h2 className="text-3xl font-display font-bold text-destructive">
									Defeated...
								</h2>
								<p className="text-lg text-foreground">
									The Debt Monster was too strong this time.
								</p>

								<div className="p-4 rounded-xl bg-muted">
									<h3 className="font-display font-bold text-foreground mb-3">
										💡 Recovery Tips
									</h3>
									<ul className="space-y-2 text-sm text-muted-foreground text-left">
										<li>• Review your spending categories</li>
										<li>• Set daily spending limits</li>
										<li>• Complete more saving quests</li>
										<li>• Try the "No Impulse Spending" challenge</li>
									</ul>
								</div>

								<div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
									<p className="text-primary font-medium">
										🌱 Don't worry! Every setback is a lesson. You got this next month!
									</p>
								</div>

								<Button onClick={resetBattle} variant="outline" size="lg">
									Try Again
								</Button>
							</div>
						)}
					</div>

					<div className="mt-8 p-6 rounded-2xl bg-card border border-border">
						<h3 className="font-display font-bold text-lg text-foreground mb-4">
							📊 February Summary
						</h3>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Total Budget</span>
								<span className="font-bold text-foreground">
									{formatCurrency(mockUser.monthlyBudget)}
								</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-muted-foreground">Total Spent</span>
								<span
									className={cn(
										"font-bold",
										isUnderBudget ? "text-success" : "text-destructive",
									)}>
									{formatCurrency(mockUser.monthlySpent)}
								</span>
							</div>
							<div className="border-t border-border pt-3 flex items-center justify-between">
								<span className="text-muted-foreground">
									{isUnderBudget ? "Saved" : "Overspent"}
								</span>
								<span
									className={cn(
										"font-display font-bold text-lg",
										isUnderBudget ? "text-success" : "text-destructive",
									)}>
									{formatCurrency(
										Math.abs(mockUser.monthlyBudget - mockUser.monthlySpent),
									)}
								</span>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
