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


const { Option } = Select;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Erro ao carregar os usuários.");
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    try {
      await axios.post("/api/users", values);
      message.success("Usuário cadastrado com sucesso!");
      form.resetFields();
      fetchUsers();
    } catch (error) {
      message.error("Erro ao cadastrar o usuário.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Usuário",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Nível",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
          Lista de Usuários
        </Typography.Title>
        {loading ? (
          <Spin
            size="large"
            style={{ justifyContent: "center", display: "flex" }}
          />
        ) : (
          <Table columns={columns} dataSource={users} />
        )}
      </main>
    
  );
}
