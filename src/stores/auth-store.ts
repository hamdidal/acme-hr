"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AuthState } from "./types";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated:
        typeof window !== "undefined"
          ? document.cookie.includes("isAuthenticated=true")
          : false,
      login: () => {
        document.cookie = "isAuthenticated=true; path=/";
        set({ isAuthenticated: true });
      },
      logout: () => {
        document.cookie = "isAuthenticated=false; path=/";
        set({ isAuthenticated: false });
      },
      accessToken: null,
      setAccessToken: (token) => set(() => ({ accessToken: token! })),
      clearAccessToken: () => {
        set(() => ({ accessToken: null }));
          localStorage.removeItem("authStore");
      },
      isSuccessAdd: false,
      setIsSuccessAdd: (isSuccess) => set(() => ({ isSuccessAdd: isSuccess })),
    }),
    {
      name: "authStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
