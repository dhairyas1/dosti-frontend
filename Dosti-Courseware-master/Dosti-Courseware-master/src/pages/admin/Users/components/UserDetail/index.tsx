import React from 'react';
import { Modal, Form, Input, Select, Button, notification } from '../../../../../components/antd';
import { IUser, UserRole } from '../../../../../types/user.type';
import { useUpdateUserMutation } from '../../user.service';

interface UserDetailProps {
  user: IUser;
  onClose: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onClose }) => {
  const [form] = Form.useForm();
  const [updateUser] = useUpdateUserMutation();

  React.useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role
      });
    }
  }, [user, form]);

  const handleSubmit = async (values: Partial<IUser>) => {
    try {
      await updateUser({
        _id: user._id,
        body: {
          ...user,
          ...values,
          courses: user.courses // Preserve existing courses
        }
      }).unwrap();
      notification.success({
        message: 'Success',
        description: 'User updated successfully'
      });
      onClose();
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.data?.message || 'Failed to update user'
      });
    }
  };

  return (
    <Modal
      title="Edit User"
      open={true}
      onCancel={onClose}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          name: user.name,
          email: user.email,
          role: user.role
        }}
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
            Update User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserDetail; 