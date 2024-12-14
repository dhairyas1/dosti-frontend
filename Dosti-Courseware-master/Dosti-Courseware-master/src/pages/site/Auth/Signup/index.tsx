import React, { Fragment, useState } from 'react';
import { Form, Input, notification } from 'antd';
import ButtonCmp from '../../../../components/Button';
import { IUser, UserRole } from '../../../../types/user.type';
import { useSignupMutation } from '../../../auth.service';
import '../Auth.scss';

interface SignupProps {
  onClick: (authState: string) => void;
}

interface SignupFormValues {
  email: string;
  password: string;
  name: string;
}

const Signup: React.FC<SignupProps> = ({ onClick }) => {
  const [form] = Form.useForm<SignupFormValues>();
  const [signup] = useSignupMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: SignupFormValues) => {
    const currentDate = new Date().toISOString();
    const userData: Omit<IUser, '_id'> = {
      email: values.email,
      password: values.password,
      name: values.name,
      role: UserRole.USER,
      courses: [],
      avatar: '',
      providerId: 'local',
      lastLogin: currentDate,
      createdAt: currentDate,
      updatedAt: currentDate
    };
    
    setIsSubmitting(true);

    try {
      const result = await signup(userData).unwrap();
      notification.success({
        message: 'Signup Success',
        description: result.message
      });
      form.resetFields();
      onClick('login');
    } catch (error: any) {
      notification.error({
        message: 'Signup Failed',
        description: error.data?.message || 'Please try again'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToLogin = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick('login');
  };

  return (
    <Fragment>
      <div className='auth__title'>
        <h2 className='auth__title-heading'>Create Your Account</h2>
      </div>

      <Form<SignupFormValues>
        form={form}
        name='signup'
        layout='vertical'
        onFinish={onFinish}
        autoComplete='off'
        requiredMark={false}
      >
        <Form.Item
          label='Full Name'
          name='name'
          rules={[
            { required: true, message: 'Please enter your full name' },
            { min: 2, message: 'Name must be at least 2 characters' }
          ]}
        >
          <Input placeholder='Enter your full name' />
        </Form.Item>

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
            type="primary"
            htmlType="submit"
            className="btn btn-primary btn-sm w-full"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {!isSubmitting && 'Sign Up'}
          </ButtonCmp>
        </Form.Item>
      </Form>

      <div className='auth__footer'>
        <a onClick={navigateToLogin} href='#' className='auth__footer-link'>
          Already have an account? Login
        </a>
      </div>
    </Fragment>
  );
};

export default Signup;
