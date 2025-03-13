import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../types/IUser';

interface AuthState {
  token: string | null;
  user: IUser | null;
  setToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: localStorage.getItem("token") || null,
      user: null,
      setToken: (token) => {
        localStorage.setItem("token", token || "");
        set({ token });
      },
      setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
      },
      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ token: null, user: null });
      },
    }),
    { name: "auth-store" }
  )
);
