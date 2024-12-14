import React from 'react';
import { Progress } from 'antd';

interface LineProgressProps {
  percent: number;
}

const LineProgress: React.FC<LineProgressProps> = ({ percent }) => {
  return (
    <Progress 
      percent={percent} 
      strokeColor={{
        '0%': '#108ee9',
        '100%': '#87d068',
      }}
      showInfo={true}
    />
  );
};

export default LineProgress; 