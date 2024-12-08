import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Spin, notification } from 'antd';
import jwtDecode from 'jwt-decode';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonCmp from '../../../../components/Button';
import { useLoginMutation, useUpdateLastLoginMutation } from '../../../auth.service';
import { closeAuthModal, setAuthenticated } from '../../../auth.slice';
import '../Auth.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface LoginProps {
  onClick: (authState: string) => void;
}

const Login: React.FC<LoginProps> = (props) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [login, loginResult] = useLoginMutation();
  const [updateLastLogin] = useUpdateLastLoginMutation();
  const dispatch = useDispatch();

  const onFinish = (formValues: { email: string; password: string }) => {
    setIsSubmitting(true);

    login(formValues)
      .unwrap()
      .then((result) => {
        const loginResponse: { token: string; message: string; userId: string } = result;
        const decodedToken: { exp: number; iat: number; userId: string; email: string } = jwtDecode(
          loginResponse.token
        );

        // Update last login at database
        const currentDate = new Date();
        updateLastLogin({
          userId: decodedToken.userId,
          lastLogin: currentDate
        })
          .unwrap()
          .then(() => {
            notification.success({ type: 'success', message: 'Login successful!', duration: 2 });
          })
          .catch((error) => {
            console.log('error: ', error);
          });

        localStorage.setItem('token', loginResponse.token);
        const expirationTime = decodedToken.exp * 1000;

        if (Date.now() < expirationTime) {
          dispatch(setAuthenticated(loginResponse.token));
          dispatch(closeAuthModal());
          form.resetFields();
          notification.success({ type: 'success', message: loginResponse.message, duration: 2 });
        } else {
          notification.error({ message: 'Session expired. Please log in again.' });
        }
      })
      .catch((error) => {
        notification.error({ message: 'Login failed', description: 'Email or password incorrect' });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const navigateLoginHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    props.onClick('signup');
  };

  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Login to start learning</h2>
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
        <Form.Item wrapperCol={{ span: 24 }} label='Email' name='email' rules={[{ type: 'email', required: true }]}>
          <Input className='' />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password className='' />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <ButtonCmp disabled={isSubmitting} className='btn btn-primary btn-sm w-full'>
            {isSubmitting ? <Spin indicator={antIcon} /> : 'Login'}
          </ButtonCmp>
        </Form.Item>
      </Form>
      <div className='auth__footer'>
        <a onClick={navigateLoginHandler} href='#' className='auth__footer-link'>
          Create Account
        </a>
        <a href='' className='auth__footer-link'>
          Forgot Password
        </a>
      </div>
    </Fragment>
  );
};

export default Login;
