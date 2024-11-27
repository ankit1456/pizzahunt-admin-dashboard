import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TUser } from "./lib/types/user.types";

type TAuthState = {
  user: TUser | null;
  setUser: (user: TUser | null) => void;
  logoutFromStore: () => void;
};

export const useAuth = create<TAuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logoutFromStore: () => set({ user: null }),
  }))
);
