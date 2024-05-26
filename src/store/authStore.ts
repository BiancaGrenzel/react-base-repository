import { create } from "zustand";

interface StoreState {
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string | null) => void;
}

export const useAuthStore = create<StoreState>((set) => ({
  refreshToken: "",
  setRefreshToken: (refreshToken: string | null) => set({ refreshToken }),
}));
