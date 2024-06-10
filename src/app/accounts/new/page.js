"use client";

import React, { useStatez } from "react";
import axios from "axios";
import { Button, Form, Input, Spin, Typography, message } from "antd";

export default function CreateAccount() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/accounts", values);
      message.success("Conta criada com sucesso!");
      handleSuccess();
      router.push("/accounts");
    } catch (error) {
      message.error("Erro ao salvar a conta.");
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
            label="Descrição"
            rules={[
              {
                required: true,
                message: "Por favor, insira a descrição da conta!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="comments"
            label="Conta"
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
