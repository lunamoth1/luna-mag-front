import { create } from "zustand";
import { PartnerState } from "@/types/stores/partnerStore";

export const usePartnerStore = create<PartnerState>((set) => ({
	partners: [],
	setPartners: (partners) => set({ partners }),
}));
