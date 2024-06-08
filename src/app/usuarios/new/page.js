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

export default function User() {
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
        {user ? "Edição Cadastral" : "Cadastro de Usuários"}
      </Typography.Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            {
              required: true,
              message: "Por favor, insira o nome do usuário!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              required: true,
              message: "Por favor, insira o e-mail do usuário!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="user"
          label="Usuário"
          rules={[
            {
              required: true,
              message: "Por favor, insira o nome de usuário!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="pwd"
          label="Senha"
          rules={[
            {
              required: true,
              message: "Por favor, insira a senha!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="level"
          label="Nível"
          rules={[
            {
              required: true,
              message: "Por favor, selecione o nível de acesso!",
            },
          ]}
        >
          <Select placeholder="Selecione um nível">
            <Option value="normal">Normal</Option>
            <Option value="admin">Admin</Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o status do usuário!",
              },
            ]}
          >
            <Input />
          </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cadastrar Usuário
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
