"use client"

import { useAuth } from "../hooks/useAuth";
import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {
    return value;
  },
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
