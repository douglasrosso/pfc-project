"use client";

import { useAuth } from "../hooks/useAuth";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {
    return value;
  },
  expiredInfo: null,
  setExpiredInfo: (value) => {
    return value;
  },
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useAuth();
  const [expiredInfo, setExpiredInfo] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        expiredInfo,
        setExpiredInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
