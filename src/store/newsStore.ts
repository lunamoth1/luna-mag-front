import { create } from "zustand";
import { NewsItem } from "../types/api/news";

interface NewsState {
	news: NewsItem[];
	setNews: (news: NewsItem[]) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
	news: [],
	setNews: (news) => set({ news }),
}));
