"use client";

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Layout } from "antd";

const { Header } = Layout;

export function Appbar() {
  const router = useRouter();
  const { setIsAuthenticated } = useContext(AuthContext);

  async function handleExitClicked() {
    const response = await axios.get("/api/logout");

    if (response.data.success) {
      setIsAuthenticated(false);
      router.replace("/");
    }
  }
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Header>
      Appbar - em construção <button onClick={handleExitClicked}>Sair</button>
    </Header>
  ) : null;
}
