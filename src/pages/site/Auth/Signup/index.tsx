import React from 'react';
import { Form, Input, Button } from '../../../../components/antd';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const handleSubmit = (values: SignupFormData) => {
    console.log('Signup form submitted:', values);
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: 'Please confirm your password!' }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup; 