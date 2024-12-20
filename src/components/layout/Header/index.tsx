import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { openAuthModal } from '../../../pages/auth.slice';
import { RootState } from '../../../store/store';
import { logout } from '../../../pages/auth.slice';
import logo from '../../../assets/images/DostiLogo.png';
import './Header.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCoursesClick = () => {
    if (isAuth) {
      navigate('/course-home');
    } else {
      dispatch(openAuthModal());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="left-section">
          <img
            src={logo}
            alt="Project Dosti Logo"
            className="logo"
            onClick={handleLogoClick}
          />
          <Button type="text" onClick={handleCoursesClick}>
            Courses
          </Button>
        </div>
        <div className="right-section">
          {isAuth ? (
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button type="primary" onClick={() => dispatch(openAuthModal())}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
