import React from 'react';
import { Space } from '../../../../../components/antd';
import { useDispatch } from 'react-redux';

const UsersProgress: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='users-progress'>
      <Space>
        <h2>Users Progress</h2>
      </Space>
    </div>
  );
};

export default UsersProgress;
