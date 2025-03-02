import React from 'react';
import { Card, Progress } from 'antd';
import { Link } from 'react-router-dom';
import { ICourse } from '../../../../types/course.type';

interface SmallCourseItemProps {
  course: ICourse;
  progress?: number;
}

const SmallCourseItem: React.FC<SmallCourseItemProps> = ({ course, progress }) => {
  return (
    <Card>
      <Link to={`/courses/${course._id}`}>
        <img src={course.thumbnail} alt={course.title} />
        <h4>{course.title}</h4>
        {progress !== undefined && <Progress percent={progress} />}
      </Link>
    </Card>
  );
};

export default SmallCourseItem;
