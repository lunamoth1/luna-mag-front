import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AdminState } from "@/types/stores/adminStore";

export const useAdminStore = create<AdminState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			setAuthenticated: (value) => set({ isAuthenticated: value }),
			logout: () => set({ isAuthenticated: false }),
		}),
		{
			name: "admin-storage",
			storage: createJSONStorage(() => localStorage),
		},
	),
);
