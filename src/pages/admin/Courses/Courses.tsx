import React from 'react';
import { Tabs } from 'antd';
import CourseDetailDashboard from './components/Dashboard';
import CoursesGrid from './components/CoursesGrid';
import CoursesList from './components/CoursesList';
import './Courses.scss';

const { TabPane } = Tabs;

const Courses = () => {
  return (
    <div className="admin-courses">
      <Tabs defaultActiveKey="dashboard">
        <TabPane tab="Dashboard" key="dashboard">
          <CourseDetailDashboard />
        </TabPane>
        <TabPane tab="Grid View" key="grid">
          <CoursesGrid />
        </TabPane>
        <TabPane tab="List View" key="list">
          <CoursesList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Courses;
