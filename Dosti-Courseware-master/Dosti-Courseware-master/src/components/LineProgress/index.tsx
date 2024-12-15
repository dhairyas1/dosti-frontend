import React from 'react';
import './LineProgress.scss';

export interface LineProgressProps {
  percent: number;
  size: number;
  color: string;
  className?: string;
}

const LineProgress: React.FC<LineProgressProps> = ({ percent, size, color, className }) => {
  return (
    <div className={`line-progress ${className || ''}`}>
      <div
        className="line-progress__bar"
        style={{
          width: `${percent}%`,
          height: size,
          backgroundColor: color
        }}
      />
    </div>
  );
};

export default LineProgress; 