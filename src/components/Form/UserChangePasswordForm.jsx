// src/components/UserProfileForm.jsx
import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { api, endpoints } from "../../services/api";
import { useMutation } from "react-query";

const UserChangePasswordForm = ({title}) => {
  const [form] = Form.useForm();

  const mutation = useMutation(
    async (values) => {
      const response = await api.post(endpoints.userChangePassword, values);
      return response.data;
    },
    {
      onSuccess: () => {
        alert("Senha atualizada com sucesso!");
      },
      onError: () => {
        alert("Falha ao atualizar senha!");
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
        <Form.Item
          name="old_password"
          label="Senha"
          rules={[{ required: true, message: "Por favor insira sua senha!" }]}
        >
          <Input />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="new_password1"
              label="Nova Senha"
              rules={[{ required: true, message: "Por favor insira uma nova senha!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="new_password2"
              label="Confirmar Nova Senha"
              rules={[{ required: true, message: "Confirme sua senha!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Atualizar Senha
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserChangePasswordForm;
