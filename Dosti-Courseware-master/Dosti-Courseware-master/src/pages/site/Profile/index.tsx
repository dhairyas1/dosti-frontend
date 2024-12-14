import { Col, Row, Tabs, Avatar, Space, Card, Button } from 'antd';
import { EditOutlined, ReadOutlined, TrophyOutlined, MessageOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { formatVideoLengthToHours } from '../../../utils/functions';
import { useGetUserDetailQuery } from '../client.service';
import AboutTab from './components/AboutTab';
import ActivitiesTab from './components/ActivitiesTab';
import './Profile.scss';
import { IUser, UserRole } from '../../../types/user.type';

interface Course {
  _id: string;
  title: string;
  totalVideosLengthDone: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  courses: Course[];
  posts?: any[];
  achievements?: any[];
}

interface StatItemProps {
  icon: React.ReactNode;
  number: number | string;
  text: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, number, text }) => (
  <Card className='profile__stat-card'>
    <div className='profile__stat-icon'>{icon}</div>
    <div className='profile__stat-number'>{number}</div>
    <div className='profile__stat-text'>{text}</div>
  </Card>
);

interface ProfileProps {
  user: IUser;
}

const Profile: React.FC<ProfileProps> = ({ user: propUser }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const { data, isFetching } = useGetUserDetailQuery(
    {
      _userId: userId,
      _limit: 12,
      _page: 1
    },
    {
      skip: !userId
    }
  );

  const userRole = propUser.role as UserRole;

  const user = data?.user as User | undefined;
  const totalVideoHours = user?.courses.reduce((acc, course) => {
    return acc + (course.totalVideosLengthDone || 0);
  }, 0) || 0;

  const tabItems = [
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

  if (isFetching || !user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className='profile'>
      <div className='profile__wrap'>
        <div className='profile__header'>
          <div className='container profile__header-wrap'>
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} sm={12} md={4}>
                <StatItem 
                  icon={<ReadOutlined className="text-primary" />}
                  number={user.courses.length}
                  text="Courses"
                />
              </Col>

              <Col xs={24} sm={12} md={4}>
                <StatItem 
                  icon={<ReadOutlined className="text-success" />}
                  number={formatVideoLengthToHours(totalVideoHours)}
                  text="Hours"
                />
              </Col>

              <Col xs={24} md={8}>
                <Card className='profile__user-card'>
                  <Space size="large" align="center">
                    <Avatar
                      size={80}
                      src={user.avatar || 'https://joeschmoe.io/api/v1/random'}
                      alt={user.name}
                    />
                    <div>
                      <h3 className='profile__user-name'>
                        {user.name}
                        <span className='profile__user-badge'>
                          {userRole}
                        </span>
                      </h3>
                      <Button 
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </Space>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={4}>
                <StatItem 
                  icon={<MessageOutlined className="text-warning" />}
                  number={user.posts?.length || 0}
                  text="Posts"
                />
              </Col>

              <Col xs={24} sm={12} md={4}>
                <StatItem 
                  icon={<TrophyOutlined className="text-danger" />}
                  number={user.achievements?.length || 0}
                  text="Achievements"
                />
              </Col>
            </Row>
          </div>
        </div>

        <div className='profile__content'>
          <Tabs
            defaultActiveKey="1"
            items={tabItems}
            centered
            size="large"
            className="profile-tabs"
            tabBarStyle={{
              marginBottom: 24,
              fontWeight: 500
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
