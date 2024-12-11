import { Card, Timeline } from 'antd';
import React from 'react';

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  courses: any[];
}

interface ActivitiesTabProps {
  user?: IUser;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  const activities = [
    'Enrolled in Python Course',
    'Completed JavaScript Basics',
    'Started Web Development Course'
  ];

  return (
    <div className="activities-tab">
      <Card title="Recent Activities" bordered={false}>
        <Timeline
          items={activities.map((activity, index) => ({
            children: activity,
            key: index.toString()
          }))}
        />
      </Card>
    </div>
  );
};

export default ActivitiesTab;
