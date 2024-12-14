import React from 'react';
import { Progress, type ProgressProps } from '../antd';

interface LineProgressProps {
  percent: number;
  size?: number;
  color?: string;
  className?: string;
}

const LineProgress: React.FC<LineProgressProps> = ({ 
  percent, 
  size = 4, 
  color = '#1890ff',
  className 
}) => {
  const progressProps: ProgressProps = {
    percent,
    strokeWidth: size,
    strokeColor: color,
    type: 'line',
    className
  };

  return <Progress {...progressProps} />;
};

export default LineProgress; 