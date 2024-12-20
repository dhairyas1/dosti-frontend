import { Link } from 'react-router-dom';
import './CourseHome.scss';  // Move all CSS to this file

const CourseHome = () => {
  return (
    <div className="container">
      <div className="courses-grid">
        <div className="course-card">
          <img 
            src="../../../assets/images/logo.png" 
            alt="Course 1" 
            className="course-image" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '../../../assets/images/default-course.jpg';
            }}
          />
          <div className="course-content">
            <h2 className="course-title">Course 1</h2>
            <p className="course-description">Description</p>
            <div className="course-meta">
              <span>Num of Lessons</span>
            </div>
            <br />
            <Link to="/course/1" className="course-button">Start Learning</Link>
          </div>
        </div>

        <div className="course-card">
          <img 
            src="../../../assets/images/logo.png" 
            alt="Course 2" 
            className="course-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '../../../assets/images/default-course.jpg';
            }}
          />
          <div className="course-content">
            <h2 className="course-title">Course 2</h2>
            <p className="course-description">Description</p>
            <div className="course-meta">
              <span>Num of Lessons</span>
            </div>
            <br />
            <Link to="/course/2" className="course-button">Start Learning</Link>
          </div>
        </div>

        <div className="course-card">
          <img 
            src="../../../assets/images/logo.png" 
            alt="Course 3" 
            className="course-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '../../../assets/images/default-course.jpg';
            }}
          />
          <div className="course-content">
            <h2 className="course-title">Course 3</h2>
            <p className="course-description">Description</p>
            <div className="course-meta">
              <span>Num of Lessons</span>
            </div>
            <br />
            <Link to="/course/3" className="course-button">Start Learning</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;