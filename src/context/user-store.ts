import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { UserState } from "./type";

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: "",
        email: "",
        profileImage: "",
        appliedJobs: [],
      },
      setUser: (userData) => set(() => ({ user: userData })),
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
