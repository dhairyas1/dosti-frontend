import { BellOutlined, PlusCircleOutlined, QuestionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Button, Dropdown, Space, notification } from 'antd';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../../../../constant/backend-domain';
import { openCreateCourse } from '../../../../../pages/admin/Courses/course.slice';
import { useGetUserQuery } from '../../../../../pages/admin/Users/user.service';
import { useAdminLogoutMutation } from '../../../../../pages/auth.service';
import { setAdminUnauthenticated } from '../../../../../pages/auth.slice';
import { RootState } from '../../../../../store/store';

const DashboardHeader = () => {
  const adminId = useSelector((state: RootState) => state.auth.adminId);
  const [adminLogout] = useAdminLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isFetching } = useGetUserQuery(adminId, {
    skip: !adminId
  });

  let avatarThumbnailUrl = '';

  if (data?.user.avatar) {
    if (data?.user.avatar.startsWith('http')) {
      avatarThumbnailUrl = data?.user.avatar;
    } else {
      avatarThumbnailUrl = `${BACKEND_URL}/${data?.user.avatar}`;
    }
  }

  const adminLogoutHandler = () => {
    adminLogout()
      .unwrap()
      .then((result) => {
        notification.success({
          message: result.message
        });
        navigate('/');
        dispatch(setAdminUnauthenticated());
      })
      .catch((error) => {
        console.error('Logout error:', error);
        notification.error({
          message: 'Logout failed',
          description: 'Please try again'
        });
      });
  };

  const adminInfoItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: (
        <span>
          {data?.user.name || 'Admin'}
        </span>
      )
    },
    {
      key: 'settings',
      label: (
        <span>Settings</span>
      )
    },
    {
      key: 'logout',
      label: <span onClick={adminLogoutHandler}>Logout</span>
    }
  ];

  const openCreateCourseHandler = () => {
    dispatch(openCreateCourse(true));
  };

  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>Dashboard</h3>
        <Button onClick={openCreateCourseHandler}>
          <PlusCircleOutlined />
          Create Course
        </Button>
        <Button onClick={() => navigate('/course-home')}>
          <PlusCircleOutlined />
          View Course Home
        </Button>
      </Space>
      <Space className='admin-header__notify'>
        <Button>
          <BellOutlined />
          <span>What's new</span>
        </Button>
        <Button>
          <QuestionOutlined />
          <span>Help</span>
        </Button>
        <Dropdown menu={{ items: adminInfoItems }} placement='bottom' arrow>
          <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} src={avatarThumbnailUrl} />
        </Dropdown>
      </Space>
    </Fragment>
  );
};

export default DashboardHeader;
