"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Select, Spin, Typography, message } from "antd";
import { useRouter } from "next/navigation";

const { Option } = Select;

export default function EditCategory({ params }) {
  const { id } = params;
  const [form] = Form.useForm();
  const router = useRouter();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/categories/${id}`)
        .then((response) => {
          setCategory(response.data.data);
          setLoading(false);
        })
        .catch(() => {
          message.error("Erro ao carregar a categoria.");
          setLoading(false);
        });
    }
  }, [id]);

  const onFinish = async (values) => {
    try {
      await axios.put(`/api/categories/${category._id}`, values);
      message.success("Categoria atualizada com sucesso!");

      handleSuccess();
    } catch (error) {
      message.error("Erro ao salvar a categoria.");
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
        Editar categoria
      </Typography.Title>

      {loading ? (
        <Spin
          size="large"
          style={{ justifyContent: "center", display: "flex" }}
        />
      ) : (
        <Form
          form={form}
          initialValues={category}
          onFinish={onFinish}
          layout="vertical"
        >
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
