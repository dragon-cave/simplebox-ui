import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";

interface Values {
  title?: string;
  description?: string;
  modifier?: string;
  tags?: string[];
}

const FileForm = ({
    onSubmit,
    initialValues,
  }: {
    onSubmit: (values: Values) => void;
    initialValues: Values;
  }) => {
    const [form] = Form.useForm();
  
    useEffect(() => {
      form.setFieldsValue(initialValues);
    }, [initialValues]);
  
    const onFinish = (values: Values) => {
      onSubmit(values);
      form.resetFields();
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
          Submit
        </Button>
      </Form>
    );
  };
  

export { FileForm };
