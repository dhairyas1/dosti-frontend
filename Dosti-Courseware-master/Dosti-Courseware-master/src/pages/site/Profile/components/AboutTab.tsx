import React from 'react';
import { Card } from 'antd';
import { IUser } from '../../../../types/user.type';

interface AboutTabProps {
  user: IUser;
}

const AboutTab: React.FC<AboutTabProps> = ({ user }) => {
  return (
    <Card title="About">
      <p>{user.bio || 'No bio available'}</p>
    </Card>
  );
};

export default AboutTab;
