"use client";

import {
  Form,
  Input,
  Button,
  notification,
  Checkbox
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "./contexts/AuthContext";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const onFinish = async (values) => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post("/api/login", values);
        if (response?.data?.success) {
          setIsAuthenticated(true);
          router.push("/home");
        } else {
          setIsAuthenticated(false);
          notification.error({
            message: "Falha no login",
            description: response?.data?.message ?? "Erro ao efetuar login",
          });
        }
      } finally {
        setLoading(false);
      }
    }, 1000);
  };
  return (
    <Fragment>
      <Form name="login" onFinish={onFinish} initialValues={{ remember: true }}>
        <h1>Login</h1>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Por favor, insira o usuário!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Usuário" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor, insira a senha!" }]}
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
          <Button type="primary" htmlType="submit" loading={loading} block>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
