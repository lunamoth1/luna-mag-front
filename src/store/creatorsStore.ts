import { create } from "zustand";
import { CreatorsState } from "@/types/stores/creatorsStore";

export const useCreatorsStore = create<CreatorsState>((set) => ({
	creators: [],
	isLoading: true,
	setCreators: (creators) => set({ creators }),
	setIsLoading: (isLoading) => set({ isLoading }),
}));
