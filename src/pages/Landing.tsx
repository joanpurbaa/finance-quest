import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Trophy, Heart } from "lucide-react";

export default function Landing() {
	return (
		<div className="min-h-screen bg-background overflow-hidden">
			<section className="relative min-h-screen flex items-center justify-center px-4 py-20">
				<div className="absolute inset-0 overflow-hidden">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
					<div
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "1s" }}
					/>
					<div
						className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "2s" }}
					/>
				</div>

				<div className="relative z-10 max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 mb-8 animate-slide-up">
						<Sparkles className="w-4 h-4 text-accent" />
						<span className="text-sm font-medium text-accent">
							Level up your financial life
						</span>
					</div>

					<h1
						className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 animate-slide-up"
						style={{ animationDelay: "0.1s" }}>
						Turn Saving Into An{" "}
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
							Epic Adventure
						</span>
					</h1>

					<p
						className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up"
						style={{ animationDelay: "0.2s" }}>
						Complete quests. Earn coins. Grow your pet.
						<br />
						Finance Quest makes budgeting feel like playing your favorite RPG.
					</p>

					<div className="my-12 animate-slide-up" style={{ animationDelay: "0.3s" }}>
						<div className="inline-block relative">
							<div className="text-8xl md:text-9xl animate-float">🌿</div>
							<div className="absolute -top-4 -right-4 text-3xl animate-bounce">
								✨
							</div>
							<div className="absolute -bottom-2 -left-4 text-2xl animate-pulse">
								🪙
							</div>
							<div className="absolute top-1/2 -right-8 text-xl animate-wiggle">
								⭐
							</div>
						</div>
					</div>

					<div
						className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
						style={{ animationDelay: "0.4s" }}>
						<Link to="/login">
							<Button
								size="lg"
								className="bg-gradient-to-r from-primary to-xp-glow text-primary-foreground font-display font-bold text-lg px-8 py-6 rounded-xl shadow-glow hover:opacity-90 transition-all duration-300 hover:scale-105">
								Start Your Quest
								<ArrowRight className="w-5 h-5 ml-2" />
							</Button>
						</Link>
						<Link to="/dashboard">
							<Button
								variant="outline"
								size="lg"
								className="font-display font-bold text-lg px-8 py-6 rounded-xl border-2 border-accent/50 hover:bg-accent/10 hover:border-accent transition-all duration-300">
								Explore Demo
							</Button>
						</Link>
					</div>

					<div
						className="flex flex-wrap items-center justify-center gap-8 mt-16 animate-slide-up"
						style={{ animationDelay: "0.5s" }}>
						<div className="text-center">
							<div className="text-3xl font-display font-bold text-primary">10K+</div>
							<div className="text-sm text-muted-foreground">Adventurers</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-display font-bold text-secondary">
								500M+
							</div>
							<div className="text-sm text-muted-foreground">IDR Saved</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-display font-bold text-accent">50K+</div>
							<div className="text-sm text-muted-foreground">Quests Completed</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 px-4 bg-card/50">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
							Your Financial Adventure Awaits
						</h2>
						<p className="text-muted-foreground text-lg max-w-2xl mx-auto">
							Experience budgeting like never before with gamified features designed to
							keep you motivated.
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="p-6 rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group">
							<div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
								<Target className="w-7 h-7 text-primary" />
							</div>
							<h3 className="font-display font-bold text-lg text-foreground mb-2">
								Daily Quests
							</h3>
							<p className="text-muted-foreground text-sm">
								Complete fun financial challenges and earn XP, coins, and pet growth
								points every day.
							</p>
						</div>

						<div className="p-6 rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-glow-gold group">
							<div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
								<span className="text-2xl">🪙</span>
							</div>
							<h3 className="font-display font-bold text-lg text-foreground mb-2">
								Earn Rewards
							</h3>
							<p className="text-muted-foreground text-sm">
								Collect coins to unlock pet accessories, themes, and exclusive
								achievements.
							</p>
						</div>

						<div className="p-6 rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-glow-purple group">
							<div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
								<Heart className="w-7 h-7 text-accent" />
							</div>
							<h3 className="font-display font-bold text-lg text-foreground mb-2">
								Pet Companion
							</h3>
							<p className="text-muted-foreground text-sm">
								Nurture your financial pet from baby to legendary status through good
								saving habits.
							</p>
						</div>

						<div className="p-6 rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border hover:border-destructive/50 transition-all duration-300 hover:shadow-glow-danger group">
							<div className="w-14 h-14 rounded-xl bg-destructive/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
								<Trophy className="w-7 h-7 text-destructive" />
							</div>
							<h3 className="font-display font-bold text-lg text-foreground mb-2">
								Boss Battles
							</h3>
							<p className="text-muted-foreground text-sm">
								Face the Debt Monster at month's end. Stay under budget to claim
								victory!
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 px-4">
				<div className="max-w-3xl mx-auto text-center">
					<div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border border-primary/20">
						<h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
							Ready to Start Your Quest?
						</h2>
						<p className="text-muted-foreground text-lg mb-8">
							Every coin saved is XP for your future self! 🚀
						</p>
						<Link to="/login">
							<Button
								size="lg"
								className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-display font-bold text-lg px-10 py-6 rounded-xl shadow-glow hover:opacity-90 transition-all duration-300 hover:scale-105">
								Begin Adventure
								<ArrowRight className="w-5 h-5 ml-2" />
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<footer className="py-8 px-4 border-t border-border">
				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<span className="text-2xl">🏰</span>
						<span className="font-display font-bold text-foreground">
							Finance Quest
						</span>
					</div>
					<p className="text-sm text-muted-foreground">
						© 2024 Finance Quest. Level up your finances.
					</p>
				</div>
			</footer>
		</div>
	);
}
