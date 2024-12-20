import React from 'react';
import { Link } from 'react-router-dom';
import { ClockCircleOutlined, BookOutlined } from '@ant-design/icons';
import pythonLogo from '../../../assets/images/python.png';
import './CourseHome.scss';

const CourseHome: React.FC = () => {
  return (
    <div className="container">
      <h1 className="course-title">Available Courses</h1>
      <div className="courses-grid">
        <div className="course-card">
          <div className="course-thumbnail">
            <img src={pythonLogo} alt="Python Course" />
          </div>
          <div className="course-info">
            <h2>Python Programming</h2>
            <p>Learn Python programming from scratch. Master the fundamentals and build real-world applications.</p>
            <div className="course-meta">
              <BookOutlined /> 12 Lessons
              <ClockCircleOutlined /> 24 Hours
            </div>
            <Link to="/course_1" className="course-button">
              Start Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;