"use client";

import React, { Fragment, useState } from "react";
import { Button, Form, Input, message, Space, Typography } from "antd";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import { useExpiredInfo } from "@/app/hooks/useExpiredInfo";

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [fetchItems] = useExpiredInfo();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await api.post("/api/accounts", values);
      message.success("Conta cadastrada com sucesso!");
      fetchItems();
      handleSuccess();
    } catch (error) {
      message.error("Erro ao cadastrar a conta.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/accounts");
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Typography.Title
        level={2}
        style={{
          marginBottom: 20,
        }}
      >
        Nova conta
      </Typography.Title>

      <Form.Item
        name="description"
        label="Tipo da conta"
        rules={[
          {
            required: true,
            message: "Por favor, insira o tipo da conta!",
          },
        ]}
      >
        <Input placeholder="Insira o tipo da conta" />
      </Form.Item>

      <Form.Item
        name="comments"
        label="Informações da conta"
        rules={[
          {
            required: true,
            message: "Por favor, insira as informações da conta!",
          },
        ]}
      >
        <Input.TextArea placeholder="Insira as informações da conta" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
          <Button href="/accounts">Cancelar</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
