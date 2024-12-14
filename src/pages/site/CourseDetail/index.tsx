import React from 'react';
import { Row, Col, Button, Breadcrumb, notification } from 'antd';
import type { RowProps, ColProps, ButtonProps, BreadcrumbProps } from 'antd';
import { ICourseDetail, ILesson } from '../../../types/course.type';

interface CourseDetailProps {
  course: ICourseDetail;
  onEnroll: () => void;
  onBuy: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onEnroll, onBuy }) => {
  const handleEnroll = () => {
    if (!course.isBought) {
      notification.error({
        message: 'Please login to enroll this course',
        description: 'You need to be logged in to enroll in courses'
      });
      return;
    }
    onEnroll();
  };

  const handleBuy = () => {
    if (!course.isBought) {
      notification.error({
        message: 'Please login to buy this course',
        description: 'You need to be logged in to purchase courses'
      });
      return;
    }
    onBuy();
  };

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

  const renderLessons = (lessons: ILesson[]) => {
    return lessons.map((lesson) => (
      <div key={lesson._id}>
        <h3>{lesson.title}</h3>
        <p>{lesson.description}</p>
      </div>
    ));
  };

  return (
    <div className="course-detail">
      <Row {...rowProps}>
        <Col {...colProps}>
          <Breadcrumb items={breadcrumbItems} />
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="course-stats">
            <p>Total Videos Length: {course.totalVideosLength}</p>
            <p>Average Rating: {course.avgRatingStars}</p>
            <p>Number of Reviews: {course.numOfReviews}</p>
            <p>Students Enrolled: {course.students}</p>
          </div>
          <div className="course-objectives">
            <h2>What You Will Learn</h2>
            {course.willLearns && course.willLearns.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </div>
          <div className="course-lessons">
            <h2>Course Content</h2>
            {course.lessons && renderLessons(course.lessons)}
          </div>
          {!course.isBought && (
            <Button type="primary" onClick={handleBuy}>
              Buy Now
            </Button>
          )}
          {course.isBought && (
            <Button type="primary" onClick={handleEnroll}>
              Start Learning
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CourseDetail; 