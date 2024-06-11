"use client";

import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Select,
  Spin,
  Switch,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function CreateUser() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      values.status = values.status ? "on" : "off";
      await axios.post("/api/users", values);
      message.success("Usuário cadastrado com sucesso!");
      handleSuccess();
    } catch (error) {
      message.error("Erro ao cadastrar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/users");
  };

  return (
    <main>
      <Typography.Title
        level={2}
        style={{
          marginBottom: 20,
        }}
      >
        Cadastro de Usuários
      </Typography.Title>
      {loading ? (
        <Spin
          size="large"
          style={{ justifyContent: "center", display: "flex" }}
        />
      ) : (
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

          <Form.Item name="status" label="Status" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cadastrar usuário
            </Button>
          </Form.Item>
        </Form>
      )}
    </main>
  );
}
