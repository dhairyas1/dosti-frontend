import React from 'react';
import { Button, Space } from '../../../../antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import './DashboardHeader.scss';

const DashboardHeader: React.FC = () => {
  return (
    <div className='dashboard-header'>
      <div className='dashboard-header__left'>
        <h2>Dashboard</h2>
      </div>
      <div className='dashboard-header__right'>
        <Space>
          {/* Other header actions */}
        </Space>
      </div>
    </div>
  );
};

export default DashboardHeader;
