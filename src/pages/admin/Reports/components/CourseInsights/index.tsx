import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import './styles.scss';

const CourseInsights: React.FC = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'All Courses',
      children: <div>All Courses Content</div>,
    },
    {
      key: '2',
      label: 'Popular Courses',
      children: <div>Popular Courses Content</div>,
    },
  ];

  return (
    <div className="course-insights">
      <Tabs items={items} />
    </div>
  );
};

export default CourseInsights; 