import React from 'react';
import { Layout } from 'antd';
import CourseDetailDashboard from '../Courses/components/Dashboard';
import './CourseDashboard.scss';

const { Content } = Layout;

const CourseDashboard: React.FC = () => {
  return (
    <Layout className="course-admin-dashboard">
      <Content>
        <CourseDetailDashboard />
      </Content>
    </Layout>
  );
};

export default CourseDashboard; 