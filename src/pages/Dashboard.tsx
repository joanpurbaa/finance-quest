import { Navbar } from "@/components/layout/Navbar";
import { XPBar } from "@/components/game/XPBar";
import { CoinBadge } from "@/components/game/CoinBadge";
import { PetDisplay } from "@/components/game/PetDisplay";
import { QuestCard } from "@/components/game/QuestCard";
import { StatCard } from "@/components/game/StatCard";
import { BudgetProgress } from "@/components/game/BudgetProgress";
import { mockUser, mockPet, mockQuests, formatCurrency } from "@/lib/gameData";
import { Flame, TrendingUp, Target, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
	const [user, setUser] = useState(mockUser);
	const [quests, setQuests] = useState(mockQuests);

	const handleClaimQuest = (questId: string) => {
		const quest = quests.find((q) => q.id === questId);
		if (quest) {
			setQuests(
				quests.map((q) => (q.id === questId ? { ...q, claimed: true } : q)),
			);
			setUser({
				...user,
				xp: user.xp + quest.xpReward,
				coins: user.coins + quest.coinReward,
			});
			toast.success(
				`🎉 Claimed ${quest.xpReward} XP and ${quest.coinReward} coins!`,
			);
		}
	};

	const activeQuests = quests.filter((q) => !q.claimed);
	const completedToday = quests.filter((q) => q.completed).length;

	return (
		<div className="min-h-screen bg-background pb-24 lg:pb-8">
			<Navbar coins={user.coins} level={user.level} />

			<main className="container mx-auto px-4 pt-20 lg:pt-24">
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
						Adventure Hub 🏰
					</h1>
					<p className="text-muted-foreground">
						Welcome back,{" "}
						<span className="text-primary font-medium">{user.name}</span>! Ready for
						today's quests?
					</p>
				</div>

				<div className="grid lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 space-y-6">
						<div className="p-6 rounded-2xl bg-card border border-border">
							<XPBar
								current={user.xp}
								max={user.xpToNextLevel}
								level={user.level}
								size="lg"
							/>
							<p className="text-sm text-muted-foreground mt-2 text-center">
								{user.xpToNextLevel - user.xp} XP to Level {user.level + 1}!
							</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<StatCard
								title="Streak"
								value={`${user.streak} days`}
								iconEmoji="🔥"
								variant="secondary"
								subtitle="Keep it up!"
							/>
							<StatCard
								title="Quests Today"
								value={`${completedToday}/${quests.length}`}
								icon={Target}
								variant="primary"
							/>
							<StatCard
								title="Monthly Saved"
								value={formatCurrency(user.monthlyBudget - user.monthlySpent)}
								icon={TrendingUp}
								variant="success"
							/>
							<StatCard
								title="Day"
								value="4 of 30"
								icon={Calendar}
								variant="accent"
								subtitle="February"
							/>
						</div>

						<div className="p-6 rounded-2xl bg-card border border-border">
							<h2 className="font-display font-bold text-lg text-foreground mb-4 flex items-center gap-2">
								<span>💰</span> Monthly Budget Journey
							</h2>
							<BudgetProgress spent={user.monthlySpent} budget={user.monthlyBudget} />
						</div>

						<div>
							<div className="flex items-center justify-between mb-4">
								<h2 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
									<span>📜</span> Active Quests
								</h2>
								<Link
									to="/quests"
									className="text-sm text-primary hover:underline font-medium">
									View all →
								</Link>
							</div>
							<div className="grid md:grid-cols-2 gap-4">
								{activeQuests.slice(0, 4).map((quest) => (
									<QuestCard key={quest.id} quest={quest} onClaim={handleClaimQuest} />
								))}
							</div>
						</div>
					</div>

					<div className="space-y-6">
						<div className="p-6 rounded-2xl bg-card border border-border">
							<div className="flex items-center justify-between mb-4">
								<h2 className="font-display font-bold text-lg text-foreground">
									Your Companion
								</h2>
								<Link
									to="/pet"
									className="text-sm text-accent hover:underline font-medium">
									Details →
								</Link>
							</div>
							<PetDisplay pet={mockPet} size="lg" />
						</div>

						<div className="p-6 rounded-2xl bg-card border border-border">
							<h2 className="font-display font-bold text-lg text-foreground mb-4">
								Quick Actions
							</h2>
							<div className="space-y-3">
								<Link
									to="/transactions"
									className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
									<span className="text-2xl">📝</span>
									<div>
										<p className="font-medium text-foreground">Track Expense</p>
										<p className="text-xs text-muted-foreground">Log your spending</p>
									</div>
								</Link>
								<Link
									to="/budget-map"
									className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
									<span className="text-2xl">🗺️</span>
									<div>
										<p className="font-medium text-foreground">Budget Map</p>
										<p className="text-xs text-muted-foreground">View your journey</p>
									</div>
								</Link>
								<Link
									to="/shop"
									className="flex items-center gap-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
									<span className="text-2xl">🛍️</span>
									<div>
										<p className="font-medium text-foreground">Rewards Shop</p>
										<p className="text-xs text-muted-foreground">Spend your coins</p>
									</div>
								</Link>
								<Link
									to="/boss-fight"
									className="flex items-center gap-3 p-3 rounded-xl bg-destructive/10 border border-destructive/30 hover:bg-destructive/20 transition-colors">
									<span className="text-2xl">⚔️</span>
									<div>
										<p className="font-medium text-destructive">Boss Battle</p>
										<p className="text-xs text-destructive/80">Monthly showdown</p>
									</div>
								</Link>
							</div>
						</div>

						<div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
							<p className="text-foreground font-medium text-center italic">
								"Every coin saved is XP for your future self!" ✨
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
