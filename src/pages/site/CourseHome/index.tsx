import { Link } from 'react-router-dom';
import './CourseHome.scss';

const CourseHome = () => {
  return (
    <div className="container">
      <h1 className="course-title">Available Courses</h1>
      <div className="courses-grid">
        <div className="course-card">
          <div className="course-thumbnail">
            <img src="https://i.imgur.com/7kwnZXz.jpg" alt="Python Course" />
          </div>
          <div className="course-info">
            <h2>Python for Beginners</h2>
            <p>Learn Python programming from scratch with hands-on projects and real-world examples.</p>
            <div className="course-meta">
              <span>5 Lessons</span>
              <span>•</span>
              <span>2.5 Hours</span>
            </div>
            <Link to="/course_1" className="course-button">Start Learning</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;