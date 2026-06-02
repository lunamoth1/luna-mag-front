import { MarqueeItem } from "../api/marquee";

export interface MarqueeState {
	marquee: MarqueeItem[];
	setMarquee: (marquee: MarqueeItem[]) => void;
}
