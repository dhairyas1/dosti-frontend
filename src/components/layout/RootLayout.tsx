import React, { FC, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './SiteLayout.scss';
import SplitScreen from '../SplitScreen';

const RootSiteLayout: FC = () => {
  useEffect(() => {
    // Function to move content between main and split view
    const handleSplitView = () => {
      const mainContent = document.getElementById('main');
      const splitContent = document.getElementById('main-site-content');
      
      if (mainContent && splitContent) {
        // Create a mutation observer to watch for changes in the split container's class
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
              const splitContainer = (mutation.target as HTMLElement).closest('.split-container');
              if (splitContainer) {
                const isActive = splitContainer.classList.contains('active');
                if (isActive) {
                  // Move content to split view
                  splitContent.appendChild(mainContent);
                } else {
                  // Move content back to original position
                  document.body.appendChild(mainContent);
                }
              }
            }
          });
        });

        // Start observing the split container
        const splitContainer = document.querySelector('.split-container');
        if (splitContainer) {
          observer.observe(splitContainer, { attributes: true });
        }

        return () => observer.disconnect();
      }
    };

    handleSplitView();
  }, []);

  return (
    <div className='main' id='main'>
      <Header />
      <Outlet />
      <Footer />
      <SplitScreen />
    </div>
  );
};

export default RootSiteLayout;
