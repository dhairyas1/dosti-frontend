import { useNavigate } from 'react-router-dom';
import './CourseHome.scss';

const CourseHome = () => {
  const navigate = useNavigate();

  const handleCourseClick = (path: string) => {
    // Force a page reload after navigation
    window.location.href = path;
  };

  return (
    <div className="container">
      <h1 className="course-title">Available Courses</h1>
      <div className="courses-grid">
        <div className="course-card">
          <button onClick={() => handleCourseClick('/course_1')} className="course-button">Course 1</button>
        </div>
        <div className="course-card">
          <button onClick={() => handleCourseClick('/course_2.html')} className="course-button">Course 2</button>
        </div>
        <div className="course-card">
          <button onClick={() => handleCourseClick('/course_3.html')} className="course-button">Course 3</button>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;