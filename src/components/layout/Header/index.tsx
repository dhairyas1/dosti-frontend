import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Drawer, Dropdown, Modal, Space, notification } from 'antd';
import type { NotificationInstance } from 'antd/es/notification/interface';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../../pages/auth.service';
import { closeAuthModal, openAuthModal, setUnauthenticated } from '../../../pages/auth.slice';
import Login from '../../../pages/site/Auth/Login';
import Signup from '../../../pages/site/Auth/Signup';
import { useGetUserQuery } from '../../../pages/site/client.service';
import { RootState } from '../../../store/store';
import { IUser } from '../../../types/user.type';
import Button from '../../Button';
import './Header.scss';
import CategoriesNav from './components/CategoriesNav';
import Logo from '../../../assets/images/logo.png';

const Header = () => {
  const [showCategoriesNav, setShowCategoriesNav] = useState(true);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const isOpenAuthModal = useSelector((state: RootState) => state.auth.isOpenAuthModal);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const [authState, setAuthState] = useState('login');
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [userData, setUserData] = useState<IUser>();
  const { data } = useGetUserQuery(userId, {
    skip: !userId
  });
  const [logout, logoutResult] = useLogoutMutation();

  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  useEffect(() => {
    if (data) {
      setUserData(data.user);
    }
  }, [data]);

  const userAuthItems: MenuProps['items'] = [
    {
      label: (
        <Link to='/profile'>
          <div>{userData?.name}</div>
          <div>{userData?.email}</div>
        </Link>
      ),
      key: 'profile',
      icon: <Avatar src={userData?.avatar} />
    },
    {
      label: 'Instructor Dashboard',
      key: 'instructor',
      icon: <UserOutlined />
    },
    {
      label: 'Messages',
      key: 'messages',
      icon: <UserOutlined />
    },
    {
      label: 'Account Settings',
      key: 'account-settings',
      icon: <UserOutlined />
    },
    {
      label: 'Payment method',
      key: 'payment-method',
      icon: <UserOutlined />
    },
    {
      label: 'Purchase history',
      key: 'purchase-history',
      icon: <UserOutlined />
    },
    {
      label: 'Public Profile',
      key: 'public-profile',
      icon: <UserOutlined />
    },
    {
      label: 'Edit Profile',
      key: 'edit-profile',
      icon: <UserOutlined />
    },
    {
      label: 'Help',
      key: 'help',
      icon: <UserOutlined />
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <UserOutlined />,
      danger: true
    }
  ];

  const dispatch = useDispatch();

  const handleOk = () => {
    dispatch(closeAuthModal());
  };

  const handleCancel = () => {
    dispatch(closeAuthModal());
  };

  const signInHandler = () => {
    setAuthState('login');
    dispatch(openAuthModal());
  };

  const signUpHandler = () => {
    setAuthState('signup');
    dispatch(openAuthModal());
  };

  const changeAuthState = (authState: string) => {
    setAuthState(authState);
  };

  const [notificationApi, notificationContextHolder] = notification.useNotification();

  const showNotification = (type: 'success' | 'error', message: string) => {
    notificationApi[type]({
      message,
      placement: 'topRight',
    });
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      logout()
        .unwrap()
        .then((result) => {
          showNotification('success', result.message);
        })
        .catch((error) => {
          console.log('error: ', error);
          showNotification('error', 'Logout failed');
        });
      dispatch(setUnauthenticated());
    }
  };

  const menuUserProps = {
    items: userAuthItems,
    onClick: handleMenuClick
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowCategoriesNav(false);
      } else {
        setShowCategoriesNav(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onCloseMobileMenu = () => {
    setOpenMobileMenu(false);
  };

  const showMobileMenuHandler = () => {
    setOpenMobileMenu(true);
  };

  const handleCoursesClick = () => {
    navigate('/course-home');
  };

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Courses', path: '/course-home' },
    { label: 'Contact', path: '/contact' },
    { label: 'About us', path: '/about-us' }
  ];

  const handleDrawerNavigation = (path: string) => {
    navigate(path);
    setOpenMobileMenu(false); // Close drawer after navigation
  };

  return (
    <>
      {notificationContextHolder}
      <div className='header'>
        <div className='header__wrapper'>
          <MenuOutlined onClick={showMobileMenuHandler} className='header__menu-mobile font-bold lg:hidden' />
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
            {isAuth && (
              <div className='header__nav-item header__nav-item--user'>
                <Dropdown menu={menuUserProps} placement='bottomRight'>
                  <Badge dot={true}>
                    <Avatar className='header__nav-item-user-icon' src={userData?.avatar} />
                  </Badge>
                </Dropdown>
              </div>
            )}

            <div className='header__auth'>
              {!isAuth && (
                <Space>
                  <Button onClick={signInHandler} className='btn btn-sm'>
                    Sign in
                  </Button>
                  <Button onClick={signUpHandler} className='btn btn-sm btn-outline-primary'>
                    Sign up
                  </Button>
                </Space>
              )}
            </div>
          </div>
        </div>
        <Modal title='' open={isOpenAuthModal} onOk={handleOk} onCancel={handleCancel}>
          {authState === 'login' && <Login onClick={changeAuthState} />}
          {authState === 'signup' && <Signup onClick={changeAuthState} />}
        </Modal>

        <Drawer
          title='Menu'
          placement={'left'}
          width={300}
          onClose={onCloseMobileMenu}
          open={openMobileMenu}
        >
          <div className='mobile-nav'>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                onClick={() => handleDrawerNavigation(item.path)}
                className='mobile-nav__item'
              >
                {item.label}
              </Button>
            ))}
            
            {!isAuth && (
              <div className='mobile-nav__auth'>
                <Button onClick={signInHandler} className='mobile-nav__auth-btn'>
                  Sign in
                </Button>
                <Button onClick={signUpHandler} className='mobile-nav__auth-btn'>
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default Header;
