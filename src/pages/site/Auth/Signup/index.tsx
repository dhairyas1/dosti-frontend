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
  const [signup, signupResult] = useSignupMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = (formValues: { email: string; password: string; name: string }) => {
    setIsSubmitting(true);
    console.log('Starting signup process with values:', formValues);

    const userInfo: Omit<IUser, '_id'> = {
      email: formValues.email,
      password: formValues.password,
      name: formValues.name,
      role: UserRole.USER,
      providerId: 'local',
      fbUserId: ''
    };
    console.log('Prepared user info:', userInfo);

    signup(userInfo)
      .unwrap()
      .then((result) => {
        console.log('Signup success:', result);
        notification.success({ message: result.message });
        form.resetFields();
        props.onClick('login');
      })
      .catch((error) => {
        console.error('Signup error:', error);
        notification.error({ message: 'Signup failed', description: error.data?.message || 'Please try again' });
      })
      .finally(() => {
        console.log('Signup process completed');
        setIsSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('Form validation failed:', errorInfo);
  };

  const navigateSignupHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick('login');
  };

  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Create your account</h2>
      </div>

      <Form
        form={form}
        name='basic'
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'
      >
        <Form.Item wrapperCol={{ span: 24 }} label='Full Name' name='name' rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} label='Email' name='email' rules={[{ required: true, type: 'email' }]}>
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
        <a onClick={navigateSignupHandler} href='#' className='auth__footer-link'>
          Already have an account? Login
        </a>
      </div>
    </Fragment>
  );
};

export default Signup;
