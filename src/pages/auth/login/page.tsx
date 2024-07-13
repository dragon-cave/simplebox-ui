import { useContext, useEffect, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import styles from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";

const LoginPage = () => {
  const { login, isLogged } = useContext(AuthContext) || {};
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  const onFinish = async (values: { username: string; password: string }) => {
    if (login) {
      try {
        setLoading(true);
        await login(values);
        setLoading(false);
        message.success("Login efetuado com sucesso!");
        navigate("/");
      } catch (error: any) {
        setLoading(false);
        message.error(error.message);
      }
    }
  };
  return (
    <div className={styles.container}>
      <img src="simplebox-logo.png" alt="SimpleBox" />
      <Form
        name="normal_login"
        className={styles.loginForm}
        disabled={loading}
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
        <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          {/* <Checkbox>Remember me</Checkbox> */}

        </Form.Item>      
        Não tem uma conta?{" "} 
        <a href="/cadastrar">Criar uma conta</a>
      </Form.Item>

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
