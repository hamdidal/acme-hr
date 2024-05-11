"use client";

import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const Guard = ({ children }: { children: ReactNode }) => {
  const { accessToken } = useAuthStore();
  const accessTokenLocal = localStorage.getItem("accessToken");
  const router = useRouter();
  useEffect(() => {
    if (!accessToken && !accessTokenLocal) {
      router.push("/");
    }
  }, [accessToken, accessTokenLocal, router]);
  return <div>{children}</div>;
};

export default Guard;
