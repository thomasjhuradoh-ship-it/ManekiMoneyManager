
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: TransactionType;
}

export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  completed: boolean;
}

export interface Budget {
  category: string;
  limit: number;
}

export interface Forecast {
  nextWeekEstimate: number;
  nextMonthEstimate: number;
  insights: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export enum View {
  DASHBOARD = 'dashboard',
  TRANSACTIONS = 'transactions',
  BUDGET = 'budget',
  AI_FORECAST = 'ai_forecast',
  SUPERMARKET = 'supermarket'
}
