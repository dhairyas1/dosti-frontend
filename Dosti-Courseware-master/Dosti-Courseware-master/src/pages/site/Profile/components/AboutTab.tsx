import { Card } from 'antd';
import React from 'react';

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  courses: any[];
}

interface AboutTabProps {
  user?: IUser;
}

const AboutTab: React.FC<AboutTabProps> = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-tab">
      <Card title="About Me" bordered={false}>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>Courses Enrolled: {user.courses.length}</p>
      </Card>
    </div>
  );
};

export default AboutTab;
