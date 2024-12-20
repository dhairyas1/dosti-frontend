import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ClockCircleOutlined, BookOutlined } from '@ant-design/icons';
import { openAuthModal } from '../../../pages/auth.slice';
import { RootState } from '../../../store/store';
import pythonLogo from '../../../assets/images/python.png';
import './CourseHome.scss';

const CourseHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleCourseClick = (path: string) => {
    if (!isAuth) {
      dispatch(openAuthModal());
      return;
    }
    navigate(path);
  };

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
            <button 
              onClick={() => handleCourseClick('/course_1')} 
              className="course-button"
            >
              {isAuth ? 'Start Learning' : 'Login to Start'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;