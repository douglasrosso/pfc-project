"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Select, Spin, Typography, message } from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function CreateCategory({ params }) {
  const [loading, setLoading] = useState(!!id);
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = params;

  const onFinish = async (values) => {
    try {
      await axios.post("/api/categories", values);
      message.success("Categoria criada com sucesso!");
      handleSuccess();
      setLoading(false);
    } catch (error) {
      message.error("Erro ao salvar a categoria.");
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/categories");
  };

  return (
    <main>
      <Typography.Title
        level={2}
        style={{
          marginBottom: 20,
        }}
      >
        Nova Categoria
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
            label="Nome da Categoria"
            rules={[
              {
                required: true,
                message: "Por favor, insira o nome da categoria!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Tipo"
            rules={[
              { required: true, message: "Por favor, selecione o tipo!" },
            ]}
          >
            <Select placeholder="Selecione um tipo">
              <Option value="Receita">Receita</Option>
              <Option value="Despesa">Despesa</Option>
            </Select>
          </Form.Item>

          <Form.Item >
            <Button  type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      )}
    </main>
  );
}
