import React from 'react';
import { CardProps } from '../types';
import { Spin } from './Spin';
import '../styles.scss';

export const Card: React.FC<CardProps> = ({ 
  title, 
  extra, 
  children, 
  bordered = true, 
  hoverable = false, 
  loading = false,
  className = '' 
}) => (
  <div className={`card ${bordered ? 'card--bordered' : ''} ${hoverable ? 'card--hoverable' : ''} ${loading ? 'card--loading' : ''} ${className}`}>
    {(title || extra) && (
      <div className="card__header">
        {title && <div className="card__title">{title}</div>}
        {extra && <div className="card__extra">{extra}</div>}
      </div>
    )}
    <div className="card__body">
      {loading ? (
        <Spin />
      ) : children}
    </div>
  </div>
); 