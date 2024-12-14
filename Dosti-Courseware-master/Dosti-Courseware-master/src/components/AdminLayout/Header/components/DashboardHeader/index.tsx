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
    avatarThumbnailUrl = data.user.avatar.startsWith('http') 
      ? data.user.avatar 
      : `${BACKEND_URL}/${data.user.avatar}`;
  }

  const adminLogoutHandler = async () => {
    try {
      const result = await adminLogout().unwrap();
      notification.success({
        message: result.message
      });
      navigate('/author-login');
      dispatch(setAdminUnauthenticated());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: data?.user.name || 'Admin Author Name'
    },
    {
      key: '2',
      label: 'Settings'
    },
    {
      key: 'logout',
      label: 'Logout',
      onClick: adminLogoutHandler
    }
  ];

  const openCreateCourseHandler = () => {
    dispatch(openCreateCourse(true));
  };

  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>Dashboard</h3>
        <Button type="primary" onClick={openCreateCourseHandler} icon={<PlusCircleOutlined />}>
          Create Course
        </Button>
        <Button icon={<PlusCircleOutlined />}>
          Preview Homepage
        </Button>
        <Button icon={<PlusCircleOutlined />}>
          Preview Homepage after login
        </Button>
      </Space>
      <Space className='admin-header__notify'>
        <Button icon={<BellOutlined />}>
          What's new
        </Button>
        <Button icon={<QuestionOutlined />}>
          Help
        </Button>
        <Dropdown menu={{ items }} placement='bottom' arrow>
          <Avatar 
            style={{ backgroundColor: '#87d068', cursor: 'pointer' }} 
            src={avatarThumbnailUrl} 
          />
        </Dropdown>
      </Space>
    </Fragment>
  );
};

export default DashboardHeader;
