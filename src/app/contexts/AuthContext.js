"use client";

import { useAuth } from "../hooks/useAuth";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => value,
  expiredInfo: null,
  setExpiredInfo: (value) => value,
  isLoading: false,
  setIsLoading: (value) => value,
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useAuth();
  const [expiredInfo, setExpiredInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        expiredInfo,
        setExpiredInfo,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
