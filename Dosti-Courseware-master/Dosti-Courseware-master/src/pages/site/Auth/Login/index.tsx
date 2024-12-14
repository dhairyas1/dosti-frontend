import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Spin, notification } from 'antd';
import jwtDecode from 'jwt-decode';
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonCmp from '../../../../components/Button';
import { useLoginMutation, useUpdateLastLoginMutation } from '../../../auth.service';
import { closeAuthModal, setAuthenticated } from '../../../auth.slice';
import '../Auth.scss';

interface LoginProps {
  onClick: (authState: string) => void;
}

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message: string;
  userId: string;
}

interface DecodedToken {
  exp: number;
  iat: number;
  userId: string;
  email: string;
}

const Login: React.FC<LoginProps> = ({ onClick }) => {
  const [form] = Form.useForm<LoginFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [login] = useLoginMutation();
  const [updateLastLogin] = useUpdateLastLoginMutation();
  const dispatch = useDispatch();

  const onFinish = async (values: LoginFormValues) => {
    setIsSubmitting(true);

    try {
      const result = await login(values).unwrap() as LoginResponse;
      const decodedToken = jwtDecode(result.token) as DecodedToken;

      // Update last login
      const currentDate = new Date();
      try {
        await updateLastLogin({
          userId: decodedToken.userId,
          lastLogin: currentDate
        }).unwrap();
        
        notification.success({
          message: 'Login Status',
          description: 'Login successful!',
          duration: 2
        });
      } catch (error) {
        console.error('Failed to update last login:', error);
      }

      localStorage.setItem('token', result.token);
      const expirationTime = decodedToken.exp * 1000;

      if (Date.now() < expirationTime) {
        dispatch(setAuthenticated(result.token));
        dispatch(closeAuthModal());
        form.resetFields();
        notification.success({
          message: 'Login Status',
          description: result.message,
          duration: 2
        });
      } else {
        notification.error({
          message: 'Session Expired',
          description: 'Please log in again.'
        });
      }
    } catch (error) {
      notification.error({
        message: 'Login Failed',
        description: 'Email or password incorrect'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToSignup = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick('signup');
  };

  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Login to Start Learning</h2>
      </div>

      <Form<LoginFormValues>
        form={form}
        name='login'
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' }
          ]}
        >
          <Input placeholder='Enter your email' />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            { required: true, message: 'Please enter your password' },
            { min: 6, message: 'Password must be at least 6 characters' }
          ]}
        >
          <Input.Password placeholder='Enter your password' />
        </Form.Item>

        <Form.Item>
          <ButtonCmp
            disabled={isSubmitting}
            className='btn btn-primary btn-sm w-full'
            type='submit'
          >
            {isSubmitting ? (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            ) : (
              'Login'
            )}
          </ButtonCmp>
        </Form.Item>
      </Form>

      <div className='auth__footer'>
        <a onClick={navigateToSignup} href='#' className='auth__footer-link'>
          Create Account
        </a>
        <a href='#' className='auth__footer-link'>
          Forgot Password
        </a>
      </div>
    </Fragment>
  );
};

export default Login;
