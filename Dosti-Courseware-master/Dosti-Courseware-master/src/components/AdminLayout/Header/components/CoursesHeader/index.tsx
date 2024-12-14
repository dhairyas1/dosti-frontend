import React from 'react';
import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';

const CoursesHeader: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='courses-header'>
      <Space>
        <h2>Courses</h2>
      </Space>
    </div>
  );
};

export default CoursesHeader;
