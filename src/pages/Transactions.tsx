import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	mockUser,
	mockTransactions,
	categoryIcons,
	formatCurrency,
	Transaction,
} from "@/lib/gameData";
import { Plus, TrendingDown, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Transactions() {
	const [transactions, setTransactions] =
		useState<Transaction[]>(mockTransactions);
	const [showForm, setShowForm] = useState(false);
	const [formData, setFormData] = useState({
		amount: "",
		category: "",
		type: "expense" as "expense" | "income",
		notes: "",
		date: new Date().toISOString().split("T")[0],
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.amount || !formData.category) {
			toast.error("Please fill in all required fields");
			return;
		}

		const newTransaction: Transaction = {
			id: Date.now().toString(),
			amount: parseFloat(formData.amount),
			category: formData.category as Transaction["category"],
			type: formData.type,
			notes: formData.notes,
			date: formData.date,
		};

		setTransactions([newTransaction, ...transactions]);
		setFormData({
			amount: "",
			category: "",
			type: "expense",
			notes: "",
			date: new Date().toISOString().split("T")[0],
		});
		setShowForm(false);

		toast.success(
			formData.type === "expense"
				? "📝 Expense tracked! +10 XP for good habits!"
				: "💰 Income recorded!",
		);
	};

	const totalExpenses = transactions
		.filter((t) => t.type === "expense" && t.category !== "savings")
		.reduce((sum, t) => sum + t.amount, 0);

	const totalIncome = transactions
		.filter((t) => t.type === "income")
		.reduce((sum, t) => sum + t.amount, 0);

	const totalSavings = transactions
		.filter((t) => t.category === "savings")
		.reduce((sum, t) => sum + t.amount, 0);

	const groupedTransactions = transactions.reduce(
		(groups, transaction) => {
			const date = transaction.date;
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(transaction);
			return groups;
		},
		{} as Record<string, Transaction[]>,
	);

	return (
		<div className="min-h-screen bg-background pb-24 lg:pb-8">
			<Navbar coins={mockUser.coins} level={mockUser.level} />

			<main className="container mx-auto px-4 pt-20 lg:pt-24">
				<div className="flex items-start justify-between mb-8">
					<div>
						<h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
							📊 Transaction Tracker
						</h1>
						<p className="text-muted-foreground">
							Log your adventures through the financial realm
						</p>
					</div>
					<Button
						onClick={() => setShowForm(!showForm)}
						className="bg-gradient-to-r from-primary to-xp-glow text-primary-foreground font-display font-semibold shadow-glow">
						<Plus className="w-4 h-4 mr-2" />
						Add
					</Button>
				</div>

				<div className="grid grid-cols-3 gap-4 mb-6">
					<div className="p-4 rounded-xl bg-card border border-border">
						<div className="flex items-center gap-2 mb-1">
							<TrendingUp className="w-4 h-4 text-success" />
							<span className="text-sm text-muted-foreground">Income</span>
						</div>
						<div className="text-lg font-display font-bold text-success">
							{formatCurrency(totalIncome)}
						</div>
					</div>
					<div className="p-4 rounded-xl bg-card border border-border">
						<div className="flex items-center gap-2 mb-1">
							<TrendingDown className="w-4 h-4 text-destructive" />
							<span className="text-sm text-muted-foreground">Expenses</span>
						</div>
						<div className="text-lg font-display font-bold text-destructive">
							{formatCurrency(totalExpenses)}
						</div>
					</div>
					<div className="p-4 rounded-xl bg-card border border-border">
						<div className="flex items-center gap-2 mb-1">
							<span className="text-sm">💰</span>
							<span className="text-sm text-muted-foreground">Saved</span>
						</div>
						<div className="text-lg font-display font-bold text-primary">
							{formatCurrency(totalSavings)}
						</div>
					</div>
				</div>

				{showForm && (
					<div className="p-6 rounded-2xl bg-card border border-border mb-6 animate-scale-in">
						<h2 className="font-display font-bold text-lg text-foreground mb-4">
							New Transaction
						</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="type">Type</Label>
									<Select
										value={formData.type}
										onValueChange={(value: "expense" | "income") =>
											setFormData({ ...formData, type: value })
										}>
										<SelectTrigger className="bg-muted">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="expense">💸 Expense</SelectItem>
											<SelectItem value="income">💵 Income</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="amount">Amount (IDR)</Label>
									<Input
										id="amount"
										type="number"
										placeholder="50000"
										value={formData.amount}
										onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
										className="bg-muted"
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="category">Category</Label>
									<Select
										value={formData.category}
										onValueChange={(value) =>
											setFormData({ ...formData, category: value })
										}>
										<SelectTrigger className="bg-muted">
											<SelectValue placeholder="Select category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="food">🍔 Food</SelectItem>
											<SelectItem value="transport">🚗 Transport</SelectItem>
											<SelectItem value="shopping">🛍️ Shopping</SelectItem>
											<SelectItem value="bills">📄 Bills</SelectItem>
											<SelectItem value="savings">💰 Savings</SelectItem>
											<SelectItem value="entertainment">🎮 Entertainment</SelectItem>
											{formData.type === "income" && (
												<SelectItem value="income">💵 Salary/Income</SelectItem>
											)}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="date">Date</Label>
									<Input
										id="date"
										type="date"
										value={formData.date}
										onChange={(e) => setFormData({ ...formData, date: e.target.value })}
										className="bg-muted"
									/>
								</div>
							</div>

							<div className="space-y-2">
								<Label htmlFor="notes">Notes (optional)</Label>
								<Textarea
									id="notes"
									placeholder="What did you spend on?"
									value={formData.notes}
									onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
									className="bg-muted resize-none"
									rows={2}
								/>
							</div>

							<div className="flex gap-3">
								<Button
									type="submit"
									className="flex-1 bg-primary text-primary-foreground">
									Save Transaction
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setShowForm(false)}>
									Cancel
								</Button>
							</div>
						</form>
					</div>
				)}

				<div className="space-y-6">
					{Object.entries(groupedTransactions)
						.sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
						.map(([date, dayTransactions]) => (
							<div key={date}>
								<h3 className="text-sm font-medium text-muted-foreground mb-3">
									{new Date(date).toLocaleDateString("en-US", {
										weekday: "long",
										month: "short",
										day: "numeric",
									})}
								</h3>
								<div className="space-y-2">
									{dayTransactions.map((transaction) => (
										<div
											key={transaction.id}
											className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
											<div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-2xl">
												{categoryIcons[transaction.category]}
											</div>
											<div className="flex-1 min-w-0">
												<p className="font-medium text-foreground capitalize">
													{transaction.category}
												</p>
												<p className="text-sm text-muted-foreground truncate">
													{transaction.notes || "No notes"}
												</p>
											</div>
											<div
												className={cn(
													"text-right font-display font-bold",
													transaction.type === "income" ? "text-success" : "text-foreground",
												)}>
												{transaction.type === "income" ? "+" : "-"}
												{formatCurrency(transaction.amount)}
											</div>
										</div>
									))}
								</div>
							</div>
						))}
				</div>
			</main>
		</div>
	);
}
