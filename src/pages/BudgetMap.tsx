import { Navbar } from "@/components/layout/Navbar";
import { mockUser, mockBudgetStops, formatCurrency } from "@/lib/gameData";
import { cn } from "@/lib/utils";

export default function BudgetMap() {
	const progressPercentage =
		(mockUser.monthlySpent / mockUser.monthlyBudget) * 100;
	const currentDay = 4;
	const totalDays = 30;
	const dayProgress = (currentDay / totalDays) * 100;

	return (
		<div className="min-h-screen bg-background pb-24 lg:pb-8">
			<Navbar coins={mockUser.coins} level={mockUser.level} />

			<main className="container mx-auto px-4 pt-20 lg:pt-24">
				<div className="mb-8">
					<h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
						🗺️ Budget Adventure Map
					</h1>
					<p className="text-muted-foreground">
						Follow your journey through the month
					</p>
				</div>

				<div className="p-6 rounded-2xl bg-card border border-border mb-8">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h2 className="font-display font-bold text-lg text-foreground">
								February 2024
							</h2>
							<p className="text-sm text-muted-foreground">
								Day {currentDay} of {totalDays}
							</p>
						</div>
						<div className="text-right">
							<p className="font-display font-bold text-xl text-foreground">
								{formatCurrency(mockUser.monthlyBudget - mockUser.monthlySpent)}
							</p>
							<p className="text-sm text-muted-foreground">remaining</p>
						</div>
					</div>

					<div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
						<div
							className="h-full bg-accent rounded-full transition-all duration-500"
							style={{ width: `${dayProgress}%` }}
						/>
					</div>
					<p className="text-xs text-muted-foreground text-center">
						{totalDays - currentDay} days remaining in this adventure
					</p>
				</div>

				<div className="relative p-6 rounded-2xl bg-gradient-to-b from-card to-muted/30 border border-border">
					<h2 className="font-display font-bold text-lg text-foreground mb-8 text-center">
						🏁 Your Budget Journey 🏆
					</h2>

					<div className="relative">
						<div className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 bg-muted rounded-full overflow-hidden">
							<div
								className={cn(
									"w-full transition-all duration-1000 rounded-full",
									progressPercentage > 80
										? "bg-gradient-to-b from-primary via-warning to-destructive"
										: "bg-gradient-to-b from-primary to-xp-glow",
								)}
								style={{ height: `${Math.min(progressPercentage, 100)}%` }}
							/>
						</div>

						<div className="relative space-y-12">
							{mockBudgetStops.map((stop, index) => {
								const isCompleted = progressPercentage >= stop.position;
								const isCurrent =
									progressPercentage >= stop.position &&
									(index === mockBudgetStops.length - 1 ||
										progressPercentage < mockBudgetStops[index + 1].position);
								const isDanger = stop.position >= 80;

								return (
									<div
										key={stop.id}
										className={cn(
											"flex items-center gap-4",
											index % 2 === 0 ? "flex-row" : "flex-row-reverse",
										)}>
										<div
											className={cn(
												"flex-1 p-4 rounded-xl border transition-all duration-300",
												isCurrent
													? "bg-primary/10 border-primary shadow-glow"
													: isCompleted
														? "bg-success/10 border-success/30"
														: isDanger
															? "bg-destructive/10 border-destructive/30"
															: "bg-card border-border",
											)}>
											<div className="flex items-center gap-3 mb-2">
												<span className="text-2xl">{stop.icon}</span>
												<h3
													className={cn(
														"font-display font-bold",
														isCurrent ? "text-primary" : "text-foreground",
													)}>
													{stop.name}
												</h3>
											</div>
											{stop.amount > 0 && (
												<div className="space-y-1">
													<div className="flex justify-between text-sm">
														<span className="text-muted-foreground">Allocated</span>
														<span className="font-medium text-foreground">
															{formatCurrency(stop.amount)}
														</span>
													</div>
													<div className="flex justify-between text-sm">
														<span className="text-muted-foreground">Spent</span>
														<span
															className={cn(
																"font-medium",
																stop.spent > stop.amount ? "text-destructive" : "text-success",
															)}>
															{formatCurrency(stop.spent)}
														</span>
													</div>
													<div className="h-1.5 bg-muted rounded-full overflow-hidden mt-2">
														<div
															className={cn(
																"h-full rounded-full transition-all",
																stop.spent > stop.amount ? "bg-destructive" : "bg-success",
															)}
															style={{
																width: `${Math.min((stop.spent / stop.amount) * 100, 100)}%`,
															}}
														/>
													</div>
												</div>
											)}
										</div>

										<div
											className={cn(
												"w-14 h-14 rounded-full flex items-center justify-center text-2xl border-4 z-10 transition-all duration-300",
												isCurrent
													? "bg-primary border-primary-foreground animate-pulse shadow-glow"
													: isCompleted
														? "bg-success border-success-foreground"
														: isDanger
															? "bg-destructive/50 border-destructive"
															: "bg-muted border-border",
											)}>
											{isCurrent ? "👤" : isCompleted ? "✓" : stop.icon}
										</div>

										<div className="flex-1" />
									</div>
								);
							})}
						</div>
					</div>

					<div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-6 border-t border-border">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-success" />
							<span className="text-sm text-muted-foreground">Completed</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
							<span className="text-sm text-muted-foreground">Current</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 rounded-full bg-destructive/50" />
							<span className="text-sm text-muted-foreground">Danger Zone</span>
						</div>
					</div>
				</div>

				<div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
					<h3 className="font-display font-bold text-foreground mb-2">
						🧭 Navigator's Tip
					</h3>
					<p className="text-muted-foreground">
						You're doing great! At this pace, you'll reach the Goal Treasure with
						<span className="text-primary font-bold">
							{" "}
							{formatCurrency(mockUser.monthlyBudget - mockUser.monthlySpent)}{" "}
						</span>
						to spare. Keep avoiding the Impulse Traps!
					</p>
				</div>
			</main>
		</div>
	);
}
