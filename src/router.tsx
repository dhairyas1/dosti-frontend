import { Navigate, createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import InstructorsRevenues from './components/AdminLayout/Header/components/InstructorsRevenues';
import RootAdminLayout from './components/AdminLayout/RootLayout';
import RootSiteLayout from './components/layout/RootLayout';
import ErrorPage from './pages/Error/404Error';
import AdminAuth from './pages/admin/Auth';
import Categories from './pages/admin/Categories';
import CoursesList from './pages/admin/Courses/components/CoursesList';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import CancelledSales from './pages/admin/Reports/components/CancelledSales';
import Certifications from './pages/admin/Reports/components/Certifications';
import CourseInsights from './pages/admin/Reports/components/CourseInsights';
import CoursesRevenues from './pages/admin/Reports/components/CoursesReveneue';
import InstructorsRevene from './pages/admin/Reports/components/InstructorsRevenue';
import ReviewsCenter from './pages/admin/Reports/components/ReviewsCenter';
import UsersProgress from './pages/admin/Reports/components/UsersProgress';
import UsersSegment from './pages/admin/Reports/components/UsersSegments';
import Settings from './pages/admin/Settings';
import Users from './pages/admin/Users';
import About from './pages/site/About';
import AuthorProfile from './pages/site/AuthorProfile';
import Checkout from './pages/site/Checkout';
import Contact from './pages/site/Contact';
import CourseDetail from './pages/site/CourseDetail';
import SiteCourses from './pages/site/Courses';
import HomePage from './pages/site/Home';
import OrderCompleted from './pages/site/OrderCompleted';
import PathPlayer from './pages/site/PathPlayer';
import Profile from './pages/site/Profile';
import StartLearning from './pages/site/StartLearning';
import SubsribeCourse from './pages/site/SubscribeCourse';
import ViewCart from './pages/site/ViewCart';
import { UserRole } from './types/user.type';

// Create a wrapper component to handle auth state
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return isAuth ? <>{children}</> : <Navigate to="/" />;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootSiteLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
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
        element: <ProtectedRoute><StartLearning /></ProtectedRoute>
      },
      {
        path: 'profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
      {
        path: 'view-cart',
        element: <ViewCart />
      },
      {
        path: 'checkout',
        element: <ProtectedRoute><Checkout /></ProtectedRoute>
      },
      {
        path: 'order-completed',
        element: <ProtectedRoute><OrderCompleted /></ProtectedRoute>
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
    ]
  }
]);

export default router;
