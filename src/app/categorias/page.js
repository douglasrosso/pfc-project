"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Spin,
  message,
  Table,
  Select,
  Typography,
} from "antd";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/users");
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Erro ao carregar os usuários.");
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Nome da Categoria",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tipo",
      dataIndex: "type",
      key: "type",
    },
  ];

  return (
    <main>
      <Typography.Title
        level={2}
        style={{
          marginBottom: 20,
        }}
      >
        Lista de Categorias
      </Typography.Title>
      {loading ? (
        <Spin
          size="large"
          style={{ justifyContent: "center", display: "flex" }}
        />
      ) : (
        <Table columns={columns} dataSource={categories} />
      )}
    </main>
  );
}
