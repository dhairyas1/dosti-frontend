import React from 'react';
import { Button } from 'antd';
import './styles.scss';

const Home: React.FC = () => {
  const handleGetStarted = () => {
    // Handle get started logic
  };

  return (
    <div className="home">
      <div className="hero-section">
        <h1>Welcome to Our Learning Platform</h1>
        <Button
          type="primary"
          onClick={handleGetStarted}
          className="get-started-button"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home; 