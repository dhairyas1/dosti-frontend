import React, { FC, useState, useCallback } from 'react';
import './SplitScreen.scss';

const SplitScreen: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSplit = useCallback(() => {
    setIsOpen(prev => !prev);
    // When opening, we need to ensure the main content is visible
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

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
        <div className="main-content">
          <div id="main-site-content">
            {/* Your main site content will be moved here by React */}
          </div>
        </div>
        <div className="replit-content">
          <iframe
            src="https://codesandbox.io/embed/new?file=/main.py&template=python"
            width="100%"
            height="100%"
            title="Python CodeSandbox"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default SplitScreen; 