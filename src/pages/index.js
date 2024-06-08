"use client";

import { useState } from "react";
import { Form, Input, Button, notification, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (values.username === "admin" && values.password === "admin") {
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in!",
        });
      } else {
        notification.error({
          message: "Login Failed",
          description: "Invalid username or password.",
        });
      }
    }, 2000);
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", paddingTop: "50px" }}>
      <h1>Login</h1>
      <Form name="login" onFinish={onFinish} initialValues={{ remember: true }}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Por favor insira o usuário!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Usuário" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor insira a senha!" }]}
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
            offset: 8,
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
    </div>
  );
}
