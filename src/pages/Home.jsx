import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="courses-grid">
      <div className="course-card">
        <img src="/src/assets/images/logo.png" alt="Python Course" className="course-image" />
        <div className="course-content">
          <h2 className="course-title">Python for Beginners</h2>
          <p className="course-description">
            This course is designed for beginners who want to learn the basics of Python programming.
            It covers the fundamental concepts of Python, including data types, variables, control structures,
            functions, and object-oriented programming.
          </p>
          <div className="course-meta">
            <span>No. of Lessons: 6</span>
          </div>
          <br />
          <Link to="/courses/python" className="course-button">
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 