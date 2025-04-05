import React, { FC, useState } from 'react';
import './SplitScreen.scss';

const SplitScreen: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSplit = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`floating-button ${isOpen ? 'active' : ''}`}
        onClick={toggleSplit}
        aria-label="Toggle Split Screen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <line x1="12" y1="3" x2="12" y2="21" />
        </svg>
      </button>

      <div className={`split-container ${isOpen ? 'active' : ''}`}>
        <div className="content-wrapper">
          <div className="main-content">
            {/* This div will wrap your existing content */}
          </div>
          <div className="replit-content">
            <iframe
              src="https://replit.com/@replit/HTML-CSS-JS?embed=true"
              width="100%"
              height="100%"
              title="Replit Embed"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SplitScreen; 