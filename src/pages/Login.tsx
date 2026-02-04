import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Mail, Lock, User } from "lucide-react";

export default function Login() {
	const navigate = useNavigate();
	const [isSignUp, setIsSignUp] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		navigate("/dashboard");
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
				<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
			</div>

			<div className="relative z-10 w-full max-w-md">
				<div className="text-center mb-8">
					<Link to="/" className="inline-flex items-center gap-3 mb-4">
						<span className="text-4xl">🏰</span>
						<span className="font-display font-bold text-2xl text-foreground">
							Finance Quest
						</span>
					</Link>
					<p className="text-muted-foreground">
						{isSignUp
							? "Create your adventurer account"
							: "Welcome back, adventurer!"}
					</p>
				</div>

				<div className="p-8 rounded-2xl bg-card border border-border">
					<form onSubmit={handleSubmit} className="space-y-5">
						{isSignUp && (
							<div className="space-y-2">
								<Label htmlFor="name" className="text-foreground font-medium">
									Adventurer Name
								</Label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
									<Input
										id="name"
										type="text"
										placeholder="Enter your name"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="pl-10 bg-muted border-border focus:border-primary h-12"
										required
									/>
								</div>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="email" className="text-foreground font-medium">
								Email
							</Label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
								<Input
									id="email"
									type="email"
									placeholder="hero@financequest.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="pl-10 bg-muted border-border focus:border-primary h-12"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password" className="text-foreground font-medium">
								Password
							</Label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
								<Input
									id="password"
									type="password"
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="pl-10 bg-muted border-border focus:border-primary h-12"
									required
								/>
							</div>
						</div>

						<Button
							type="submit"
							className="w-full h-12 bg-gradient-to-r from-primary to-xp-glow text-primary-foreground font-display font-bold text-lg rounded-xl shadow-glow hover:opacity-90 transition-all duration-300">
							{isSignUp ? "Create Account" : "Enter the Realm"}
							<ArrowRight className="w-5 h-5 ml-2" />
						</Button>
					</form>

					<div className="mt-6 text-center">
						<p className="text-muted-foreground text-sm">
							{isSignUp ? "Already have an account?" : "New to Finance Quest?"}{" "}
							<button
								onClick={() => setIsSignUp(!isSignUp)}
								className="text-primary font-medium hover:underline">
								{isSignUp ? "Sign in" : "Create account"}
							</button>
						</p>
					</div>
				</div>

				<div className="mt-6 p-4 rounded-xl bg-accent/10 border border-accent/30 text-center">
					<p className="text-sm text-accent">
						🎮 This is a demo. Click any button to explore the app!
					</p>
				</div>
			</div>
		</div>
	);
}
