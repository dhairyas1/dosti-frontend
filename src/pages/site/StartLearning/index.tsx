import React from 'react';
import './StartLearning.scss';

interface StartLearningProps {
  onStart: () => void;
}

const StartLearning: React.FC<StartLearningProps> = ({ onStart }) => {
  return (
    <div className="start-learning">
      <h1>Ready to Start Learning?</h1>
      <p>Click the button below to begin your learning journey.</p>
      <button className="btn btn-primary" onClick={onStart}>
        Start Learning
      </button>
    </div>
  );
};

export default StartLearning; 