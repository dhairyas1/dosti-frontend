import React from 'react';
import { Card, Timeline } from 'antd';
import type { CardProps, TimelineProps } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, BookOutlined } from '@ant-design/icons';

interface Course {
  _id: string;
  title: string;
  progress?: number;
  enrolledDate?: string;
  lastAccessedDate?: string;
  completedDate?: string;
}

interface Activity {
  type: 'enrolled' | 'completed' | 'started';
  course: Course;
  date: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  courses: Course[];
  activities?: Activity[];
}

interface ActivitiesTabProps {
  user?: User;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'enrolled':
        return <BookOutlined style={{ color: '#1890ff' }} />;
      case 'completed':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'started':
        return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default:
        return <BookOutlined />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'enrolled':
        return 'blue';
      case 'completed':
        return 'green';
      case 'started':
        return 'orange';
      default:
        return 'gray';
    }
  };

  // Mock activities if none provided
  const activities = user.activities || [
    {
      type: 'enrolled',
      course: user.courses[0] || { _id: '1', title: 'Python Course' },
      date: new Date().toISOString()
    },
    {
      type: 'completed',
      course: { _id: '2', title: 'JavaScript Basics' },
      date: new Date(Date.now() - 86400000).toISOString() // 1 day ago
    },
    {
      type: 'started',
      course: { _id: '3', title: 'Web Development Course' },
      date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
    }
  ];

  const timelineItems: TimelineProps['items'] = activities.map((activity, index) => ({
    key: index,
    dot: getActivityIcon(activity.type),
    color: getActivityColor(activity.type),
    children: (
      <div>
        <p style={{ margin: 0 }}>
          <strong>{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</strong>
          {' '}{activity.course.title}
        </p>
        <small style={{ color: '#8c8c8c' }}>
          {new Date(activity.date).toLocaleDateString()} at {new Date(activity.date).toLocaleTimeString()}
        </small>
      </div>
    )
  }));

  const cardProps: CardProps = {
    title: <h3 style={{ margin: 0 }}>Recent Activities</h3>,
    className: "activities-tab",
  };

  const timelineProps: TimelineProps = {
    mode: "left",
    items: timelineItems,
  };

  return (
    <Card {...cardProps}>
      {activities.length > 0 ? (
        <Timeline {...timelineProps} />
      ) : (
        <p>No recent activities</p>
      )}
    </Card>
  );
};

export default ActivitiesTab;
