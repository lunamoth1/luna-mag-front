import { create } from "zustand";

interface CreatorsState {
	creators: any[];
	setCreators: (creators: any[]) => void;
}

export const useCreatorsStore = create<CreatorsState>((set) => ({
	creators: [],
	setCreators: (creators) => set({ creators }),
}));
