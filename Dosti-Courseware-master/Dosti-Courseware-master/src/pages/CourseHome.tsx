import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { openAuthModal } from '../pages/auth.slice';
import '../styles/CourseHome.css';

const courses = [
  {
    id: 1,
    title: 'Python for Beginners',
    description: 'Learn the fundamental concepts of Python programming, including data types, control structures, functions, and object-oriented programming.',
    image: '/src/assets/images/python-course.jpg',
    difficulty: 'beginner',
    path: '/course_1.html'
  }
];

const CourseHome: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleCourseClick = (path: string) => {
    if (!isAuth) {
      dispatch(openAuthModal());
      return;
    }
    window.location.href = path;
  };

  return (
    <div className="container">
      <header>
        <h1>Available Courses</h1>
        <p>Select a course to start learning</p>
      </header>
      
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <img 
              src={course.image} 
              alt={course.title} 
              className="course-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/400x200?text=' + course.title.replace(/ /g, '+');
              }}
            />
            <div className="course-content">
              <h2 className="course-title">{course.title}</h2>
              <p className="course-description">{course.description}</p>
              <div className="course-meta">
                <span className={`difficulty ${course.difficulty}`}>
                  {course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}
                </span>
                <button 
                  onClick={() => handleCourseClick(course.path)} 
                  className="course-button"
                >
                  {isAuth ? 'Start Learning' : 'Login to Start'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseHome; 