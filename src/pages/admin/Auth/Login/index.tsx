import React from 'react';
import { Checkbox, Spin } from 'antd';
import Button from '../../../../components/Button';
import './styles.scss';

const Login: React.FC = () => {
  return (
    <div className="login">
      <Spin spinning={false}>
        <form className="login-form">
          <Checkbox>Remember me</Checkbox>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </form>
      </Spin>
    </div>
  );
};

export default Login; 