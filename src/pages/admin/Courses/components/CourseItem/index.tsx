import React from 'react';
import { Card, Divider } from 'antd';
import './styles.scss';

interface Props {
  title: string;
  description: string;
}

const CourseItem: React.FC<Props> = ({ title, description }) => {
  return (
    <Card className="course-item">
      <h3>{title}</h3>
      <Divider />
      <p>{description}</p>
    </Card>
  );
};

export default CourseItem; 