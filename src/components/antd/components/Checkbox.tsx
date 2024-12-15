import React from 'react';
import { CheckboxProps } from '../types';
import '../styles.scss';

export const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  defaultChecked, 
  disabled, 
  onChange, 
  children 
}) => (
  <label className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}>
    <input
      type="checkbox"
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={e => onChange?.({ target: { checked: e.target.checked } })}
    />
    <span className="checkbox__checkmark"></span>
    {children && <span className="checkbox__label">{children}</span>}
  </label>
); 