"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Spin,
  Typography,
  message,
} from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function EditUser({ params }) {
  const { id } = params;
  const [form] = Form.useForm();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/users/${id}`)
        .then((response) => {
          setUser(response.data.data);
        })
        .catch(() => {
          message.error("Erro ao carregar o usuário.");
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onFinish = async (values) => {
    try {
      await axios.put(`/api/users/${user._id}`, values);
      message.success("Usuário atualizado com sucesso!");

      handleSuccess();
    } catch (error) {
      message.error("Erro ao salvar o usuário.");
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
        Edição Cadastral
      </Typography.Title>
      {loading ? (
        <Spin
          size="large"
          style={{ justifyContent: "center", display: "flex" }}
        />
      ) : (
        <Form
          form={form}
          initialValues={user}
          onFinish={onFinish}
          layout="vertical"
        >
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

          <Form.Item
            name="status"
            label="Status"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Por favor, selecione o status do usuário!",
              },
            ]}
          >
            <Checkbox>Ativo</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Editar usuário
            </Button>
          </Form.Item>
        </Form>
      )}
    </main>
  );
}
