"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function validateAuth() {
    const auth = getCookie("auth");
    const response = await axios.get(`/api/login/${auth ?? "null"}`);
    setIsAuthenticated(response.data.success);
  }

  useEffect(() => {
    validateAuth();
  }, []);

  return [isAuthenticated, setIsAuthenticated];
}
