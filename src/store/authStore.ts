import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUser } from '../types/IUser';

interface AuthState {
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      setToken: (token) => {
        set({ token, isAuthenticated: !!token });
      },
      setUser: (user) => {
        set({ user });
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        set({ token: null, user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
