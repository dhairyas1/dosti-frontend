import React from 'react';
import { Descriptions } from 'antd';
import { IUser } from '../../../../types/user.type';

interface AboutTabProps {
  user: IUser;
}

const AboutTab: React.FC<AboutTabProps> = ({ user }) => {
  return (
    <Descriptions bordered>
      <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
      <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
      {user.address && (
        <Descriptions.Item label="Address">{user.address}</Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default AboutTab;
