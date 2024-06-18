"use client";

import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Select,
  Spin,
  Switch,
  Typography,
  message,
} from "antd";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

const { Option } = Select;

export default function EditUser({ params }) {
  const { id } = params;
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    fetchUser();
  }, [id]);

  async function fetchUser() {
    try {
      setLoading(true);
      if (id) {
        const response = await api.get(`/api/users/${id}`);
        const userData = response.data.data;
        userData.status = userData.status === "on";

        form.setFieldsValue(userData);
      }
    } catch (error) {
      message.error("Erro ao carregar o usuário.");
    } finally {
      setLoading(false);
    }
  }

  const onFinish = async (values) => {
    try {
      setLoading(true);
      values.status = values.status ? "on" : "off";
      await api.put(
        `/api/users/${form.getFieldValue("_id")}`,
        values
      );
      message.success("Usuário atualizado com sucesso!");

      handleSuccess();
    } catch (error) {
      message.error("Erro ao salvar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/users");
  };

  return (
    <Fragment>
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
          initialValues={form}
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
            <Input placeholder="Insira o nome do usuário" />
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
            <Input placeholder="Insira o e-mail do usuário" />
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
            <Input placeholder="Insira o nome de usuário" />
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
            <Input.Password placeholder="Insira a senha" />
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
              Editar usuário
            </Button>
          </Form.Item>
        </Form>
      )}
    </Fragment>
  );
}
