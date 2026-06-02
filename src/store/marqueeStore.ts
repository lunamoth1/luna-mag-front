import { create } from "zustand";
import { MarqueeState } from "@/types/stores/marqueeStore";

export const useMarqueeStore = create<MarqueeState>((set) => ({
	marquee: [],
	setMarquee: (marquee) => set({ marquee }),
}));
