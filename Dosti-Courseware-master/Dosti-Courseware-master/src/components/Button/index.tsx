import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';

interface ButtonCmpProps extends ButtonProps {
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
