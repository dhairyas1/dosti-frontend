import React from 'react';
import { Col, Row } from '../../../../components/antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetUserEnrolledCoursesQuery } from '../client.service';
import SmallCourseItem from './components/SmallCourseItem';
import './StartLearning.scss';

const StartLearning: React.FC = () => {
  const { data: enrolledCourses, isLoading } = useGetUserEnrolledCoursesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="start-learning">
      <div className="start-learning__wrap container">
        <h1 className="start-learning__title">My Learning</h1>
        <Row gutter={[24, 24]}>
          {enrolledCourses?.courses.map((course) => (
            <Col key={course._id} xs={24} sm={12} md={8} lg={6}>
              <SmallCourseItem
                key={course._id}
                courseId={course._id}
                title={course.title}
                thumbnail={course.thumbnail}
                progress={course.progress}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default StartLearning;
