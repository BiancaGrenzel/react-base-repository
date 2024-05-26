import { create } from "zustand";

interface StoreState {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export const useThemeStore = create<StoreState>((set) => ({
  theme: "light",
  setTheme: (theme: "dark" | "light") => set({ theme }),
}));
