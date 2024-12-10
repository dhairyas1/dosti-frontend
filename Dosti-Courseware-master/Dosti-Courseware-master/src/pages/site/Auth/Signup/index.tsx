import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Spin, notification } from 'antd';
import React, { Fragment, useState } from 'react';
import ButtonCmp from '../../../../components/Button';
import { IUser, UserRole } from '../../../../types/user.type';
import { useSignupMutation } from '../../../auth.service';
import '../Auth.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface SignupProps {
  onClick: (authState: string) => void;
}

const Signup: React.FC<SignupProps> = (props) => {
  const [form] = Form.useForm();
  const [signup] = useSignupMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (formValues: { email: string; password: string; name: string }) => {
    try {
      setIsSubmitting(true);
      const userInfo = {
        email: formValues.email,
        password: formValues.password,
        name: formValues.name,
        role: UserRole.USER,
        providerId: 'local'
      };

      const result = await signup(userInfo).unwrap();
      notification.success({ message: result.message });
      form.resetFields();
      props.onClick('login');
    } catch (error: any) {
      console.error('Signup error:', error);
      notification.error({ 
        message: 'Signup failed', 
        description: error.data?.message || 'Please try again' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Create your account</h2>
      </div>

      <Form
        form={form}
        name='signup'
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        autoComplete='off'
      >
        <Form.Item 
          wrapperCol={{ span: 24 }} 
          label='Full Name' 
          name='name'
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          wrapperCol={{ span: 24 }} 
          label='Email' 
          name='email'
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <ButtonCmp disabled={isSubmitting} className='btn btn-primary btn-sm w-full'>
            {isSubmitting ? <Spin indicator={antIcon} /> : 'Sign Up'}
          </ButtonCmp>
        </Form.Item>
      </Form>

      <div className='auth__footer'>
        <a onClick={(e) => { e.preventDefault(); props.onClick('login'); }} href='#' className='auth__footer-link'>
          Already have an account? Login
        </a>
      </div>
    </Fragment>
  );
};

export default Signup; 