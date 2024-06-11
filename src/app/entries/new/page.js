"use client";

import React, { useState } from "react";
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

const { Option } = Select;

export default function CreateEntry() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log(values);
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
    <main>
      <Form form={form} onFinish={onFinish} layout="vertical">
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
          <Select placeholder="Selecione a categoria"></Select>
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
          <DatePicker placeholder="Selecione a data de vencimento" />
        </Form.Item>

        <Form.Item
          name="payment_date"
          label="Data de Pagamento"
          rules={[
            {
              required: true,
              message: "Por favor, selecione a data de pagamento!",
            },
          ]}
        >
          <DatePicker placeholder="Selecione a data de pagamento" />
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
          <Select placeholder="Selecione a conta"></Select>
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
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
}
