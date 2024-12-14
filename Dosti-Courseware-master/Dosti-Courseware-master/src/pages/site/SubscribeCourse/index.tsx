import React from 'react';
import { Button } from '../../../components/antd';
import { Link, useParams } from 'react-router-dom';
import './SubscribeCourse.scss';

const SubscribeCourse: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  if (!courseId) {
    return <div>Course not found</div>;
  }

  return (
    <div className='subscribe-course'>
      <Link to={`/courses/${courseId}`}>
        <Button type="primary" className='subscribe-course__btn'>
          Go to course now
        </Button>
      </Link>
    </div>
  );
};

export default SubscribeCourse;
