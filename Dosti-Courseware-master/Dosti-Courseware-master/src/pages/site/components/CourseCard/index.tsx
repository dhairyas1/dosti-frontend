import React from 'react';
import { Card, Progress } from 'antd';
import { Link } from 'react-router-dom';
import { ICourse } from '../../../../types/course.type';

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { _id, title, thumbnail, progress } = course;

  return (
    <Link to={`/courses/${_id}`}>
      <Card
        hoverable
        cover={<img alt={title} src={thumbnail} />}
        className="course-card"
      >
        <Card.Meta title={title} />
        {progress !== undefined && (
          <Progress percent={progress} size="small" />
        )}
      </Card>
    </Link>
  );
};

export default CourseCard; 