import { PlusCircleOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Space } from 'antd';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { openCreateCourse } from '../../../../../pages/admin/Courses/course.slice';
const CoursesHeader = () => {
  const adminInfoItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          1st menu item
        </a>
      )
    },
    {
      key: '2',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
          2nd menu item
        </a>
      )
    },
    {
      key: 'logout',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
          Logout
        </a>
      )
    }
  ];

  const dispatch = useDispatch();

  const openCreateCourseHandler = () => {
    dispatch(openCreateCourse(true));
  };

  return (
    <Fragment>
      <Space>
        <h3 className='admin-header__page-title'>Courses</h3>

        <Button onClick={openCreateCourseHandler}>
          <PlusCircleOutlined />
          Create Course
        </Button>
        {/* <Button>
          <PlusCircleOutlined />
          Preview Hompage
        </Button>
        <Button>
          <PlusCircleOutlined />
          Preview Hompage after login
        </Button> */}
      </Space>
      <Space className='admin-header__notify'>
        {/* <Button>
          <BellOutlined />
          <span>What's new</span>
        </Button>
        <Button>
          <QuestionOutlined />
          <span>Help</span>
        </Button>
        <Dropdown menu={{ items: adminInfoItems }} placement='bottom' arrow>
          <Avatar style={{ backgroundColor: '#87d068', cursor: 'pointer' }} icon={<UserOutlined />} />
        </Dropdown> */}
      </Space>
    </Fragment>
  );
};

export default CoursesHeader;
