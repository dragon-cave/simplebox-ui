// src/components/UserProfileForm.jsx
import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { api, endpoints } from "../../services/api";
import { useMutation } from "react-query";

const UserProfileForm = ({title}) => {
  const [form] = Form.useForm();

  const getUser = async () => {
    const response = await api.get(endpoints.user);
    form.setFieldsValue(response.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const mutation = useMutation(
    async (values) => {
      const response = await api.patch(endpoints.user, values);
      return response.data;
    },
    {
      onSuccess: () => {
        alert("Perfil atualizado com sucesso!");
      },
      onError: () => {
        alert("Falha ao atualizar perfil!");
      },
    }
  );

  const onFinish = async (values) => {
    await mutation.mutateAsync(values);
  };

  return (
    <div style={{ padding: "25px" }}>
      <h1>{title}</h1>
      <Form
        form={form}
        name="user-profile"
        layout="vertical"
        onFinish={onFinish}
        wrapperCol={{ flex: 2 }}
        // colon={false}
        // style={{ maxWidth: 1000 }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="full_name"
              label="Nome Completo"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="description"
              label="Descrição"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Atualizar Perfil
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfileForm;
