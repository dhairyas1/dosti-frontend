import { Navigate, createBrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import RootSiteLayout from './components/layout/RootLayout';
import ErrorPage from './pages/Error/404Error';
import About from './pages/site/About';
import AuthorProfile from './pages/site/AuthorProfile';
import Checkout from './pages/site/Checkout';
import Contact from './pages/site/Contact';
import CourseDetail from './pages/site/CourseDetail';
import CourseHome from './pages/site/CourseHome/index';
import HomePage from './pages/site/Home';
import OrderCompleted from './pages/site/OrderCompleted';
import Profile from './pages/site/Profile';
import StartLearning from './pages/site/StartLearning';
import ViewCart from './pages/site/ViewCart';
import Course1 from './pages/site/Course1';

// Create a wrapper component to handle auth state
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  return isAuth ? <>{children}</> : <Navigate to="/" />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootSiteLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/course-home',
        element: <ProtectedRoute><CourseHome /></ProtectedRoute>,
      },
      {
        path: '/course_1',
        element: <ProtectedRoute><Course1 /></ProtectedRoute>,
      },
      {
        path: '/about-us',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/profile',
        element: <ProtectedRoute><Profile /></ProtectedRoute>,
      },
      {
        path: '/author-profile',
        element: <AuthorProfile />,
      },
      {
        path: '/course-detail',
        element: <CourseDetail />,
      },
      {
        path: '/view-cart',
        element: <ViewCart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/order-completed',
        element: <OrderCompleted />,
      },
      {
        path: '/start-learning',
        element: <StartLearning />,
      },
    ],
  },
]);

export default router;
