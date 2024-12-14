import React from 'react';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

const Certifications: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='certifications'>
      <Space>
        <h2>Certifications</h2>
      </Space>
    </div>
  );
};

export default Certifications;
