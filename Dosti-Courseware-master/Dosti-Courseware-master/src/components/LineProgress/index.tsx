import React from 'react';
import { Progress } from 'antd';

interface LineProgressProps {
  percent: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const LineProgress: React.FC<LineProgressProps> = ({ percent, size = 4, color = '#1890ff', style }) => {
  return (
    <Progress 
      percent={percent} 
      strokeWidth={size}
      strokeColor={color}
      style={style}
      showInfo={true}
    />
  );
};

export default LineProgress; 