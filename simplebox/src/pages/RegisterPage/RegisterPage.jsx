import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className={styles.container}>
      <img src="simplebox-logo.png" alt="SimpleBox" />
      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          rules={[
            {
              required: true,
              message: "Por favor, informe seu nome completo!",
            },
          ]}
        >
          <Input
            style={{ width: "360px" }}
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="nome completo"
            width={"1000px"}
          />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor, informe seu nome de usuário!",
            },
          ]}
        >
          <Input
            style={{ width: "360px" }}
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="nome de usuário"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Por favor, informe seu email!",
            },
          ]}
        >
          <Input
            style={{ width: "360px" }}
            size="large"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="e-mail"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor, informe sua senha!",
            },
          ]}
        >
          <Input
            style={{ width: "360px" }}
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="senha"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Por favor, informe sua confirmação de senha!",
            },
          ]}
        >
          <Input
            style={{ width: "360px" }}
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="confirmação de senha"
          />
        </Form.Item>
        {/* <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
    
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            style={{ width: "360px" }}
          >
            Entrar
          </Button>
          {/* Or <a href="">register now!</a> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
