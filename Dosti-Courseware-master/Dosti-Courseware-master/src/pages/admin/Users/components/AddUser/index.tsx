import { Button, Col, Drawer, Form, Input, Row, Select, Space, notification } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { IUser, UserRole } from '../../../../../types/user.type';
import { UserError } from '../../../../../utils/helpers';
import { useAddUserMutation, useGetUserQuery, useUpdateUserMutation } from '../../user.service';

interface AddUserProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserFormData extends Omit<IUser, '_id'> {
  courses?: string;
  type?: string;
  price?: string;
  Tags?: string[];
}

const AddUser: React.FC<AddUserProps> = ({ isOpen, onClose }) => {
  const [form] = Form.useForm<UserFormData>();
  const [addUser] = useAddUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const userId = useSelector((state: RootState) => state.user.userId);

  const { data } = useGetUserQuery(userId, {
    skip: !userId
  });

  const submitHandler = async (formData: UserFormData) => {
    const newUser: Omit<IUser, '_id'> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      avatar: formData.avatar,
      password: formData.password
    };

    try {
      if (userId) {
        await updateUser({
          _id: userId,
          body: newUser
        }).unwrap();
        
        notification.success({
          message: 'Update User',
          description: 'User updated successfully!'
        });
      } else {
        await addUser(newUser).unwrap();
        
        notification.success({
          message: 'Add User',
          description: 'User added successfully!'
        });
      }
      onClose();
    } catch (error) {
      const err = error as UserError;
      notification.error({
        message: userId ? 'Update Failed' : 'Add User Failed',
        description: err.data?.message || 'An error occurred'
      });
    }
  };

  useEffect(() => {
    if (data && userId) {
      form.setFieldsValue(data.user);
    } else {
      form.resetFields();
      form.setFieldsValue({
        role: UserRole.USER
      });
    }
  }, [data, form, userId]);

  return (
    <Drawer
      title={userId ? 'Edit User' : 'Add a New User'}
      width={820}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={submitHandler}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="Please enter email" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ pattern: /^\d+$/, message: 'Please enter valid phone number' }]}
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select placeholder="Please select a role">
                <Select.Option value={UserRole.ADMIN}>Admin</Select.Option>
                <Select.Option value={UserRole.USER}>User</Select.Option>
                <Select.Option value={UserRole.TEACHER}>Teacher</Select.Option>
                <Select.Option value={UserRole.INSTRUCTOR}>Instructor</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="avatar"
          label="Avatar URL"
        >
          <Input placeholder="Enter avatar URL" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="courses"
              label="Course"
            >
              <Select placeholder="Select a course">
                <Select.Option value="html-css">HTML CSS</Select.Option>
                <Select.Option value="javascript">JavaScript</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="type"
              label="Account Type"
            >
              <Select placeholder="Select account type">
                <Select.Option value="private">Private</Select.Option>
                <Select.Option value="public">Public</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: !userId, message: 'Please enter password' },
            { min: 6, message: 'Password must be at least 6 characters' }
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="Tags"
          label="Tags"
        >
          <Select
            mode="multiple"
            placeholder="Select tags"
            options={[
              { label: 'Backend Dev', value: 'backend' },
              { label: 'Frontend Dev', value: 'frontend' }
            ]}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {userId ? 'Update' : 'Create'} User
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddUser;
