"use client";

import React, { Fragment, useState } from "react";
import { Button, Form, Input, Select, Space, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { useExpiredInfo } from "@/app/hooks/useExpiredInfo";

const { Option } = Select;

export default function CreateCategory() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [fetchItems] = useExpiredInfo();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await api.post("/api/categories", values);
      message.success("Categoria criada com sucesso!");
      fetchItems();
      handleSuccess();
    } catch (error) {
      message.error("Erro ao salvar a categoria.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/categories");
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Typography.Title
        level={2}
        style={{
          marginBottom: 20,
        }}
      >
        Nova categoria
      </Typography.Title>

      <Form.Item
        name="description"
        label="Nome da Categoria"
        rules={[
          {
            required: true,
            message: "Por favor, insira o nome da categoria!",
          },
        ]}
      >
        <Input placeholder="Insira o nome da categoria" />
      </Form.Item>

      <Form.Item
        name="type"
        label="Tipo"
        rules={[{ required: true, message: "Por favor, selecione o tipo!" }]}
      >
        <Select placeholder="Selecione um tipo">
          <Option value="Receita">Receita</Option>
          <Option value="Despesa">Despesa</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
          <Button href="/categories">Cancelar</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
