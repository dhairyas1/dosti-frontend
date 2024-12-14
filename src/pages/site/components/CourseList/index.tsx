import React from 'react';

interface SimpleCourse {
  title: string;
  description: string;
}

interface CourseListProps {
  courses: SimpleCourse[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="course-list">
      {courses.map((course, index) => (
        <div key={index} className="course-item">
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseList; 