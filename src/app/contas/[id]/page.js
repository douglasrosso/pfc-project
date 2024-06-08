"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Input, Spin, Typography, message } from "antd";


export default function Conta({ params }) {
  const { id } = params;
  const [form] = Form.useForm();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/accounts/${id}`)
        .then((response) => {
          setAccount(response.data);
          form.setFieldsValue(response.data);
          setLoading(false);
        })
        .catch(() => {
          message.error("Erro ao carregar a conta.");
          setLoading(false);
        });
    }
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      if (account) {
        await axios.put(`/api/accounts/${account.id}`, values);
        message.success("Conta atualizada com sucesso!");
      } else {
        await axios.post("/api/accounts", values);
        message.success("Conta criada com sucesso!");
      }
      router.push("/accounts");
    } catch (error) {
      message.error("Erro ao salvar a conta.");
    }
  };

  return (
    
      
      <main>
        <Typography.Title
          level={2}
          style={{
            marginBottom: 20,
          }}
        >
          {account ? "Editar Conta" : "Nova Conta"}
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
