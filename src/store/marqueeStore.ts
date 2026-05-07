import { create } from "zustand";
import type { MarqueeItem } from "@/types/api/marquee";

interface MarqueeState {
	marquee: MarqueeItem[];
	setMarquee: (marquee: MarqueeItem[]) => void;
}

export const useMarqueeStore = create<MarqueeState>((set) => ({
	marquee: [],
	setMarquee: (marquee) => set({ marquee }),
}));
