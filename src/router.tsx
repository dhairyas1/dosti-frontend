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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootSiteLayout />,
    errorElement: <ErrorPage />,
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
        path: 'course_1',
        element: <Course1 />,
        errorElement: <ErrorPage />
      },
      {
        path: 'course_2.html',
        element: <CourseDetail />,
        errorElement: <ErrorPage />
      },
      {
        path: 'course_3.html',
        element: <CourseDetail />,
        errorElement: <ErrorPage />
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
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
});

export default router;
