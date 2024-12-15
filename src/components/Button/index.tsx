import React from 'react';
import { Button as AntButton } from '../antd';
import type { ButtonCmpProps } from '../antd';

const Button: React.FC<ButtonCmpProps> = ({
  children,
  onClick,
  className,
  type = 'default',
  htmlType = 'button',
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <AntButton
      onClick={onClick}
      className={className}
      type={type}
      htmlType={htmlType}
      loading={loading}
      disabled={disabled}
      {...props}
    >
      {children}
    </AntButton>
  );
};

export default Button; 