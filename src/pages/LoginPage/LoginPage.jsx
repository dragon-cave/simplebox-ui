import React, { useContext, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
const LoginPage = () => {
  const { login, isLogged } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  const onFinish = async (values) => {
    await login(values);
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <img src="simplebox-logo.png" alt="SimpleBox" />

      <a
        href="/cadastrar"
        onClick={() => {
          navigate("/cadastrar");
        }}
      >
        Fazer cadastro
      </a>

      <Form
        name="normal_login"
        className={styles.loginForm}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
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
            width={"1000px"}
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
          <Input.Password 
            style={{ width: "360px" }}
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="senha"
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

export default LoginPage;
