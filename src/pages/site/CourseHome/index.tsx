import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthModal } from '../../../pages/auth.slice';
import { RootState } from '../../../store/store';
import pythonLogo from '../../../assets/images/python.png';
import './CourseHome.scss';

const CourseHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleCourseClick = () => {
    if (isAuth) {
      navigate('/course_1');
    } else {
      dispatch(openAuthModal());
    }
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
            <p>Learn Python programming from scratch with hands-on projects and real-world examples.</p>
            <div className="course-meta">
              <span>12 Lessons</span>
              <span>•</span>
              <span>6 Hours</span>
            </div>
            <button onClick={handleCourseClick} className="course-button">
              {isAuth ? 'Start Learning' : 'Login to Access'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;