import React from 'react';
import { ColProps } from '../types';
import '../styles.scss';

export const Col: React.FC<ColProps> = ({ 
  children, 
  span = 24, 
  xs, 
  sm, 
  md, 
  lg, 
  xl 
}) => (
  <div className={`
    col 
    col-${span} 
    ${xs ? `col-xs-${typeof xs === 'number' ? xs : xs.span}` : ''} 
    ${sm ? `col-sm-${typeof sm === 'number' ? sm : sm.span}` : ''} 
    ${md ? `col-md-${typeof md === 'number' ? md : md.span}` : ''} 
    ${lg ? `col-lg-${typeof lg === 'number' ? lg : lg.span}` : ''} 
    ${xl ? `col-xl-${typeof xl === 'number' ? xl : xl.span}` : ''}
  `}>
    {children}
  </div>
); 