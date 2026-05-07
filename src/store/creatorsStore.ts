import { create } from "zustand";
import type { Creator } from "@/types/api/creator";

interface CreatorsState {
	creators: Creator[];
	setCreators: (creators: Creator[]) => void;
}

export const useCreatorsStore = create<CreatorsState>((set) => ({
	creators: [],
	setCreators: (creators) => set({ creators }),
}));
