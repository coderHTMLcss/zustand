import { create } from "zustand";

type Meals = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealsState = {
  meals: Meals[];
  searchQuery: string;
  setMeals: (meals: Meals[]) => void;
  setSearchQuery: (query: string) => void;
};

export const useStore = create<MealsState>((set) => ({
  meals: [],
  searchQuery: "",
  setMeals: (meals) => set({ meals }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
