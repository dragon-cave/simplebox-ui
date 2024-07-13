// src/components/UserProfileForm.jsx
import { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { api, endpoints } from "../../../services/api";
import { useMutation } from "react-query";

const UserProfileForm = ({title}: {title: string}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const response = await api.get(endpoints.user);
    setLoading(false);
    form.setFieldsValue(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const mutation = useMutation(
    async (values) => {
      setLoading(true);
      const response = await api.patch(endpoints.user, values);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
      return response.data;
    },
    {
      onSuccess: () => {
        message.success("Perfil atualizado com sucesso!");
      },
      onError: () => {
        message.error("Falha ao atualizar perfil!");
      },
    }
  );

  const onFinish = async (values: void) => {
    await mutation.mutateAsync(values);
  };

  return (
    <div >
      <h1>{title}</h1>
      <Form
        form={form}
        name="user-profile"
        layout="vertical"
        disabled={loading}
        onFinish={onFinish}
        onFieldsChange={() => {setIsChanged(true)}}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: false, message: "Por favor, insira seu username." },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="full_name"
              label="Nome Completo"
              rules={[
                { required: false, message: "Por favor, insira seu nome completo." },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="description"
              label="Descrição"
              rules={[{ required: false, message: "Por favor, insira uma descrição." }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: false, message: "Por favor, insira seu email" }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading || !isChanged }>
            Atualizar Perfil
          </Button>
        </Form.Item>
      </Form> 
    </div>
  );
};

export default UserProfileForm;
