import React from 'react';

export interface LineProgressProps {
  percent: number;
  size: number;
  color: string;
  style?: React.CSSProperties;
  className?: string;
}

const LineProgress: React.FC<LineProgressProps> = ({ percent, size, color, style, className = '' }) => {
  return (
    <div className={`line-progress ${className}`} style={style}>
      <div
        className='line-progress-inner'
        style={{
          width: `${percent}%`,
          height: size,
          backgroundColor: color,
          transition: 'width 0.3s ease-in-out',
          borderRadius: size / 2,
        }}
      />
    </div>
  );
};

export default LineProgress; 