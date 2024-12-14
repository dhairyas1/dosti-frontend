import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { UserRole, IUser } from '../../../../../types/user.type';
import { ICourse } from '../../../../../types/course.type';

interface UserFormData extends Omit<IUser, '_id' | 'courses'> {
  courses?: ICourse[];
}

const AddUser: React.FC = () => {
  const [form] = Form.useForm<UserFormData>();

  const onFinish = (values: UserFormData) => {
    // Handle form submission
    console.log('Form values:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input the email!' },
          { type: 'email', message: 'Please input a valid email!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input the password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="role"
        label="Role"
        rules={[{ required: true, message: 'Please select a role!' }]}
      >
        <Select>
          <Select.Option value={UserRole.ADMIN}>Admin</Select.Option>
          <Select.Option value={UserRole.USER}>User</Select.Option>
          <Select.Option value={UserRole.INSTRUCTOR}>Instructor</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add User
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUser;
