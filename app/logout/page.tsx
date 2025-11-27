"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await logout();
      router.push("/login");
    })();
  }, [logout, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Logging out...</p>
    </div>
  );
}
