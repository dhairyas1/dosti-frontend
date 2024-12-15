import React from 'react';
import { MenuProps } from '../types';
import '../styles.scss';

export const Menu: React.FC<MenuProps> = ({ 
  items = [], 
  mode = 'horizontal', 
  selectedKeys = [], 
  onClick 
}) => (
  <ul className={`menu menu--${mode}`}>
    {items.map(item => (
      <li
        key={item.key}
        className={`menu__item ${selectedKeys.includes(item.key) ? 'menu__item--selected' : ''}`}
        onClick={() => onClick?.({ key: item.key })}
      >
        {item.icon && <span className="menu__item-icon">{item.icon}</span>}
        <span className="menu__item-label">{item.label}</span>
      </li>
    ))}
  </ul>
); 