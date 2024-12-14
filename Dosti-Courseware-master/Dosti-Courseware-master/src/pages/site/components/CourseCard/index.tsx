import React from 'react';
import { Card, Progress } from 'antd';
import { Link } from 'react-router-dom';
import { ICourse } from '../../../../types/course.type';

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { _id, name, thumbnail, progress } = course;

  return (
    <Link to={`/courses/${_id}`}>
      <Card
        hoverable
        cover={<img alt={name} src={thumbnail} />}
        className="course-card"
      >
        <Card.Meta title={name} />
        {typeof progress === 'number' && (
          <Progress percent={progress} size="small" />
        )}
      </Card>
    </Link>
  );
};

export default CourseCard; 