import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { QuestCard } from "@/components/game/QuestCard";
import { mockUser, mockQuests } from "@/lib/gameData";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Quests() {
	const [quests, setQuests] = useState(mockQuests);
	const [user, setUser] = useState(mockUser);

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

	const activeQuests = quests.filter((q) => !q.completed || !q.claimed);
	const completedQuests = quests.filter((q) => q.completed && q.claimed);
	const dailyQuests = quests.filter((q) => q.type !== "streak");
	const streakQuests = quests.filter((q) => q.type === "streak");

	return (
		<div className="min-h-screen bg-background pb-24 lg:pb-8">
			<Navbar coins={user.coins} level={user.level} />

			<main className="container mx-auto px-4 pt-20 lg:pt-24">
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
						📜 Quest Board
					</h1>
					<p className="text-muted-foreground">
						Complete quests to earn XP, coins, and grow your pet!
					</p>
				</div>

				<div className="grid grid-cols-3 gap-4 mb-8">
					<div className="p-4 rounded-xl bg-card border border-border text-center">
						<div className="text-2xl font-display font-bold text-primary">
							{activeQuests.length}
						</div>
						<div className="text-sm text-muted-foreground">Active</div>
					</div>
					<div className="p-4 rounded-xl bg-card border border-border text-center">
						<div className="text-2xl font-display font-bold text-success">
							{completedQuests.length}
						</div>
						<div className="text-sm text-muted-foreground">Completed</div>
					</div>
					<div className="p-4 rounded-xl bg-card border border-border text-center">
						<div className="text-2xl font-display font-bold text-secondary">
							{user.streak}🔥
						</div>
						<div className="text-sm text-muted-foreground">Day Streak</div>
					</div>
				</div>

				<Tabs defaultValue="all" className="space-y-6">
					<TabsList className="bg-muted p-1 rounded-xl">
						<TabsTrigger
							value="all"
							className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
							All Quests
						</TabsTrigger>
						<TabsTrigger
							value="daily"
							className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
							Daily
						</TabsTrigger>
						<TabsTrigger
							value="streak"
							className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
							Streak
						</TabsTrigger>
					</TabsList>

					<TabsContent value="all" className="space-y-4">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							{quests.map((quest) => (
								<QuestCard key={quest.id} quest={quest} onClaim={handleClaimQuest} />
							))}
						</div>
					</TabsContent>

					<TabsContent value="daily" className="space-y-4">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							{dailyQuests.map((quest) => (
								<QuestCard key={quest.id} quest={quest} onClaim={handleClaimQuest} />
							))}
						</div>
					</TabsContent>

					<TabsContent value="streak" className="space-y-4">
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
							{streakQuests.map((quest) => (
								<QuestCard key={quest.id} quest={quest} onClaim={handleClaimQuest} />
							))}
						</div>
						{streakQuests.length === 0 && (
							<div className="text-center py-12">
								<p className="text-muted-foreground">No streak quests available yet!</p>
							</div>
						)}
					</TabsContent>
				</Tabs>

				<div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-primary/20 text-center">
					<p className="text-lg font-display font-bold text-foreground mb-2">
						🌟 Pro Tip
					</p>
					<p className="text-muted-foreground">
						Complete all daily quests to get a bonus 50 XP at midnight!
					</p>
				</div>
			</main>
		</div>
	);
}
