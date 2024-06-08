"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin, message, Table, Typography, Space, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleConfirmClicked = (id) => {
    return () => {
      deleteCategory(id);
    };
  };

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      message.error("Erro ao carregar as categorias.");
      setLoading(false);
    }
  }

  async function deleteCategory(id) {
    try {
      setLoading(true);
      await axios.delete(`/api/categories/${id}`);
      message.success("Categoria excluída com sucesso!");
      setLoading(false);
      fetchCategories();
    } catch (error) {
      message.error("Erro ao excluir a categoria.");
      setLoading(false);
    }
  }

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
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a href={"/categorias/" + record._id}>
            <EditOutlined />
          </a>
          <Popconfirm
            title="Excluir categoria"
            description="Você tem certeza que deseja excluir a categoria?"
            onConfirm={handleConfirmClicked(record._id)}
            okText="Sim"
            cancelText="Não"
          >
            <a>
              <DeleteOutlined />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <main>
      {loading ? (
        <Spin
          size="large"
          style={{ justifyContent: "center", display: "flex" }}
        />
      ) : (
        <Table
          loading={loading}
          sticky
          columns={columns}
          dataSource={categories}
          title={() => (
            <Typography.Title
              level={2}
              style={{
                marginBottom: 20,
              }}
            >
              Lista de Categorias
            </Typography.Title>
          )}
        />
      )}
    </main>
  );
}
