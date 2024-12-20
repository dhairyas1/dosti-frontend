import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './SiteLayout.scss';

const RootSiteLayout = () => {
  return (
    <div className='site-layout'>
      <Header />
      <main className='main-content'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootSiteLayout;
