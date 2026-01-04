"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");

    if (!isAuth) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}
