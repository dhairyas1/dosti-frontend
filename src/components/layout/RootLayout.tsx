import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './SiteLayout.scss';
import SplitScreen from '../SplitScreen';

const RootSiteLayout: React.FC = () => {
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
