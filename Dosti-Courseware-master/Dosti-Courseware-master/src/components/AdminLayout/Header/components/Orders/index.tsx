import React from 'react';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

const Orders: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='orders'>
      <Space>
        <h2>Orders</h2>
      </Space>
    </div>
  );
};

export default Orders;
