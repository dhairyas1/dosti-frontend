import React, { useState } from 'react';
import { RobotOutlined, CloseOutlined } from '@ant-design/icons';
import './Course1.scss';

const Course1: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);

  const lessons = [
    {
      title: 'Python Basics',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/kqtD5dpn9C8',
      objectives: ['Learn Python basics', 'Understand variables and data types', 'Write your first Python program']
    },
    {
      title: 'Working Modes',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/HZARImviDxg',
      objectives: ['Master if-else statements', 'Work with loops', 'Handle basic error cases']
    },
    {
      title: 'How to use Codey Chatbot',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/u-OmVr_fT4s',
      objectives: ['Understand Codey Chatbot basics', 'Learn to interact with Codey Chatbot', 'Use Codey Chatbot for coding assistance']
    },
    {
      title: 'Python Syntax and Token',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/u-OmVr_fT4s',
      objectives: ['Understand Python syntax', 'Learn about tokens in Python', 'Master Python syntax rules']
    },
    {
      title: 'Variables and Data Types',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Understand variables in Python', 'Learn about data types in Python', 'Work with variables and data types']
    },
    {
      title: 'Input/Output',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about input/output operations in Python', 'Understand how to read user input', 'Master output formatting']
    },
    {
      title: 'Operators',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about operators in Python', 'Understand arithmetic operators', 'Master comparison and logical operators']
    },
    {
      title: 'Conditional Statements',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about conditional statements in Python', 'Understand if-else statements', 'Master nested conditional statements']
    },
    {
      title: 'Iteration',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about iteration in Python', 'Understand for loops', 'Master while loops']
    },
    {
      title: 'Applications',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about real-world applications of Python', 'Understand how to apply Python in different domains', 'Master using Python for problem-solving']
    },
    {
      title: 'String Basics',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about strings in Python', 'Understand string operations', 'Master string formatting']
    },
    {
      title: 'String Operations',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about string operations in Python', 'Understand string concatenation', 'Master string slicing']
    },
    {
      title: 'String Methods',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about string methods in Python', 'Understand string formatting methods', 'Master string manipulation methods']
    },
    {
      title: 'Applications',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about real-world applications of strings in Python', 'Understand how to apply string operations in different domains', 'Master using strings for problem-solving']
    },
    {
      title: 'Basics of Lists',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about lists in Python', 'Understand list operations', 'Master list indexing']
    },
    {
      title: 'List Operations',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about list operations in Python', 'Understand list concatenation', 'Master list slicing']
    },
    {
      title: 'List Methods',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about list methods in Python', 'Understand list manipulation methods', 'Master list sorting methods']
    },
    {
      title: 'Applications',
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/YOUR_VIDEO_ID',
      objectives: ['Learn about real-world applications of lists in Python', 'Understand how to apply list operations in different domains', 'Master using lists for problem-solving']
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