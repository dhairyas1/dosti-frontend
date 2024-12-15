import React from 'react';
import { Spin } from 'antd';
import './styles.scss';

const BigSpinner: React.FC = () => {
  return (
    <div className="big-spinner">
      <Spin size="large" />
    </div>
  );
};

export default BigSpinner; 