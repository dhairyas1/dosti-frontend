import React from 'react';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

const CancelledSales: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='cancelled-sales'>
      <Space>
        <h2>Cancelled Sales</h2>
      </Space>
    </div>
  );
};

export default CancelledSales;
