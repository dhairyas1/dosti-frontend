import React from 'react';
import { Space } from 'antd';
import { useDispatch } from 'react-redux';

const CourseInsights: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='course-insights'>
      <Space>
        <h2>Course Insights</h2>
      </Space>
    </div>
  );
};

export default CourseInsights;
