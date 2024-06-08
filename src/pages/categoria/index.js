import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

export default function Categoria() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Faça a chamada para a API para salvar os dados
      const response = await axios.post("/api/categorias", values); // Aqui, presumindo que sua API esteja disponível em /api/categorias
      console.log("Categoria salva:", response.data);
      // Limpe o formulário após salvar
      form.resetFields();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    }
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="categoria-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Nome da Categoria"
        name="nome"
        rules={[
          { required: true, message: "Por favor insira o nome da categoria!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Descrição" name="descricao">
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
}
