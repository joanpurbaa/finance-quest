import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CoinBadge } from "@/components/game/CoinBadge";
import { Button } from "@/components/ui/button";
import { mockUser, mockShopItems, ShopItem } from "@/lib/gameData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Lock, ShoppingBag } from "lucide-react";

export default function Shop() {
	const [coins, setCoins] = useState(mockUser.coins);
	const [items, setItems] = useState(mockShopItems);

	const handlePurchase = (item: ShopItem) => {
		if (item.owned) {
			toast.info(`You already own ${item.name}!`);
			return;
		}

		if (coins < item.price) {
			toast.error("Not enough coins! Complete more quests to earn coins.");
			return;
		}

		setCoins(coins - item.price);
		setItems(items.map((i) => (i.id === item.id ? { ...i, owned: true } : i)));
		toast.success(`🎉 Purchased ${item.name}!`);
	};

	const accessories = items.filter((i) => i.type === "accessory");
	const themes = items.filter((i) => i.type === "theme");
	const badges = items.filter((i) => i.type === "badge");

	const renderItem = (item: ShopItem) => (
		<div
			key={item.id}
			className={cn(
				"p-4 rounded-xl border transition-all duration-300",
				item.owned
					? "bg-success/10 border-success/30"
					: "bg-card border-border hover:border-secondary/50 hover:shadow-glow-gold",
			)}>
			<div className="text-center mb-3">
				<span className="text-4xl">{item.icon}</span>
			</div>
			<h3 className="font-display font-bold text-foreground text-center mb-1">
				{item.name}
			</h3>
			<p className="text-xs text-muted-foreground text-center mb-3">
				{item.description}
			</p>

			{item.owned ? (
				<div className="flex items-center justify-center gap-2 text-success">
					<Check className="w-4 h-4" />
					<span className="text-sm font-medium">Owned</span>
				</div>
			) : (
				<Button
					onClick={() => handlePurchase(item)}
					disabled={coins < item.price}
					className={cn(
						"w-full font-display font-semibold",
						coins >= item.price
							? "bg-gradient-to-r from-secondary to-coin-glow text-secondary-foreground"
							: "bg-muted text-muted-foreground",
					)}>
					<span className="mr-2">🪙</span>
					{item.price}
				</Button>
			)}
		</div>
	);

	return (
		<div className="min-h-screen bg-background pb-24 lg:pb-8">
			<Navbar coins={coins} level={mockUser.level} />

			<main className="container mx-auto px-4 pt-20 lg:pt-24">
				<div className="flex items-start justify-between mb-8">
					<div>
						<h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
							🛍️ Rewards Shop
						</h1>
						<p className="text-muted-foreground">
							Spend your hard-earned coins on rewards!
						</p>
					</div>
					<CoinBadge amount={coins} size="lg" />
				</div>

				<Tabs defaultValue="accessories" className="space-y-6">
					<TabsList className="bg-muted p-1 rounded-xl grid grid-cols-3 w-full max-w-md">
						<TabsTrigger
							value="accessories"
							className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
							🎀 Accessories
						</TabsTrigger>
						<TabsTrigger
							value="themes"
							className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
							🎨 Themes
						</TabsTrigger>
						<TabsTrigger
							value="badges"
							className="rounded-lg data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
							💎 Badges
						</TabsTrigger>
					</TabsList>

					<TabsContent value="accessories">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{accessories.map(renderItem)}
						</div>
					</TabsContent>

					<TabsContent value="themes">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{themes.map(renderItem)}
						</div>
					</TabsContent>

					<TabsContent value="badges">
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
							{badges.map(renderItem)}
						</div>
					</TabsContent>
				</Tabs>

				<div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-secondary/10 via-coin-glow/10 to-secondary/10 border border-secondary/20 text-center">
					<h3 className="font-display font-bold text-lg text-foreground mb-2">
						💰 Need More Coins?
					</h3>
					<p className="text-muted-foreground mb-4">
						Complete quests, maintain streaks, and stay under budget to earn more!
					</p>
					<div className="flex flex-wrap items-center justify-center gap-4 text-sm">
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
							<span>📜</span>
							<span className="text-muted-foreground">Quest: 15-100 coins</span>
						</div>
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
							<span>🔥</span>
							<span className="text-muted-foreground">7-Day Streak: 100 coins</span>
						</div>
						<div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
							<span>⚔️</span>
							<span className="text-muted-foreground">Boss Victory: 200 coins</span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
