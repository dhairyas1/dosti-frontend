import React from 'react';
import { Row, Col, Button, notification, Modal } from '../../../../components/antd';

interface SimpleCourse {
  title: string;
  description: string;
}

interface CourseDetailProps {
  course: SimpleCourse;
  onEnroll: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onEnroll }) => {
  return (
    <div className="course-detail">
      <div className="breadcrumb">
        <span>Home</span>
        <span> / </span>
        <span>Courses</span>
        <span> / </span>
        <span>{course.title}</span>
      </div>
      <Row gutter={16}>
        <Col span={24}>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <Button type="primary" onClick={onEnroll}>
            Enroll Now
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetail; 