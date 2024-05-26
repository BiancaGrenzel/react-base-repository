import { create } from "zustand";

interface StoreState {
  uid: string;
  name: string | null;
  email: string | null;
  birthDate: string | null;
  phone: string | null;
  setUser: (user: Partial<StoreState>) => void;
  resetUser: () => void;
}

export const useUserStore = create<StoreState>((set) => ({
  uid: "",
  name: "",
  email: "",
  birthDate: "",
  phone: "",
  setUser: (user: Partial<StoreState>) => set(user),
  resetUser: () =>
    set({ uid: "", name: "", email: "", birthDate: "", phone: "" }),
}));
