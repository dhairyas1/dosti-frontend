import React from 'react';
import { Space } from '../../../../../components/antd';
import { useDispatch } from 'react-redux';

const ReviewsCenter: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='reviews-center'>
      <Space>
        <h2>Reviews Center</h2>
      </Space>
    </div>
  );
};

export default ReviewsCenter;
