"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User } from "../types/user";
import { authService } from "@/lib/authService";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<User>;
  signup: (username: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize local user store and read current user from localStorage
    authService.initialize();
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    const loggedInUser = await authService.login(identifier, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const signup = async (username: string, email: string, password: string) => {
    const newUser = await authService.signup(username, email, password);
    setUser(newUser);
    return newUser;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
