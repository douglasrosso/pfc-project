"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Spin, Typography, message } from "antd";
import { useRouter } from "next/navigation";

export default function EditAccount({ params }) {
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
        const response = await axios.get(`/api/accounts/${id}`);
        const userData = response.data.data;
        form.setFieldsValue(userData);
      }
    } catch (error) {
      message.error("Erro ao carregar a conta.");
    } finally {
      setLoading(false);
    }
  }

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.put(`/api/accounts/${form.getFieldValue("_id")}`, values);
      message.success("Conta atualizada com sucesso!");

      handleSuccess();
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
        Editar conta
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
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      )}
    </main>
  );
}
