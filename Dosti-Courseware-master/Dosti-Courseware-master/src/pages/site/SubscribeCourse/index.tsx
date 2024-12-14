import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './SubscribeCourse.scss';

interface SubscribeCourseProps {
  courseId: string;
}

const SubscribeCourse: React.FC<SubscribeCourseProps> = ({ courseId }) => {
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
