// hoc/withAuth.tsx
import React, { ComponentType, useEffect } from "react";
import { useRouter } from "next/router";
import useAuthStore from "@/stores/auth-store";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  const WithAuthComponent = (props: P) => {
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/login");
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return WithAuthComponent;
};

export default withAuth;
