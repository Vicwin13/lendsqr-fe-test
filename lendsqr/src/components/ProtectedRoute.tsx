"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");

    if (!isAuth) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  // Don't render anything while checking authentication or if not authenticated
  if (isAuthenticated === null || isAuthenticated === false) {
    return null;
  }

  return <>{children}</>;
}
