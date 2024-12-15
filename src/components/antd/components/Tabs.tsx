import React from 'react';
import { TabsProps } from '../types';
import '../styles.scss';

export const Tabs: React.FC<TabsProps> = ({ 
  items = [], 
  activeKey, 
  onChange 
}) => (
  <div className="tabs">
    <div className="tabs__nav">
      {items.map(item => (
        <div
          key={item.key}
          className={`tabs__tab ${activeKey === item.key ? 'tabs__tab--active' : ''}`}
          onClick={() => onChange?.(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
    <div className="tabs__content">
      {items.find(item => item.key === activeKey)?.children}
    </div>
  </div>
); 