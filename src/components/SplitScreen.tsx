import React, { FC, useState, useCallback, useEffect } from 'react';
import './SplitScreen.scss';

const SplitScreen: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Cleanup function to reset body style when component unmounts or split screen closes
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Handle split screen toggle
  const toggleSplit = useCallback(() => {
    setIsOpen(prevState => {
      const newState = !prevState;
      document.body.style.overflow = newState ? 'hidden' : 'auto';
      return newState;
    });
  }, []);

  // Handle escape key to close split screen
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        toggleSplit();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, toggleSplit]);

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

      {isOpen && (
        <div className="split-container active">
          <div className="main-content">
            <div id="main-site-content">
              {/* Your main site content will be moved here by React */}
            </div>
          </div>
          <div className="replit-content">
            <iframe
              key={isOpen ? 'open' : 'closed'} // Force iframe refresh when reopening
              src="https://jupyter.org/try-jupyter/lab/"
              width="100%"
              height="100%"
              title="Python Jupyter Environment"
              frameBorder="0"
              allowFullScreen
              allow="clipboard-read; clipboard-write; fullscreen"
              sandbox="allow-downloads allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-top-navigation"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SplitScreen; 