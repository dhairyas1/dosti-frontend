import React from 'react';
import { Button } from 'antd';
import './styles.scss';

const Signup: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle signup logic
    setLoading(false);
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <Button
          type="primary"
          htmlType="submit"
          className="signup-button"
          disabled={loading}
          loading={loading}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
};

export default Signup; 