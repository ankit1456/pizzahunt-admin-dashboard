import { create } from "zustand";
import { IUser } from "./types";

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
}

export const useAuthState = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
  },
  logout: () => {
    set({ user: null });
  },
}));