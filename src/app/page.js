"use client";

import { Form, Input, Button, notification, Checkbox, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "./contexts/AuthContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleFailed = async (response) => {
    setIsAuthenticated(false);
    notification.error({
      message: "Falha no login",
      description: response?.data?.message ?? "Erro ao efetuar login",
    });
  };

  const handleSuccess = () => {
    setIsAuthenticated(true);
    router.replace("/home");
  };

  const handleAfterResponse = (response, err, success) => {
    if (!response?.data?.success) {
      err(response);
      return;
    }

    success();
  };

  const onFinish = async (values) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post("/api/login", values);
        handleAfterResponse(response, handleFailed, handleSuccess);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
  return (
    <>
      {!isAuthenticated && (
        <Form
          name="login"
          onFinish={onFinish}
          initialValues={{ remember: true }}
        >
          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <h1>Login</h1>
            <div>
              <Form.Item
                name="user"
                rules={[
                  { required: true, message: "Por favor, insira o usuário!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Usuário" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Por favor, insira a senha!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Senha"
                />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  span: 16,
                }}
              >
                <Checkbox>Lembrar me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Entrar
                </Button>
              </Form.Item>
            </div>
          </Space>
        </Form>
      )}
    </>
  );
}
