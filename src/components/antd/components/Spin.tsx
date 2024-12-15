import React from 'react';
import { SpinProps } from '../types';
import '../styles.scss';

export const Spin: React.FC<SpinProps> = ({ 
  spinning = true, 
  size = 'default', 
  tip, 
  children 
}) => (
  <div className={`spin ${spinning ? 'spin--active' : ''} spin--${size}`}>
    <div className="spin__indicator"></div>
    {tip && <div className="spin__tip">{tip}</div>}
    {children && (
      <div className={`spin__container ${spinning ? 'spin__container--blur' : ''}`}>
        {children}
      </div>
    )}
  </div>
); 