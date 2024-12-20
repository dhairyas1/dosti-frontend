import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { RobotOutlined, CloseOutlined } from '@ant-design/icons';
import './Course1.scss';

interface Lesson {
  title: string;
  completed: boolean;
  videoUrl: string;
  objectives: string[];
}

const Course1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const defaultVideos = {
    intro: 'https://www.youtube.com/embed/rfscVS0vtbw',
    variables: 'https://www.youtube.com/embed/Z1Yd7upQsXY',
    controlFlow: 'https://www.youtube.com/embed/Zp5MuPOtsSY',
    functions: 'https://www.youtube.com/embed/9Os0o3wzS_I',
    oop: 'https://www.youtube.com/embed/JeznW_7DlB0'
  };

  const lessons: Lesson[] = [
    {
      title: 'Introduction to Python',
      completed: false,
      videoUrl: defaultVideos.intro,
      objectives: [
        'What is Python?',
        'Setting up your development environment',
        'Writing your first Python program',
        'Basic syntax and structure'
      ]
    },
    {
      title: 'Variables and Data Types',
      completed: false,
      videoUrl: defaultVideos.variables,
      objectives: [
        'Understanding variables',
        'Numbers, strings, and booleans',
        'Lists and dictionaries',
        'Type conversion'
      ]
    },
    {
      title: 'Control Flow',
      completed: false,
      videoUrl: defaultVideos.controlFlow,
      objectives: [
        'If statements',
        'Loops (for and while)',
        'Break and continue',
        'Exception handling'
      ]
    },
    {
      title: 'Functions',
      completed: false,
      videoUrl: defaultVideos.functions,
      objectives: [
        'Defining functions',
        'Parameters and return values',
        'Lambda functions',
        'Built-in functions'
      ]
    },
    {
      title: 'Object-Oriented Programming',
      completed: false,
      videoUrl: defaultVideos.oop,
      objectives: [
        'Classes and objects',
        'Inheritance',
        'Encapsulation',
        'Polymorphism'
      ]
    }
  ];

  const [selectedLesson, setSelectedLesson] = useState<Lesson>(lessons[0]);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  if (isLoading) {
    return (
      <div className="course-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="course-container">
      <div className="course-header">
        <h1>Python for Beginners</h1>
        <p>Learn Python programming from scratch</p>
      </div>

      <div className="course-content">
        <aside className="lessons-sidebar">
          <ul className="lesson-list">
            {lessons.map((lesson, index) => (
              <li
                key={index}
                className={`lesson-item ${lesson.title === selectedLesson.title ? 'active' : ''}`}
                onClick={() => setSelectedLesson(lesson)}
              >
                <span className="lesson-title">{lesson.title}</span>
                <input
                  type="checkbox"
                  className="lesson-checkbox"
                  checked={lesson.completed}
                  onChange={() => {
                    lesson.completed = !lesson.completed;
                  }}
                />
              </li>
            ))}
          </ul>
          <Button 
            type="primary" 
            icon={<RobotOutlined />}
            className="chatbot-toggle"
            onClick={toggleChatbot}
          >
            Ask Codey AI
          </Button>
        </aside>

        <main className="video-container">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="100%"
              src={selectedLesson.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="lesson-info">
            <h2>{selectedLesson.title}</h2>
            <ul>
              {selectedLesson.objectives.map((objective, index) => (
                <li key={index}>{objective}</li>
              ))}
            </ul>
          </div>
        </main>

        {showChatbot && (
          <div className="chatbot-container">
            <div className="chatbot-header">
              <h3>Codey AI Assistant</h3>
              <Button 
                type="text" 
                icon={<CloseOutlined />} 
                onClick={toggleChatbot}
                className="close-button"
              />
            </div>
            <iframe
              src="https://explain-ai-chatbot-2ce90e.zapier.app/codey-ai"
              width="100%"
              height="100%"
              frameBorder="0"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Course1; 