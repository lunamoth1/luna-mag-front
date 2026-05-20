import { create } from "zustand";
import type { Partner } from "@/types/api/partner";

interface PartnerState {
	partners: Partner[];
	setPartners: (partners: Partner[]) => void;
}

export const usePartnerStore = create<PartnerState>((set) => ({
	partners: [],
	setPartners: (partners) => set({ partners }),
}));
