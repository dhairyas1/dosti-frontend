import React from 'react';
import { Card, Descriptions } from 'antd';
import type { CardProps, DescriptionsProps } from 'antd';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  courses: any[];
}

interface AboutTabProps {
  user?: User;
}

const AboutTab: React.FC<AboutTabProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  const cardProps: CardProps = {
    className: 'about-tab',
  };

  const descriptionItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Full Name',
      children: user.name,
    },
    {
      key: '2',
      label: 'Email',
      children: user.email,
    },
    {
      key: '3',
      label: 'Role',
      children: user.role,
    },
    {
      key: '4',
      label: 'Enrolled Courses',
      children: `${user.courses.length} courses`,
    },
  ];

  const descriptionsProps: DescriptionsProps = {
    title: "User Information",
    items: descriptionItems,
    layout: "vertical",
    column: { xs: 1, sm: 2, md: 3 },
  };

  return (
    <Card {...cardProps}>
      <Descriptions {...descriptionsProps} />
    </Card>
  );
};

export default AboutTab;
