import React from 'react';
import { Button } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

interface ButtonCmpProps extends AntButtonProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonCmp: React.FC<ButtonCmpProps> = ({ children, className, ...props }) => {
  return (
    <Button className={className} {...props}>
      {children}
    </Button>
  );
};

export default ButtonCmp;
