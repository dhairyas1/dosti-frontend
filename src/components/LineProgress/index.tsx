import React from 'react';

export interface LineProgressProps {
  percent: number;
  size: number;
  color: string;
  style?: React.CSSProperties;
  className?: string;
}

const LineProgress: React.FC<LineProgressProps> = ({ percent, size, color, style = {}, className = '' }) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: size / 2,
    overflow: 'hidden',
    ...style,
  };

  const progressStyle: React.CSSProperties = {
    width: `${percent}%`,
    height: size,
    backgroundColor: color,
    transition: 'width 0.3s ease-in-out',
    borderRadius: size / 2,
  };

  return (
    <div className={`line-progress ${className}`} style={containerStyle}>
      <div className='line-progress-inner' style={progressStyle} />
    </div>
  );
};

export default LineProgress; 