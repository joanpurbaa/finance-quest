import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Quests from "./pages/Quests";
import Transactions from "./pages/Transactions";
import BudgetMap from "./pages/BudgetMap";
import PetPage from "./pages/PetPage";
import Shop from "./pages/Shop";
import BossFight from "./pages/BossFight";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/quests" element={<Quests />} />
					<Route path="/transactions" element={<Transactions />} />
					<Route path="/budget-map" element={<BudgetMap />} />
					<Route path="/pet" element={<PetPage />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/boss-fight" element={<BossFight />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
