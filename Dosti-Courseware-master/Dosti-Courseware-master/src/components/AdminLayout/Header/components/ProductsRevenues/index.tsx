import React from 'react';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

const ProductsRevenues: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='products-revenues'>
      <Space>
        <h2>Products Revenues</h2>
      </Space>
    </div>
  );
};

export default ProductsRevenues;
