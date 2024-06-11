"use client";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function Appbar() {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <div>Appbar - em construção</div> : null;
}
