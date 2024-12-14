import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './assets/sass/_base.scss';
import './assets/sass/reset.css';
import './assets/sass/tailwind.css';
import InstructorsRevenues from './components/AdminLayout/Header/components/InstructorsRevenues';
import RootAdminLayout from './components/AdminLayout/RootLayout';
import BigSpinner from './components/BigSpinner';
import RootLayout from './components/layout/RootLayout';
import ErrorPage from './pages/Error/404Error';
import AdminAuth from './pages/admin/Auth';
import Categories from './pages/admin/Categories';
import CoursesList from './pages/admin/Courses/Courses';
import AdminCourseDetail from './pages/admin/Courses/components/CourseDetail';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import ReportsCenter from './pages/admin/Reports';
import CancelledSales from './pages/admin/Reports/components/CancelledSales';
import Certifications from './pages/admin/Reports/components/Certifications';
import CourseInsights from './pages/admin/Reports/components/CourseInsights';
import CourseHome from './pages/CourseHome';
import CoursesRevenue from './pages/admin/Reports/components/CoursesReveneue';
import InstructorsRevene from './pages/admin/Reports/components/InstructorsRevenue';
import ReviewsCenter from './pages/admin/Reports/components/ReviewsCenter';
import UsersProgress from './pages/admin/Reports/components/UsersProgress';
import UsersSegment from './pages/admin/Reports/components/UsersSegments';
import Settings from './pages/admin/Settings';
import Users from './pages/admin/Users';
import {
  setAdminAuthenticated,
  setAdminUnauthenticated,
  setAuthenticated,
  setUnauthenticated
} from './pages/auth.slice';
import About from './pages/site/About';
import AuthorProfile from './pages/site/AuthorProfile';
import Contact from './pages/site/Contact';
import CourseDetail from './pages/site/CourseDetail';
import SiteCourses from './pages/site/Courses';
import HomePage from './pages/site/Home';
import OrderCompleted from './pages/site/OrderCompleted';
import PathPlayer from './pages/site/PathPlayer';
import StartLearning from './pages/site/StartLearning';
import SubsribeCourse from './pages/site/SubscribeCourse';
import { RootState } from './store/store';
import { UserRole } from './types/user.type';

interface DecodedToken {
  exp: number;
  iat: number;
  userId: string;
  email: string;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if the token is stored in local storage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the token to check for expiration and other details
        const decodedToken = jwtDecode<DecodedToken>(token);
        const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

        // Check if the token has not expired
        if (Date.now() < expirationTime) {
          // Token is valid, dispatch action to set authentication state
          dispatch(setAuthenticated(token));
        } else {
          // Token has expired, handle accordingly
          console.log('Token has expired. Please log in again.');
          localStorage.removeItem('token');
          dispatch(setUnauthenticated());
        }
      } catch (error) {
        // Invalid token
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        dispatch(setUnauthenticated());
      }
    }
  }, [dispatch]);

  useEffect(() => {
    // Check if the adminToken is stored in local storage
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      try {
        // Decode the token to check for expiration and other details
        const decodedToken = jwtDecode<DecodedToken>(adminToken);
        const expirationTime = decodedToken.exp * 1000; // Expiration time in milliseconds

        // Check if the token has not expired
        if (Date.now() < expirationTime) {
          // Token is valid, dispatch action to set authentication state
          dispatch(setAdminAuthenticated(adminToken));
        } else {
          // Token has expired, handle accordingly
          console.log('Admin Token has expired. Please log in again.');
          localStorage.removeItem('adminToken');
          dispatch(setAdminUnauthenticated());
        }
      } catch (error) {
        // Invalid token
        console.error('Invalid admin token:', error);
        localStorage.removeItem('adminToken');
        dispatch(setAdminUnauthenticated());
      }
    }
  }, [dispatch]);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const isAdminAuth = useSelector((state: RootState) => state.auth.isAdminAuth);
  const adminRole = useSelector((state: RootState) => state.auth.adminRole);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />
        },
        {
          path: 'course-home',
          element: <CourseHome />
        },
        {
          path: '/courses',
          children: [
            {
              index: true,
              element: <SiteCourses />
            },
            {
              path: ':courseId',
              element: <CourseDetail />
            }
          ]
        },
        {
          path: 'start',
          element: isAuth ? <StartLearning /> : <ErrorPage page='/' />
        },
        {
          path: 'order-completed',
          element: isAuth ? <OrderCompleted /> : <ErrorPage page='/' />
        },
        {
          path: 'contact',
          element: <Contact />
        },
        {
          path: 'about-us',
          element: <About />
        },
        {
          path: 'user',
          children: [
            {
              path: ':userId',
              element: <AuthorProfile />
            }
          ]
        }
      ],
      errorElement: <ErrorPage page='/author' />
    },
    {
      path: '/author',
      element: isAdminAuth ? <RootAdminLayout /> : <ErrorPage page='/author-login' />,
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'courses',
          children: [
            {
              index: true,
              element: <CoursesList />
            },
            {
              path: ':courseId',
              element: <AdminCourseDetail />
            }
          ]
        },
        {
          path: 'users',
          children: [
            {
              index: true,
              element: adminRole === UserRole.ADMIN ? <Users /> : <Navigate to='/error' />
            }
          ]
        },
        {
          path: 'orders',
          children: [
            {
              index: true,
              element: adminRole === UserRole.ADMIN ? <Orders /> : <Navigate to='/error' />
            }
          ]
        },
        {
          path: 'categories',
          children: [
            {
              index: true,
              element: <Categories />
            }
          ]
        },
        {
          path: 'reports',
          children:
            adminRole === UserRole.ADMIN
              ? [
                  {
                    index: true,
                    element: <ReportsCenter />
                  },
                  {
                    path: 'users-progress',
                    element: <UsersProgress />
                  },
                  {
                    path: 'users-segment',
                    element: <UsersSegment />
                  },
                  {
                    path: 'course-insights',
                    element: <CourseInsights />
                  },
                  {
                    path: 'courses-revenue',
                    element: <CoursesRevenue />
                  },
                  {
                    path: 'instructors-revenue',
                    element: <InstructorsRevene />
                  },
                  {
                    path: 'cancelled-sales',
                    element: <CancelledSales />
                  },
                  {
                    path: 'instructors-revenues',
                    element: <InstructorsRevenues />
                  },
                  {
                    path: 'certifications',
                    element: <Certifications />
                  },
                  {
                    path: 'reviews-center',
                    element: <ReviewsCenter />
                  }
                ]
              : []
        },
        {
          path: 'settings',
          element: <Settings />
        }
      ],
      errorElement: <div>Admin Error</div>
    },
    {
      path: 'path-player',
      element: isAuth ? <PathPlayer /> : <ErrorPage page='/' />
    },
    {
      path: 'author-login',
      element: <AdminAuth />
    }
  ]);

  return <RouterProvider router={router} fallbackElement={<BigSpinner />} />;
}

export default App;
