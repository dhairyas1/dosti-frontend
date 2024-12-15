import React from 'react';
import { Card, Button } from 'antd';
import './styles.scss';

const CourseDetail: React.FC = () => {
  return (
    <div className="course-detail">
      <Card title="Course Details">
        <Button type="primary">Enroll Now</Button>
      </Card>
    </div>
  );
};

export default CourseDetail; 