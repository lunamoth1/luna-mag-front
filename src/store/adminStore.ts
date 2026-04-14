import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AdminState {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: 'admin-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
