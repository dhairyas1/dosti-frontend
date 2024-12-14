import React from 'react';
import { Descriptions } from '../../../../components/antd';
import type { DescriptionsProps } from 'antd';
import { IUser } from '../../../../types/user.type';

interface AboutTabProps {
  user: IUser;
}

const AboutTab: React.FC<AboutTabProps> = ({ user }) => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Name',
      children: user.name
    },
    {
      key: '2',
      label: 'Email',
      children: user.email
    },
    {
      key: '3',
      label: 'Role',
      children: user.role
    },
    {
      key: '4',
      label: 'Address',
      children: user.address || 'Not provided'
    },
    {
      key: '5',
      label: 'Phone',
      children: user.phone || 'Not provided'
    }
  ];

  return (
    <Descriptions
      title="User Info"
      bordered
      column={1}
      items={items}
    />
  );
};

export default AboutTab; 