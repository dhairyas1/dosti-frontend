import { Layout, theme } from 'antd';
import { useLocation } from 'react-router-dom';
import './Header.scss';
import CancelledSales from './components/CancelledSales';
import CategoriesHeader from './components/Categories';
import Certifications from './components/Certifications';
import CourseInsights from './components/CourseInsights';
import CoursesHeader from './components/CoursesHeader';
import DashboardHeader from './components/DashboardHeader';
import InstructorsRevenues from './components/InstructorsRevenues';
import OrdersHeader from './components/Orders';
import ReviewsCenter from './components/ReviewsCenter';
import UsersHeader from './components/UsersHeader';
import UsersProgressHeader from './components/UsersProgress';

const { Header } = Layout;

const AdminHeader = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  const location = useLocation();
  const path = location.pathname;

  return (
    <Header className='admin-header' style={{ padding: 0, background: colorBgContainer }}>
      {path === '/admin/dashboard' && <DashboardHeader />}
      {path === '/admin/categories' && <CategoriesHeader />}
      {path === '/admin/courses' && <CoursesHeader />}
      {path === '/admin/users' && <UsersHeader />}
      {path === '/admin/orders' && <OrdersHeader />}
      {path === '/admin/reports/users-progress' && <UsersProgressHeader />}
      {path === '/admin/reports/course-insights' && <CourseInsights />}
      {path === '/admin/reports/reviews-center' && <ReviewsCenter />}
      {path === '/admin/reports/certifications' && <Certifications />}
      {path === '/admin/reports/courses-revenue' && <Certifications />}
      {path === '/admin/reports/instructors-revenue' && <InstructorsRevenues />}
      {path === '/admin/reports/cancelled-sales' && <CancelledSales />}
    </Header>
  );
};

export default AdminHeader;
