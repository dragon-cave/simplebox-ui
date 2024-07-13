import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";

import { Button, Form, Input, message } from "antd";

import styles from "./style.module.css";

import { api, endpoints } from "../../../services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(
    async (newUser) => {
      try {
        setLoading(true);
        const response = await api.post(endpoints.register, newUser);
        setLoading(false);
        return response.data;
      }
      catch (error: any) {
        setLoading(false);
        throw new Error(error.message);
      }
      // setLoading(true);
      // const response = await api.post(endpoints.register, newUser);
      // setLoading(false);
      // return response.data;
    },
    {
      retry: false,
      onSuccess: () => {
        message.success("Usuário cadastrado com sucesso!");
        navigate("/entrar");
      },
      onError: (error: any) => {
        message.error(error.message.username || "Erro ao cadastrar usuário!");
      },
    }
  );

  const onFinish = (values: void) => {
    mutation.mutate(values);
  };
  return (
    <div className={styles.container}>
      <img src="simplebox-logo.png" alt="SimpleBox" />
      <Form
        disabled={loading}
        name="singin"
        className={styles.form}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="full_name"
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
            prefix={
              // <UserOutlined className="site-form-item-icon" />
              <MailOutlined className="site-form-item-icon" />
            }
            placeholder="e-mail"
          />
        </Form.Item>

        <Form.Item
          name="password1"
          rules={[
            {
              min: 8,
              required: true,
              message: "Por favor, informe sua senha! (mínimo 8 caracteres)",
            },
          ]}
        >
          <Input.Password
            style={{ width: "360px" }}
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="senha"
          />
        </Form.Item>

        <Form.Item
          name="password2"
          dependencies={['password1']}
          rules={[
            { required: true, message: "Confirme sua senha!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password1') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('As senhas não coincidem!'));
              },
            }),
          ]}
        >
          <Input.Password
            style={{ width: "360px" }}
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="confirmação de senha"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            style={{ width: "360px" }}
          >
            Cadastrar
          </Button>
        </Form.Item>
        <Form.Item>
          Já tem uma conta?{" "}
          <a className="login-form-forgot" href="/entrar">
            Entrar
          </a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
