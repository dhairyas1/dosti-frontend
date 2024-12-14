import React from 'react';
import { Card, Progress } from 'antd';
import type { CardProps, ProgressProps } from 'antd';

interface SmallCourseItemProps {
  title: string;
  thumbnail: string;
  progress?: number;
}

const SmallCourseItem: React.FC<SmallCourseItemProps> = ({
  title,
  thumbnail,
  progress
}) => {
  const cardProps: CardProps = {
    className: 'small-course-item',
    cover: <img alt={title} src={thumbnail} />,
  };

  const progressProps: ProgressProps = {
    percent: progress,
    size: "small",
    status: progress === 100 ? "success" : "active",
  };

  return (
    <Card {...cardProps}>
      <div className='small-course-item__content'>
        <h4 className='small-course-item__title'>{title}</h4>
        {progress !== undefined && (
          <Progress {...progressProps} />
        )}
      </div>
    </Card>
  );
};

export default SmallCourseItem;
