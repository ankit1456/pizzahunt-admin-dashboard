import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TUser } from "./types";

type TAuthState = {
  user: TUser | null;
  setUser: (user: TUser) => void;
  logoutFromStore: () => void;
};

export const useAuth = create<TAuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logoutFromStore: () => set({ user: null }),
  }))
);
