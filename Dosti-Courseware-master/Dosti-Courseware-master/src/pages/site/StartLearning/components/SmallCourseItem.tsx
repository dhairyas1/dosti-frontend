import React from 'react';
import { Card, Progress } from '../../../../components/antd';
import { Link } from 'react-router-dom';

export interface SmallCourseItemProps {
  courseId: string;
  title: string;
  thumbnail: string;
  progress: number;
}

const SmallCourseItem: React.FC<SmallCourseItemProps> = ({
  courseId,
  title,
  thumbnail,
  progress
}) => {
  return (
    <Link to={`/course/${courseId}`}>
      <Card
        hoverable
        cover={<img alt={title} src={thumbnail} />}
        className="small-course-item"
      >
        <Card.Meta title={title} />
        <Progress percent={progress} size="small" />
      </Card>
    </Link>
  );
};

export default SmallCourseItem; 