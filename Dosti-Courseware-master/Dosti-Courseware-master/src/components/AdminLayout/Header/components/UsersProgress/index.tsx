import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Space } from '../../../../antd';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { openCreateCourse } from '../../../../../pages/admin/Courses/course.slice';

const UsersProgressHeader: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Space>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => dispatch(openCreateCourse())}
        >
          Add Course
        </Button>
      </Space>
    </Fragment>
  );
};

export default UsersProgressHeader;
