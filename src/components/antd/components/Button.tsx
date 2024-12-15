import React from 'react';
import { ButtonProps } from '../types';
import '../styles.scss';

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  type = 'primary', 
  htmlType = 'button', 
  className = '', 
  disabled = false, 
  loading = false 
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  return (
    <button 
      className={`btn btn-${type} ${loading ? 'loading' : ''} ${className}`}
      onClick={handleClick}
      type={htmlType}
      disabled={disabled || loading}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}; 