import { create } from "zustand";

interface MarqueeState {
	marquee: string[];
	setMarquee: (marquee: string[]) => void;
}

export const useMarqueeStore = create<MarqueeState>((set) => ({
	marquee: [],
	setMarquee: (marquee) => set({ marquee }),
}));
