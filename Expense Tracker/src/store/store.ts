import { create } from "zustand";

interface Expense {
  id: number;
  description: string;
  amount: number;
}

interface Store {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: number) => void;
}

export const useStore = create<Store>((set) => ({
  expenses: [],

  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),
  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    })),
}));
