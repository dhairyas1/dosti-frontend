import React from 'react';
import { RowProps } from '../types';
import '../styles.scss';

export const Row: React.FC<RowProps> = ({ 
  children, 
  gutter = 0, 
  justify = 'start', 
  align = 'top' 
}) => {
  const margin = typeof gutter === 'number' ? gutter : gutter[0];
  return (
    <div 
      className={`row row--justify-${justify} row--align-${align}`} 
      style={{ margin: `-${margin/2}px` }}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            style: { padding: `${margin/2}px` }
          });
        }
        return child;
      })}
    </div>
  );
}; 