import React from 'react';
import { Button } from '../../../components/antd';

interface StartLearningProps {
  onStart: () => void;
}

const StartLearning: React.FC<StartLearningProps> = ({ onStart }) => {
  return (
    <div className="start-learning">
      <h1>Ready to Start Learning?</h1>
      <p>Click the button below to begin your learning journey.</p>
      <Button type="primary" onClick={onStart}>
        Start Learning
      </Button>
    </div>
  );
};

export default StartLearning; 