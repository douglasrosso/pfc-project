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
  Typography,
} from "antd";
import { useRouter } from "next/navigation";

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/accounts", values);
      message.success("Conta cadastrada com sucesso!");
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
    <main>
      <Typography.Title
        level={2}
        style={{
          marginBottom: 20,
        }}
      >
        Nova conta
      </Typography.Title>
      {loading ? (
        <Spin
          size="large"
          style={{ justifyContent: "center", display: "flex" }}
        />
      ) : (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="description"
            label="Tipo da conta"
            rules={[
              {
                required: true,
                message: "Por favor, insira o tipo da conta da conta!",
              },
            ]}
          >
            <Input />
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
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      )}
    </main>
  );
}
