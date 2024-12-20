import React, { useState } from 'react';
import { RobotOutlined, CloseOutlined } from '@ant-design/icons';
import './Course1.scss';

const Course1: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);

  const lessons = [
    {
      title: 'Introduction to Python',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
      objectives: ['Learn Python basics', 'Understand variables and data types', 'Write your first Python program']
    },
    {
      title: 'Control Flow',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/HZARImviDxg',
      objectives: ['Master if-else statements', 'Work with loops', 'Handle basic error cases']
    },
    {
      title: 'Functions and Modules',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/u-OmVr_fT4s',
      objectives: ['Create and use functions', 'Work with parameters', 'Import and use modules']
    }
  ];

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="course-container">
      <div className="sidebar">
        <h2>Course Content</h2>
        <div className="lessons-list">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className={`lesson-item ${selectedLesson === index ? 'active' : ''}`}
              onClick={() => setSelectedLesson(index)}
            >
              <span className="lesson-number">{index + 1}</span>
              <span className="lesson-title">{lesson.title}</span>
              {lesson.completed && <span className="completed-badge">✓</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <div className="video-container">
          <iframe
            src={lessons[selectedLesson].videoUrl}
            title={lessons[selectedLesson].title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="lesson-info">
          <h2>{lessons[selectedLesson].title}</h2>
          <div className="objectives">
            <h3>Learning Objectives:</h3>
            <ul>
              {lessons[selectedLesson].objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        </div>
        <button className="chatbot-toggle" onClick={toggleChatbot}>
          {showChatbot ? <CloseOutlined /> : <RobotOutlined />}
          {showChatbot ? 'Close Codey AI' : 'Open Codey AI'}
        </button>
        {showChatbot && (
          <div className="chatbot-container">
            <iframe
              src='https://interfaces.zapier.com/embed/chatbot/cm2jarbb1002fdiy2y209rgpu'
              height='600px'
              width='400px'
              allow='clipboard-write *'
              style={{ border: 'none' }}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course1; 