"use client";


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Select, Spin, Typography, message } from "antd";

const { Option } = Select;

export default function Categoria({ params }) {
  const { id } = params;
  const [form] = Form.useForm();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/categories/${id}`)
        .then((response) => {
          setCategory(response.data);
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
      if (category) {
        await axios.put(`/api/categories/${category.id}`, values);
        message.success("Categoria atualizada com sucesso!");
      } else {
        await axios.post("/api/categories", values);
        message.success("Categoria criada com sucesso!");
      }
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
          {category ? "Editar de Categoria" : "Nova Categoria"}
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
              name="name"
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
                <Option value="income">Receita</Option>
                <Option value="expense">Despesa</Option>
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
