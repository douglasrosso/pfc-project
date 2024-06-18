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
} from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";

const { Option } = Select;

export default function CreateEntry() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
    fetchAccounts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      if (!response.success && response.message) {
        return;
      }
      setCategories(response.data.data);
    } catch (error) {
      message.error("Erro ao carregar as categorias.");
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("/api/accounts");
      if (!response.success && response.message) {
        return;
      }
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
      const response = await axios.post("/api/entries", {
        ...values,
        comments: "on",
      });
      if (!response.success && response.message) {
        return;
      }
      message.success("Entrada criada com sucesso!");
      handleSuccess();
    } catch (error) {
      message.error("Erro ao criar a entrada.");
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
          placeholder="Selecione a data de pagamento"
          style={{ width: "100%" }}
          format={{
            format: "DD/MM/YYYY",
            type: "mask",
          }}
        />
      </Form.Item>

      <Form.Item name="payment_date" label="Data de Pagamento">
        <DatePicker
          placeholder="Selecione a data de pagamento"
          style={{ width: "100%" }}
          format={{
            format: "DD/MM/YYYY",
            type: "mask",
          }}
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

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
}
