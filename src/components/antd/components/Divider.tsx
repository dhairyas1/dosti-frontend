import React from 'react';
import { DividerProps } from '../types';
import '../styles.scss';

export const Divider: React.FC<DividerProps> = ({
  type = 'horizontal',
  orientation = 'center',
  children,
  className = ''
}) => (
  <div className={`divider divider--${type} divider--${orientation} ${className}`}>
    {children && <span className="divider__inner">{children}</span>}
  </div>
); 