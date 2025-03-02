import React from 'react';
import { Card, Timeline } from 'antd';
import { IUser } from '../../../../types/user.type';

interface ActivitiesTabProps {
  user: IUser;
}

const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ user }) => {
  return (
    <Card title="Recent Activities">
      <Timeline>
        {user.activities?.map((activity, index) => (
          <Timeline.Item key={index}>{activity}</Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};

export default ActivitiesTab;
