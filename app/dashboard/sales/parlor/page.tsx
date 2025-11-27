"use client";

import { useAuth } from "@/context/AuthContext";

export default function ParlorSalesPage() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You must log in first.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Parlor Sales</h1>
      <p className="mt-4">Placeholder page for Parlor Sales.</p>
    </div>
  );
}
