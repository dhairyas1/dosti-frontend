import { Outlet } from 'react-router-dom';
import React, { Fragment } from 'react';
import './RootLayout.scss';
import { Layout } from '../antd';
import SideBar from './SideBar';
import AdminHeader from './Header';
import AdminDrawer from './Drawer';

const { Content, Footer } = Layout;

const RootAdminLayout: React.FC = () => {
  return (
    <Fragment>
      <Layout style={{ minHeight: '100vh' }} className='admin-layout'>
        <SideBar />
        <Layout>
          <AdminHeader />
          <Content style={{ margin: '0 16px' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center' }}>©2023 Created by Sang Tran Dev</Footer>
        </Layout>
      </Layout>
      <AdminDrawer />
    </Fragment>
  );
};

export default RootAdminLayout;
