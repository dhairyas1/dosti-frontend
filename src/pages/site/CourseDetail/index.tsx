import React from 'react';
import './CourseDetail.scss';

interface SimpleCourse {
  title: string;
  description: string;
}

interface CourseDetailProps {
  course: SimpleCourse;
  onEnroll: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onEnroll }) => {
  return (
    <div className="course-detail">
      <nav className="breadcrumb">
        <a href="/">Home</a>
        <span> / </span>
        <a href="/courses">Courses</a>
        <span> / </span>
        <span>{course.title}</span>
      </nav>
      <div className="course-content">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <button className="btn btn-primary" onClick={onEnroll}>
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default CourseDetail; 