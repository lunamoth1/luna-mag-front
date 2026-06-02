import { create } from "zustand";
import { NewsState } from "@/types/stores/newsStore";

export const useNewsStore = create<NewsState>((set) => ({
	news: [],
	isLoading: true,
	setNews: (news) => set({ news }),
	setIsLoading: (isLoading) => set({ isLoading }),
}));
