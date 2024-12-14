import React from 'react';
import { Modal, Form, Input, Select, Button, notification } from 'antd';
import { useAddUserMutation } from '../../user.service';
import { IUser, UserRole } from '../../../../../types/user.type';

interface AddUserProps {
  onClose: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ onClose }) => {
  const [form] = Form.useForm();
  const [addUser] = useAddUserMutation();

  const handleSubmit = async (values: Partial<IUser>) => {
    try {
      const currentDate = new Date().toISOString();
      const userData: Omit<IUser, '_id'> = {
        name: values.name || '',
        email: values.email || '',
        password: values.password || '',
        role: values.role || UserRole.USER,
        courses: [],
        avatar: '',
        providerId: 'local',
        lastLogin: currentDate,
        createdAt: currentDate,
        updatedAt: currentDate
      };

      await addUser(userData).unwrap();
      notification.success({
        message: 'Success',
        description: 'User added successfully'
      });
      onClose();
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.data?.message || 'Failed to add user'
      });
    }
  };

  return (
    <Modal
      title="Add User"
      open={true}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: 'Please input password!' },
            { min: 6, message: 'Password must be at least 6 characters!' }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select role!' }]}
        >
          <Select>
            <Select.Option value={UserRole.USER}>User</Select.Option>
            <Select.Option value={UserRole.INSTRUCTOR}>Instructor</Select.Option>
            <Select.Option value={UserRole.ADMIN}>Admin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;
