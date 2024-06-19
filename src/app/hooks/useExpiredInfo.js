"use client";

import { api } from "@/utils/api";
import { message } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useExpiredInfo() {
  const { setExpiredInfo } = useContext(AuthContext);

  async function fetchItems() {
    try {
      const response = await api.get("/api/entries/expired");
      setExpiredInfo(response.data.data);
    } catch (error) {
      message.error("Erro ao carregar a lista.");
    }
  }

  return [fetchItems];
}
