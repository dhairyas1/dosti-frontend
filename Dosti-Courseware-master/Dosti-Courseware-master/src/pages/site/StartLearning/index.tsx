import React from 'react';
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetUserEnrolledCoursesQuery } from '../client.service';
import SmallCourseItem from '../Profile/components/SmallCourseItem';
import './StartLearning.scss';

const StartLearning = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { data, isLoading } = useGetUserEnrolledCoursesQuery(
    { _userId: userId },
    { skip: !userId }
  );

  const enrolledCourses = data?.courses || [];
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(course => course.progress === 100).length;
  const inProgressCourses = enrolledCourses.filter(course => course.progress && course.progress < 100).length;

  if (isLoading) {
    return <div>Loading courses...</div>;
  }

  return (
    <div className='start-learning'>
      <div className='start-learning__wrap container'>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <div className='start-learning__header'>
              <h2 className='start-learning__title'>My Learning</h2>
              <p className='start-learning__subtitle'>
                Track your progress and continue learning
              </p>
            </div>
          </Col>

          <Col xs={24} md={12}>
            <div className='start-learning__stats'>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={8}>
                  <div className='start-learning__stat-card'>
                    <h3 className='start-learning__stat-number'>{totalCourses}</h3>
                    <p className='start-learning__stat-label'>Total Courses</p>
                  </div>
                </Col>

                <Col xs={24} sm={8}>
                  <div className='start-learning__stat-card'>
                    <h3 className='start-learning__stat-number'>{completedCourses}</h3>
                    <p className='start-learning__stat-label'>Completed</p>
                  </div>
                </Col>

                <Col xs={24} sm={8}>
                  <div className='start-learning__stat-card'>
                    <h3 className='start-learning__stat-number'>{inProgressCourses}</h3>
                    <p className='start-learning__stat-label'>In Progress</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <div className='start-learning__courses'>
          <h3 className='start-learning__courses-title'>Continue Learning</h3>
          <Row gutter={[24, 24]}>
            {enrolledCourses.map((course) => (
              <Col key={course._id} xs={24} sm={12} md={8} lg={6}>
                <SmallCourseItem
                  title={course.title}
                  thumbnail={course.thumbnail}
                  progress={course.progress}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default StartLearning;
