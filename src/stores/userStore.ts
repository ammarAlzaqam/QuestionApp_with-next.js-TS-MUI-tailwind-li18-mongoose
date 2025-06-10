// stores/userStore.ts
import { create } from "zustand";
import { UserDocument } from "@/models/user";

interface UserState {
  user: UserDocument | null;
  setUser: (user: UserDocument | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
