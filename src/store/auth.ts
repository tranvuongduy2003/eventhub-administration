import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/types/user.type";
import { SignInResponseDto } from "@/types/auth.type";

interface AuthState {
  profile: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (profileData: User | null, tokens: SignInResponseDto) => void;
  setTokens: (tokens: SignInResponseDto) => void;
  setProfile: (profileData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      profile: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,

      login: (profileData, tokens) =>
        set({
          profile: profileData,
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        }),

      setTokens: (tokens) =>
        set({
          token: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        }),

      setProfile: (userData) =>
        set({
          profile: userData,
        }),

      logout: () =>
        set({
          profile: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        profile: state.profile,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
