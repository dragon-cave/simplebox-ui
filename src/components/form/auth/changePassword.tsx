import { Form, Input, Button, Row, Col, message } from "antd";
import { api, endpoints } from "../../../services/api";
import { useMutation } from "react-query";
import { useState } from "react";

const UserChangePasswordForm = ({ title }: { title: string }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const mutation = useMutation(
    async (values) => {
      setLoading(true);
      const response = await api.post(endpoints.userChangePassword, values);
      setLoading(false);
      return response.data;
    },
    {
      onSuccess: () => {
        message.success("Senha atualizada com sucesso!");
        form.resetFields();
      },
      onError: () => {
        message.error("Falha ao atualizar senha!");
      },
    }
  );

  const onFinish = async (values: void) => {
    await mutation.mutateAsync(values);
  };

  return (
    <div>
      <h1>{title}</h1>
      <Form
        form={form}
        name="user-change-password"
        layout="vertical"
        onFinish={onFinish}
        disabled={loading}
        wrapperCol={{ flex: 2 }}
      >
        <Form.Item
          name="old_password"
          label="Senha Atual"
          rules={[{ min: 8, required: true, message: "Por favor insira sua senha atual! (mínimo 8 caracteres)" }]}
        >
          <Input.Password />
        </Form.Item>

        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="new_password1"
              label="Nova Senha"
              rules={[
                { min: 8, required: true, message: "Por favor insira uma nova senha! (mínimo 8 caracteres)" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="new_password2"
              label="Confirmar Nova Senha"
              dependencies={['new_password1']}
              rules={[
                { required: true, message: "Confirme sua nova senha!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password1') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('As senhas não coincidem!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={loading}>
            Atualizar Senha
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserChangePasswordForm;
