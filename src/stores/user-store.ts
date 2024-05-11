import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { UserState } from "./types";

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
      isSuccess: false,
      setIsSuccess: (success) => set(() => ({ isSuccess: success })),
    }),
    {
      name: "userStore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
