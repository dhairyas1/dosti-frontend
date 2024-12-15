import React from 'react';
import { MenuProps } from '../../../components/antd';
import Button from '../../../components/Button';

const Header: React.FC = () => {
  const handleLogout = () => {
    // Implement logout functionality
  };

  const handleLogin = () => {
    // Implement login functionality
  };

  const handleSignup = () => {
    // Implement signup functionality
  };

  return (
    <div className="header">
      <Button
        type="primary"
        onClick={handleLogout}
        className="header__button"
      >
        Logout
      </Button>
      <Button
        type="primary"
        onClick={handleLogin}
        className="header__button"
      >
        Login
      </Button>
      <Button
        type="primary"
        onClick={handleSignup}
        className="header__button"
      >
        Sign Up
      </Button>
    </div>
  );
};

export default Header; 