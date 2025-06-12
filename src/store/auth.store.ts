import { create } from 'zustand'

interface User {
  id: number
  name: string
  email: string
  role: string
  //a modifier selon les données du backend
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  setUser: (user: User | null) => void
  setAccessToken: (token: string | null) => void
  setRefreshToken: (token: string | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,

  setUser: (user) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),
  setRefreshToken: (token) => set({ refreshToken: token }),

  clearAuth: () => set({
    user: null,
    accessToken: null,
    refreshToken: null,
  }),
}))
