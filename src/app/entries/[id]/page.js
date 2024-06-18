"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Switch,
  DatePicker,
  message,
  InputNumber,
  Space,
} from "antd";
import { useRouter } from "next/navigation";
import moment from "moment";
import { api } from "@/utils/api";

const { Option } = Select;

export default function EditEntry({ params }) {
  const router = useRouter();
  const { id } = params || {};
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(!!id);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (id) {
      fetchCategories();
      fetchAccounts();
      fetchEntry();
    }
  }, [id]);

  async function fetchEntry() {
    try {
      setLoading(true);
      const response = await api.get(`/api/entries/${id}`);
      const entryData = response.data.data;
      entryData.due_date = moment(entryData.due_date);
      entryData.payment_date = moment(entryData.payment_date);
      form.setFieldsValue(entryData);
    } catch (error) {
      message.error("Erro ao carregar a entrada.");
    } finally {
      setLoading(false);
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await api.get("/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      message.error("Erro ao carregar as categorias.");
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await api.get("/api/accounts");
      setAccounts(response.data.data);
    } catch (error) {
      message.error("Erro ao carregar as contas.");
    }
  };

  const onValuesChange = (changedValues) => {
    if (changedValues.type) {
      const filtered = categories.filter(
        (category) => category.type === changedValues.type
      );
      setFilteredCategories(filtered);
      form.setFieldsValue({ categories: null });
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      values.due_date = values.due_date.toISOString();
      values.payment_date = values.payment_date.toISOString();
      await api.put(`/api/entries/${id}`, values);
      message.success("Entrada atualizada com sucesso!");
      handleSuccess();
    } catch (error) {
      message.error("Erro ao salvar a entrada.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    router.push("/entries");
  };

  return (
    <Form
      form={form}
      initialValues={form}
      onValuesChange={onValuesChange}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="type"
        label="Tipo"
        rules={[
          {
            required: true,
            message: "Por favor, selecione o tipo!",
          },
        ]}
      >
        <Select placeholder="Selecione o tipo">
          <Option value="Despesa">Despesa</Option>
          <Option value="Receita">Receita</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="categories"
        label="Categoria"
        rules={[
          {
            required: true,
            message: "Por favor, selecione a categoria!",
          },
        ]}
      >
        <Select placeholder="Selecione a categoria">
          {filteredCategories.map((category) => (
            <Option key={category._id} value={category.description}>
              {category.description}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Descrição"
        rules={[
          {
            required: true,
            message: "Por favor, insira a descrição!",
          },
        ]}
      >
        <Input placeholder="Insira a descrição" />
      </Form.Item>

      <Form.Item
        name="value"
        label="Valor"
        rules={[
          {
            required: true,
            message: "Por favor, insira o valor!",
          },
        ]}
      >
        <InputNumber placeholder="Insira o valor" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="due_date"
        label="Data de Vencimento"
        rules={[
          {
            required: true,
            message: "Por favor, selecione a data de vencimento!",
          },
        ]}
      >
        <DatePicker
          placeholder="Selecione a data de vencimento"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item name="payment_date" label="Data de Pagamento">
        <DatePicker
          placeholder="Selecione a data de pagamento"
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        name="account"
        label="Conta"
        rules={[
          {
            required: true,
            message: "Por favor, selecione a conta!",
          },
        ]}
      >
        <Select placeholder="Selecione a conta">
          {accounts.map((account) => (
            <Option
              key={account._id}
              value={`${account.description} - ${account.comments}`}
            >
              {`${account.description} - ${account.comments}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[
          {
            required: true,
            message: "Por favor, selecione o status!",
          },
        ]}
      >
        <Select placeholder="Selecione o status">
          <Option value="Lancada">Lançada</Option>
          <Option value="Confirmada">Confirmada</Option>
          <Option value="Paga">Paga</Option>
          <Option value="Cancelada">Cancelada</Option>
        </Select>
      </Form.Item>

      <Form.Item name="comments" label="Ativo" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" oading={loading}>
            Salvar
          </Button>
          <Button href="/entries">Cancelar</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
