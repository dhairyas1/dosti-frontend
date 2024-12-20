import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import { openAuthModal, setUnauthenticated } from '../../../pages/auth.slice';
import { RootState } from '../../../store/store';
import { useLogoutMutation } from '../../../pages/auth.service';
import Logo from '../../../assets/images/logo.png';
import './Header.scss';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [logout] = useLogoutMutation();

  const handleCoursesClick = () => {
    navigate('/course-home');
  };

  const handleLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        dispatch(setUnauthenticated());
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  return (
    <div className='header'>
      <div className='header__wrapper'>
        <Link to='/' className='header__logo'>
          <img src={Logo} alt='Codey AI Logo' className='header__logo-img' />
        </Link>
        <div className='header__nav'>
          <ul className='header__nav-list'>
            <li className='header__nav-item'>
              <Link to='/' className='header__nav-link'>
                Home
              </Link>
            </li>
            <li className='header__nav-item'>
              <button onClick={handleCoursesClick} className='header__nav-link'>
                Courses
              </button>
            </li>
            <li className='header__nav-item'>
              <Link to='/contact' className='header__nav-link'>
                Contact
              </Link>
            </li>
            <li className='header__nav-item'>
              <Link to='/about-us' className='header__nav-link'>
                About us
              </Link>
            </li>
          </ul>

          <div className='header__auth'>
            {!isAuth ? (
              <Button onClick={() => dispatch(openAuthModal())} className='btn btn-sm'>
                Sign in
              </Button>
            ) : (
              <Button onClick={handleLogout} className='btn btn-sm'>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
