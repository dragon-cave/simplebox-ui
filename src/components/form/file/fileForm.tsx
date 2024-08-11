import { Button, Form, Input } from "antd";

interface Values {
  title?: string;
  description?: string;
  modifier?: string;
  tags?: string;
}

const FileForm = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (values: Values) => void;
  initialValues: Values;
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: Values) => {
    onSubmit(values);
    form.resetFields(); // Limpar campos após submissão
  };

  return (
    <Form
      layout="vertical"
      form={form}
      name="form_in_modal"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input the description!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="tags" label="Tag">
        <Input />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export { FileForm };
