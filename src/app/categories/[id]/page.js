"use client";

import React, { useState, useEffect, Fragment } from "react";
import { Button, Form, Input, Select, Space, Spin, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";

const { Option } = Select;

export default function EditCategory({ params }) {
  const { id } = params;
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    fetchCategories();
  }, [id]);

  async function fetchCategories() {
    try {
      if (id) {
        setLoading(true);
        const response = await api.get(`/api/categories/${id}`);
        const userData = response.data.data;
        form.setFieldsValue(userData);
      }
    } catch (error) {
      message.error("Erro ao carregar a categoria.");
    } finally {
      setLoading(false);
    }
  }

  const onFinish = async (values) => {
    try {
      await api.put(`/api/categories/${form.getFieldValue("_id")}`, values);
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
    <Fragment>
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
          initialValues={form}
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
            <Input placeholder="Insira o nome da categoria" />
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
          <Space>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
              <Button href="/categories">Cancelar</Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </Fragment>
  );
}
