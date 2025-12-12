"use client";

import { useAuth } from "@/contexts/AuthContext";

export function AdminOnly({ children }) {
  const { isAdmin } = useAuth();
  
  if (!isAdmin) {
    return null;
  }
  
  return <>{children}</>;
}
