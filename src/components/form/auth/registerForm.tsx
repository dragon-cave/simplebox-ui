import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import styles from "./styles/register.module.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext) || {};
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    username: string;
    password1: string;
    password2: string;
    email: string;
    full_name: string;
  }) => {
    if (register) {
      try {
        setLoading(true);

        await register({
          username: values.username.trim(),
          password1: values.password1.trim(),
          password2: values.password2.trim(),
          email: values.email.trim(),
          full_name: values.full_name.trim(),
        });
        setLoading(false);
        message.success("Usuário cadastrado com sucesso!");
        navigate("/entrar");
      } catch (error: any) {
        setLoading(false);
        message.error(error.message);
      }
    }
  };
  return (
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
            whitespace: true,
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
            whitespace: true,
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
            type: "email",
            required: true,
            whitespace: true,
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
            whitespace: true,
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
        dependencies={["password1"]}
        rules={[
          { required: true, whitespace: true, message: "Confirme sua senha!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password1") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("As senhas não coincidem!"));
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
  );
};

export default RegisterPage;
