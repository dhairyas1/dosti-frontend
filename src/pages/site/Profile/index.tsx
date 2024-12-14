import React from 'react';
import { Row, Col, Tabs, Button } from '../../../components/antd';
import type { RowProps, ColProps, TabsProps } from 'antd';
import { IUser } from '../../../types/user.type';
import AboutTab from './components/AboutTab';
import ActivitiesTab from './components/ActivitiesTab';

interface ProfileProps {
  user: IUser;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const rowProps: RowProps = {
    gutter: [24, 24],
    align: 'middle'
  };

  const colProps: ColProps = {
    xs: 24,
    sm: 12,
    md: 4
  };

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'About',
      children: <AboutTab user={user} />
    },
    {
      key: '2',
      label: 'Activities',
      children: <ActivitiesTab user={user} />
    }
  ];

  const tabProps: TabsProps = {
    defaultActiveKey: '1',
    items: tabItems,
    centered: true,
    size: 'large',
    className: 'profile-tabs',
    tabBarStyle: { marginBottom: 24, fontWeight: 500 }
  };

  return (
    <div className="profile">
      <Row {...rowProps}>
        <Col {...colProps}>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <Button type="primary">
              Edit Profile
            </Button>
          </div>
        </Col>
      </Row>
      <Tabs {...tabProps} />
    </div>
  );
};

export default Profile; 