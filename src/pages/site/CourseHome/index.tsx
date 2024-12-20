import { Link } from 'react-router-dom';
import './CourseHome.scss';

const CourseHome = () => {
  return (
    <div>
      <h1>Course Home</h1>
      <div>
        <Link to="/courses/1">Course 1</Link>
        <Link to="/courses/2">Course 2</Link>
        <Link to="/courses/3">Course 3</Link>
      </div>
    </div>
  );
};

export default CourseHome;