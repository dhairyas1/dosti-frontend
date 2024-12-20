import { Link } from 'react-router-dom';
import './CourseHome.scss';

const CourseHome = () => {
  return (
    <div className="container">
      <h1 className="course-title">Available Courses</h1>
      <div className="courses-grid">
        <div className="course-card">
          <Link to="/course_1" className="course-button">Course 1</Link>
        </div>
        <div className="course-card">
          <Link to="/course_2.html" className="course-button">Course 2</Link>
        </div>
        <div className="course-card">
          <Link to="/course_3.html" className="course-button">Course 3</Link>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;