import React from 'react';
import { Menu } from '../../../components/antd';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  FileOutlined
} from '@ant-design/icons';
import './SideBar.scss';

const SideBar: React.FC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<DashboardOutlined />}>
        <Link to="/admin/dashboard">Dashboard</Link>
      </Menu.Item>

      <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="User Management">
        <Menu.Item key="2">
          <Link to="/admin/users">Users List</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/admin/users/add">Add User</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="sub2" icon={<BookOutlined />} title="Course Management">
        <Menu.Item key="4">
          <Link to="/admin/courses">Courses List</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="sub3" icon={<FileOutlined />} title="Content Management">
        <Menu.Item key="6">
          <Link to="/admin/categories">Categories</Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="/admin/sections">Sections</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default SideBar;
