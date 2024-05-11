import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { AuthState } from "./types";

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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
