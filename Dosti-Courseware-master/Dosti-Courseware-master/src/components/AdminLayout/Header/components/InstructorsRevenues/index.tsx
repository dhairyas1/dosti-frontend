import React from 'react';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

const InstructorsRevenues: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='instructors-revenues'>
      <Space>
        <h2>Instructors Revenues</h2>
      </Space>
    </div>
  );
};

export default InstructorsRevenues;
