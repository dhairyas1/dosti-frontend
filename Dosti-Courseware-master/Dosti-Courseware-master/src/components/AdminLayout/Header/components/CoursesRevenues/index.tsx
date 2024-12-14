import React from 'react';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

const CoursesRevenues: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='courses-revenues'>
      <Space>
        <h2>Courses Revenues</h2>
      </Space>
    </div>
  );
};

export default CoursesRevenues;
