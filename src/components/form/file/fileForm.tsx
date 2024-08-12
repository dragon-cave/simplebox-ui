import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";

interface Values {
  title?: string;
  description?: string;
  modifier?: string;
  tags?: string[];
  name?: string;
  genre?: string;
  mime_type?: string;
}

const FileForm = ({
  onSubmit,
  initialValues,
}: {
  onSubmit: (values: Values) => void;
  initialValues: Values;
}) => {
  const [form] = Form.useForm();

  // Extrair nome base e extensão
  const [baseName, extension] = initialValues.name
    ? [
        initialValues.name.substring(0, initialValues.name.lastIndexOf(".")),
        initialValues.name.substring(initialValues.name.lastIndexOf(".")),
      ]
    : ["", ""];

  useEffect(() => {
    form.setFieldsValue({ ...initialValues, name: baseName });
  }, [initialValues]);

  const onFinish = (values: Values) => {
    const finalName = `${values.name}${extension}`; // Preserva a extensão
    onSubmit({ ...values, name: finalName });
    form.resetFields();
  };

  const isVideo = initialValues.mime_type?.includes("video");

  return (
    <Form
      layout="vertical"
      form={form}
      name="form_in_modal"
      initialValues={{ ...initialValues, name: baseName }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Nome"
        rules={[{ required: true, message: "Please input the name!" }]}
      >
        <Input addonAfter={extension} />
      </Form.Item>
      {isVideo && (
        <Form.Item name="genre" label="Genero">
          <Input />
        </Form.Item>
      )}
      <Form.Item name="description" label="Descrição">
        <Input />
      </Form.Item>
      <Form.Item name="tags" label="Tags">
        <Select mode="tags" placeholder="Add tags">
          {initialValues.tags?.map((tag) => (
            <Select.Option key={tag} value={tag}>
              {tag}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Atualizar
      </Button>
    </Form>
  );
};

export { FileForm };
