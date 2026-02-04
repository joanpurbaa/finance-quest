import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CoinBadge } from "@/components/game/CoinBadge";
import {
	Home,
	Scroll,
	Wallet,
	Map,
	Heart,
	ShoppingBag,
	Swords,
	Menu,
	X,
} from "lucide-react";
import { useState } from "react";

const navItems = [
	{ path: "/dashboard", label: "Hub", icon: Home },
	{ path: "/quests", label: "Quests", icon: Scroll },
	{ path: "/transactions", label: "Tracker", icon: Wallet },
	{ path: "/budget-map", label: "Map", icon: Map },
	{ path: "/pet", label: "Pet", icon: Heart },
	{ path: "/shop", label: "Shop", icon: ShoppingBag },
	{ path: "/boss-fight", label: "Boss", icon: Swords },
];

interface NavbarProps {
	coins?: number;
	level?: number;
}

export function Navbar({ coins = 2450, level = 7 }: NavbarProps) {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<>
			<nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
				<div className="container mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<Link to="/dashboard" className="flex items-center gap-2">
							<span className="text-2xl">🏰</span>
							<span className="font-display font-bold text-lg text-foreground hidden sm:block">
								Finance Quest
							</span>
						</Link>

						<div className="hidden lg:flex items-center gap-1">
							{navItems.map((item) => {
								const Icon = item.icon;
								const isActive = location.pathname === item.path;
								return (
									<Link
										key={item.path}
										to={item.path}
										className={cn(
											"flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
											isActive
												? "bg-primary/20 text-primary"
												: "text-muted-foreground hover:text-foreground hover:bg-muted",
										)}>
										<Icon className="w-4 h-4" />
										<span className="text-sm font-medium">{item.label}</span>
									</Link>
								);
							})}
						</div>

						<div className="flex items-center gap-3">
							<div className="hidden sm:flex items-center gap-2">
								<div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20">
									<span className="text-sm">⭐</span>
									<span className="text-sm font-bold text-primary">Lv.{level}</span>
								</div>
							</div>
							<CoinBadge amount={coins} size="sm" />

							<button
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors">
								{mobileMenuOpen ? (
									<X className="w-6 h-6 text-foreground" />
								) : (
									<Menu className="w-6 h-6 text-foreground" />
								)}
							</button>
						</div>
					</div>
				</div>
			</nav>

			{mobileMenuOpen && (
				<div className="fixed inset-0 z-40 lg:hidden">
					<div
						className="absolute inset-0 bg-background/80 backdrop-blur-sm"
						onClick={() => setMobileMenuOpen(false)}
					/>
					<div className="absolute top-16 left-0 right-0 bg-card border-b border-border animate-slide-up">
						<div className="container mx-auto px-4 py-4">
							<div className="grid grid-cols-2 gap-2">
								{navItems.map((item) => {
									const Icon = item.icon;
									const isActive = location.pathname === item.path;
									return (
										<Link
											key={item.path}
											to={item.path}
											onClick={() => setMobileMenuOpen(false)}
											className={cn(
												"flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
												isActive
													? "bg-primary/20 text-primary"
													: "text-muted-foreground hover:text-foreground hover:bg-muted",
											)}>
											<Icon className="w-5 h-5" />
											<span className="font-medium">{item.label}</span>
										</Link>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			)}

			<nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-t border-border lg:hidden">
				<div className="flex items-center justify-around h-16 px-2">
					{navItems.slice(0, 5).map((item) => {
						const Icon = item.icon;
						const isActive = location.pathname === item.path;
						return (
							<Link
								key={item.path}
								to={item.path}
								className={cn(
									"flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
									isActive ? "text-primary" : "text-muted-foreground",
								)}>
								<Icon className={cn("w-5 h-5", isActive && "animate-bounce")} />
								<span className="text-[10px] font-medium">{item.label}</span>
							</Link>
						);
					})}
				</div>
			</nav>
		</>
	);
}
