import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/store';
import { openAuthModal } from '../../../pages/auth.slice';
import './CourseHome.scss';

const CourseHome = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();

  const handleStartLearning = (e: React.MouseEvent) => {
    if (!isAuth) {
      e.preventDefault();
      dispatch(openAuthModal());
    }
  };

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
            {isAuth ? (
              <Link to="/course_1" className="course-button">Start Learning</Link>
            ) : (
              <button onClick={handleStartLearning} className="course-button">Sign in to Start Learning</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHome;