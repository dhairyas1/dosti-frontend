import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/course.css';

const Course = () => {
  const { courseId } = useParams();

  return (
    <div className="course-container">
      <div className="course-header">
        <h1>Python for Beginners</h1>
        <p>Learn Python programming from scratch</p>
      </div>

      <div className="course-content">
        <aside className="lessons-sidebar">
          <ul className="lesson-list">
            <li className="lesson-item active">
              <span className="lesson-title">Introduction to Python</span>
              <input type="checkbox" className="lesson-checkbox" />
            </li>
            <li className="lesson-item">
              <span className="lesson-title">Variables and Data Types</span>
              <input type="checkbox" className="lesson-checkbox" />
            </li>
            <li className="lesson-item">
              <span className="lesson-title">Control Flow</span>
              <input type="checkbox" className="lesson-checkbox" />
            </li>
            <li className="lesson-item">
              <span className="lesson-title">Functions</span>
              <input type="checkbox" className="lesson-checkbox" />
            </li>
            <li className="lesson-item">
              <span className="lesson-title">Object-Oriented Programming</span>
              <input type="checkbox" className="lesson-checkbox" />
            </li>
            <li className="lesson-item">
              <span className="lesson-title">Final Project</span>
              <input type="checkbox" className="lesson-checkbox" />
            </li>
          </ul>
        </aside>

        <main className="video-container">
          <div className="video-wrapper">
            <video controls>
              <source src="/lessons/python/lesson1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="lesson-info">
            <h2>Introduction to Python</h2>
            <p>In this lesson, you'll learn about:</p>
            <ul>
              <li>What is Python?</li>
              <li>Setting up your development environment</li>
              <li>Writing your first Python program</li>
              <li>Basic syntax and structure</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Course; 