export interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  streak: number;
  monthlyBudget: number;
  monthlySpent: number;
  petId: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: 'save' | 'track' | 'limit' | 'streak';
  target: number;
  progress: number;
  xpReward: number;
  coinReward: number;
  petPoints: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

export interface Transaction {
  id: string;
  amount: number;
  category: 'food' | 'transport' | 'shopping' | 'bills' | 'savings' | 'entertainment' | 'income';
  type: 'expense' | 'income';
  notes: string;
  date: string;
}

export interface Pet {
  id: string;
  name: string;
  stage: 'baby' | 'teen' | 'adult' | 'legendary';
  happiness: number;
  growthPoints: number;
  pointsToEvolve: number;
  accessories: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: 'accessory' | 'theme' | 'badge';
  price: number;
  icon: string;
  owned: boolean;
}

export interface BudgetStop {
  id: string;
  name: string;
  amount: number;
  spent: number;
  icon: string;
  position: number;
}

export const mockUser: User = {
  id: '1',
  name: 'Financial Hero',
  level: 7,
  xp: 680,
  xpToNextLevel: 1000,
  coins: 2450,
  streak: 12,
  monthlyBudget: 5000000,
  monthlySpent: 2850000,
  petId: '1',
};

export const mockPet: Pet = {
  id: '1',
  name: 'Goldie',
  stage: 'teen',
  happiness: 85,
  growthPoints: 340,
  pointsToEvolve: 500,
  accessories: ['bow'],
};

export const mockQuests: Quest[] = [
  {
    id: '1',
    title: 'Save 20,000 IDR Today',
    description: 'Put aside at least 20,000 IDR into your savings',
    type: 'save',
    target: 20000,
    progress: 20000,
    xpReward: 50,
    coinReward: 25,
    petPoints: 10,
    completed: true,
    claimed: true,
    icon: '💰',
  },
  {
    id: '2',
    title: 'No Impulse Snacks',
    description: 'Avoid spending on snacks and treats today',
    type: 'limit',
    target: 1,
    progress: 1,
    xpReward: 30,
    coinReward: 15,
    petPoints: 5,
    completed: true,
    claimed: false,
    icon: '🍿',
  },
  {
    id: '3',
    title: 'Track All Expenses',
    description: 'Log every single expense you make today',
    type: 'track',
    target: 5,
    progress: 3,
    xpReward: 40,
    coinReward: 20,
    petPoints: 8,
    completed: false,
    claimed: false,
    icon: '📝',
  },
  {
    id: '4',
    title: 'Spend Under 50,000 IDR',
    description: 'Keep your total spending below 50,000 IDR today',
    type: 'limit',
    target: 50000,
    progress: 35000,
    xpReward: 60,
    coinReward: 30,
    petPoints: 12,
    completed: false,
    claimed: false,
    icon: '🎯',
  },
  {
    id: '5',
    title: '7-Day Saving Streak',
    description: 'Save money for 7 consecutive days',
    type: 'streak',
    target: 7,
    progress: 5,
    xpReward: 150,
    coinReward: 100,
    petPoints: 50,
    completed: false,
    claimed: false,
    icon: '🔥',
  },
];

export const mockTransactions: Transaction[] = [
  { id: '1', amount: 25000, category: 'food', type: 'expense', notes: 'Lunch at cafeteria', date: '2024-02-04' },
  { id: '2', amount: 15000, category: 'transport', type: 'expense', notes: 'Grab ride', date: '2024-02-04' },
  { id: '3', amount: 50000, category: 'savings', type: 'expense', notes: 'Daily savings goal', date: '2024-02-04' },
  { id: '4', amount: 3000000, category: 'income', type: 'income', notes: 'Monthly salary', date: '2024-02-01' },
  { id: '5', amount: 150000, category: 'shopping', type: 'expense', notes: 'New headphones', date: '2024-02-03' },
  { id: '6', amount: 500000, category: 'bills', type: 'expense', notes: 'Internet bill', date: '2024-02-02' },
  { id: '7', amount: 35000, category: 'entertainment', type: 'expense', notes: 'Movie tickets', date: '2024-02-03' },
  { id: '8', amount: 45000, category: 'food', type: 'expense', notes: 'Dinner with friends', date: '2024-02-02' },
];

export const mockAchievements: Achievement[] = [
  { id: '1', name: 'Budget Warrior', description: 'Stay under budget for a full month', icon: '⚔️', unlocked: true, unlockedAt: '2024-01-15' },
  { id: '2', name: 'Impulse Slayer', description: 'Complete 10 "No Impulse Spending" quests', icon: '🛡️', unlocked: true, unlockedAt: '2024-01-22' },
  { id: '3', name: '7-Day Streak', description: 'Save money for 7 consecutive days', icon: '🔥', unlocked: false },
  { id: '4', name: 'Quest Master', description: 'Complete 50 quests total', icon: '👑', unlocked: false },
  { id: '5', name: 'Legendary Saver', description: 'Evolve your pet to Legendary stage', icon: '⭐', unlocked: false },
  { id: '6', name: 'First Steps', description: 'Complete your first quest', icon: '👣', unlocked: true, unlockedAt: '2024-01-01' },
];

export const mockShopItems: ShopItem[] = [
  { id: '1', name: 'Golden Crown', description: 'A royal crown for your pet', type: 'accessory', price: 500, icon: '👑', owned: false },
  { id: '2', name: 'Cute Bow', description: 'An adorable bow', type: 'accessory', price: 200, icon: '🎀', owned: true },
  { id: '3', name: 'Wizard Hat', description: 'Magical hat for your pet', type: 'accessory', price: 350, icon: '🎩', owned: false },
  { id: '4', name: 'Sunset Theme', description: 'Warm orange quest theme', type: 'theme', price: 1000, icon: '🌅', owned: false },
  { id: '5', name: 'Ocean Theme', description: 'Cool blue adventure theme', type: 'theme', price: 1000, icon: '🌊', owned: true },
  { id: '6', name: 'VIP Badge', description: 'Show off your dedication', type: 'badge', price: 2000, icon: '💎', owned: false },
];

export const mockBudgetStops: BudgetStop[] = [
  { id: '1', name: 'Payday Start', amount: 5000000, spent: 0, icon: '🏁', position: 0 },
  { id: '2', name: 'Rent Castle', amount: 1500000, spent: 1500000, icon: '🏰', position: 25 },
  { id: '3', name: 'Savings Shrine', amount: 1000000, spent: 800000, icon: '🏛️', position: 50 },
  { id: '4', name: 'Needs Village', amount: 1500000, spent: 550000, icon: '🏘️', position: 75 },
  { id: '5', name: 'Goal Treasure', amount: 0, spent: 0, icon: '🏆', position: 100 },
];

export const categoryIcons: Record<string, string> = {
  food: '🍔',
  transport: '🚗',
  shopping: '🛍️',
  bills: '📄',
  savings: '💰',
  entertainment: '🎮',
  income: '💵',
};

export const categoryColors: Record<string, string> = {
  food: 'bg-orange-500',
  transport: 'bg-blue-500',
  shopping: 'bg-pink-500',
  bills: 'bg-gray-500',
  savings: 'bg-green-500',
  entertainment: 'bg-purple-500',
  income: 'bg-emerald-500',
};

export const petStages = {
  baby: {
    name: 'Baby Sprout',
    emoji: '🌱',
    description: 'A tiny, adorable beginning of your financial journey',
  },
  teen: {
    name: 'Growing Guardian',
    emoji: '🌿',
    description: 'Learning and growing with every smart decision',
  },
  adult: {
    name: 'Wise Keeper',
    emoji: '🌳',
    description: 'A mature companion with financial wisdom',
  },
  legendary: {
    name: 'Legendary Sage',
    emoji: '✨🌳✨',
    description: 'The ultimate financial companion - a master of savings!',
  },
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}
