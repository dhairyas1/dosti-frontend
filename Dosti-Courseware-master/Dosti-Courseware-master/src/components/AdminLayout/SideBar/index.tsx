import {
  BarChartOutlined,
  BorderOuterOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { UserRole } from '../../../types/user.type';
import './SideBar.scss';

const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => ({
  key,
  icon,
  children,
  label,
  type
});

const SideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const adminRole = useSelector((state: RootState) => state.auth.adminRole);

  const navigateHandler: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const items: MenuItem[] = [
    getItem('My Profile', 'myprofile', <BorderOuterOutlined />),
    getItem('Dashboard', 'dashboard', <PieChartOutlined />),
    getItem('Categories', 'categories', <UnorderedListOutlined />),
    getItem('Courses', 'courses', <DesktopOutlined />),
    ...(adminRole === UserRole.ADMIN ? [
      getItem('Orders', 'orders', <ShoppingCartOutlined />),
      getItem('Users', 'users', <UserOutlined />, [
        getItem('All Users', 'users'),
        getItem('Admins', 'admins'),
        getItem('Instructors', 'instructors')
      ]),
      getItem('Reports Center', 'reports', <BarChartOutlined />, [
        getItem('User Analytics', 'user-analytics', null, [
          getItem('User Progress', 'reports/users-progress'),
          getItem('Course Insights', 'reports/course-insights')
        ]),
        getItem('Exams', 'exams', null, [
          getItem('Certifications', 'reports/certifications'),
          getItem('Review Center', 'reports/reviews-center')
        ]),
        getItem('Sales', 'sales', null, [
          getItem('Orders', 'reports/orders'),
          getItem('Courses Revenues', 'reports/courses-revenue'),
          getItem('Instructors Revenues', 'reports/instructors-revenue'),
          getItem('Cancelled Sales', 'reports/cancelled-sales')
        ])
      ])
    ] : []),
    getItem('Settings', 'settings', <SettingOutlined />),
    getItem('My Account', 'account', <UserAddOutlined />),
    getItem('Need Help?', 'help', <FileOutlined />)
  ].filter(Boolean) as MenuItem[];

  return (
    <Sider
      className='sidebar'
      style={{ backgroundColor: '#fff' }}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
    >
      <div className='demo-logo-vertical' />
      <Menu
        className='sidebar__menu'
        onClick={navigateHandler}
        theme='light'
        defaultSelectedKeys={['dashboard']}
        mode='inline'
        items={items}
      />
    </Sider>
  );
};

export default SideBar;
