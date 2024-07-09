// src/components/UserProfileForm.jsx
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { api, endpoints } from "../../services/api";
import { useMutation } from "react-query";

const UserProfileForm = () => {
  const [form] = Form.useForm();

  const mutation = useMutation(
    async (values) => {
      const response = await api.patch(endpoints.user, values);
      return response.data;
    },
    {
      onSuccess: () => {
        alert("Profile updated successfully");
      },
      onError: () => {
        alert("Failed to update profile");
      },
    }
  );

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <Form
      form={form}
      name="user-profile"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        fullName: "",
        email: "",
        password: "",
      }}
    >
      <Form.Item
        name="full_name"
        label="Full Name"
        rules={[{ required: true, message: "Please input your full name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descrição do Usuário"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserProfileForm;
