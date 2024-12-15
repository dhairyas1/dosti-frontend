import React from 'react';
import { Button } from 'antd';
import './styles.scss';

const Login: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle login logic
    setLoading(false);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <Button
          type="primary"
          htmlType="submit"
          className="login-button"
          disabled={loading}
          loading={loading}
        >
          Log in
        </Button>
      </form>
    </div>
  );
};

export default Login; 