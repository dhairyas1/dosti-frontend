import React from 'react';
import { Row, Col, Button, Breadcrumb } from 'antd';
import type { RowProps, ColProps, BreadcrumbProps } from 'antd';

interface SimpleCourse {
  title: string;
  description: string;
}

interface CourseDetailProps {
  course: SimpleCourse;
  onEnroll: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onEnroll }) => {
  const rowProps: RowProps = {
    gutter: [16, 16]
  };

  const colProps: ColProps = {
    xs: 24,
    sm: 12,
    md: 8,
    lg: 6
  };

  const breadcrumbItems: BreadcrumbProps['items'] = [
    { title: 'Home' },
    { title: 'Courses' },
    { title: course.title }
  ];

  return (
    <div className="course-detail">
      <Row {...rowProps}>
        <Col {...colProps}>
          <Breadcrumb items={breadcrumbItems} />
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