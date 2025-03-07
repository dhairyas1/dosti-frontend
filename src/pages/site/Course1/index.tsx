import React, { useState, useEffect } from 'react';
import { RobotOutlined, CloseOutlined } from '@ant-design/icons';
import Progress from 'antd/lib/progress';
import './Course1.scss';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const Course1: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState(0);
  const [showChatbot, setShowChatbot] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [player, setPlayer] = useState<any>(null);

  const lessons = [
    {
      title: 'Python Basics', //1.1
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/3bkEChk8ytE',
      objectives: ['Learn Python basics', 'Understand variables and data types', 'Write your first Python program']
    },
    {
      title: 'Working Modes', //1.2
      completed: false,
      videoUrl: '',
      objectives: ['Master if-else statements', 'Work with loops', 'Handle basic error cases']
    },
    {
      title: 'How to use Codey Chatbot', //1.3
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/rw43ITQRBgI',
      objectives: ['Understand Codey Chatbot basics', 'Learn to interact with Codey Chatbot', 'Use Codey Chatbot for coding assistance']
    },
    {
      title: 'Python Syntax and Tokens', //1.4
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/BWt4bXa7M0A',
      objectives: ['Understand Python syntax', 'Learn about tokens in Python', 'Master Python syntax rules']
    },
    {
      title: 'Variables and Data Types',//2.1
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/4XAlVbZ1qy0',
      objectives: ['Understand variables in Python', 'Learn about data types in Python', 'Work with variables and data types']
    },
    {
      title: 'Input/Output', //2.2
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/xve9Qlo46Fo',
      objectives: ['Learn about input/output operations in Python', 'Understand how to read user input', 'Master output formatting']
    },
    {
      title: 'Operators', //2.3
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/vwfb71Ublzo',
      objectives: ['Learn about operators in Python', 'Understand arithmetic operators', 'Master comparison and logical operators']
    },
    {
      title: 'Conditional Statements', //3.1
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/A85B70v0-f4',
      objectives: ['Learn about conditional statements in Python', 'Understand if-else statements', 'Master nested conditional statements']
    },
    {
      title: 'Iteration', //3.2
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/a8Q_qZYjugg',
      objectives: ['Learn about iteration in Python', 'Understand for loops', 'Master while loops']
    },
    {
      title: 'Applications', //3.3
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/OHEZFLTFZiw',
      objectives: ['Learn about real-world applications of Python', 'Understand how to apply Python in different domains', 'Master using Python for problem-solving']
    },
    {
      title: 'String Basics', //4.1
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/dC6GEpoQVcw',
      objectives: ['Learn about strings in Python', 'Understand string operations', 'Master string formatting']
    },
    {
      title: 'String Operations', //4.2
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/EHO4DrxU38g',
      objectives: ['Learn about string operations in Python', 'Understand string concatenation', 'Master string slicing']
    },
    {
      title: 'String Methods', //4.3
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/DKNb4ZZVilA',
      objectives: ['Learn about string methods in Python', 'Understand string formatting methods', 'Master string manipulation methods']
    },
    {
      title: 'Applications', //4.4
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/43Tfu9uywzI',
      objectives: ['Learn about real-world applications of strings in Python', 'Understand how to apply string operations in different domains', 'Master using strings for problem-solving']
    },
    {
      title: 'Basics of Lists', //5.1
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/DvRSEH9i8vw',
      objectives: ['Learn about lists in Python', 'Understand list operations', 'Master list indexing']
    },
    {
      title: 'List Operations', //5.2
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/5ypVz4QXbt8',
      objectives: ['Learn about list operations in Python', 'Understand list concatenation', 'Master list slicing']
    },
    {
      title: 'List Methods', //5.3
      completed: false,
      videoUrl: 'https://www.youtube.com/embed/xqqLxmRKuYs',
      objectives: ['Learn about list methods in Python', 'Understand list manipulation methods', 'Master list sorting methods']
    },
    {
      title: 'Applications', //5.4
      completed: false,
      videoUrl: '',
      objectives: ['Learn about real-world applications of lists in Python', 'Understand how to apply list operations in different domains', 'Master using lists for problem-solving']
    }
  ];

  // Calculate progress percentage
  const totalLessons = lessons.filter(lesson => lesson.videoUrl !== '').length;
  const progress = Math.round((completedLessons.size / totalLessons) * 100);

  // Load YouTube API
  useEffect(() => {
    // Load the YouTube IFrame Player API code asynchronously
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      createPlayer();
    };

    return () => {
      window.onYouTubeIframeAPIReady = () => {};
    };
  }, []);

  // Create or update player when selected lesson changes
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      createPlayer();
    }
  }, [selectedLesson]);

  const createPlayer = () => {
    const videoUrl = lessons[selectedLesson].videoUrl;
    if (!videoUrl) return;

    // Extract video ID from URL
    const videoId = videoUrl.split('/').pop();
    
    if (player) {
      player.destroy();
    }

    const newPlayer = new window.YT.Player('youtube-player', {
      videoId,
      events: {
        onStateChange: (event: any) => {
          // Video ended
          if (event.data === window.YT.PlayerState.ENDED) {
            handleVideoEnd();
          }
        },
      },
    });

    setPlayer(newPlayer);
  };

  const handleVideoEnd = () => {
    // Add current lesson to completed lessons
    setCompletedLessons(prev => new Set([...prev, selectedLesson]));
  };

  // Load completed lessons from localStorage on component mount
  useEffect(() => {
    const savedCompletedLessons = localStorage.getItem('completedLessons');
    if (savedCompletedLessons) {
      setCompletedLessons(new Set(JSON.parse(savedCompletedLessons)));
    }
  }, []);

  // Save completed lessons to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify([...completedLessons]));
  }, [completedLessons]);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="course-container">
      <div className="sidebar">
        <h2>Course Content</h2>
        <div className="progress-container">
          <Progress 
            percent={progress} 
            status={progress === 100 ? "success" : "active"}
            format={(percent) => `${percent}% Complete`}
          />
        </div>
        <div className="lessons-list">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className={`lesson-item ${selectedLesson === index ? 'active' : ''}`}
              onClick={() => setSelectedLesson(index)}
            >
              <span className="lesson-number">{index + 1}</span>
              <span className="lesson-title">{lesson.title}</span>
              {completedLessons.has(index) && <span className="completed-badge">✓</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <div className="video-container">
          <div id="youtube-player"></div>
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