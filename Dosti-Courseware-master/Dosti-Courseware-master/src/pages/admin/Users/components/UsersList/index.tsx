import { Avatar, Button, Popover, Skeleton, Space, Table, Tag, Tooltip, notification, type TableProps } from '../../../../../../components/antd';
import type { ColumnsType } from 'antd/es/table';
import React, { Fragment } from 'react';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useDeleteUserMutation, useGetUsersQuery } from '../../user.service';
import { IUser } from '../../../../../types/user.type';
import './UsersList.scss';

interface UserListProps {
  onEditUser: (user: IUser) => void;
  searchValue: string;
}

interface DataUserType {
  key: string;
  user: IUser;
  name: JSX.Element;
  lastLogin: string;
  createdAt: string;
  courses: JSX.Element;
  tags: JSX.Element;
  actions: JSX.Element;
}

const UsersList: React.FC<UserListProps> = ({ onEditUser, searchValue }) => {
  const [deleteUser] = useDeleteUserMutation();
  const { data: usersData, isFetching } = useGetUsersQuery({ _q: searchValue });

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      notification.success({
        message: 'Success',
        description: 'User deleted successfully'
      });
    } catch (error: any) {
      notification.error({
        message: 'Error',
        description: error.data?.message || 'Failed to delete user'
      });
    }
  };

  const columns: TableProps<DataUserType>['columns'] = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      width: '30%'
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin'
    },
    {
      title: 'Registered',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      key: 'courses'
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions'
    }
  ];

  const userData: DataUserType[] = usersData?.users.map((user: IUser) => ({
    key: user._id,
    user,
    name: (
      <div className='user-info'>
        <img 
          alt={user.name} 
          src={user.avatar} 
          className='user-info__avatar' 
        />
        <div className='user-info__content'>
          <div className='user-info__name'>{user.name}</div>
          <div className='user-info__email'>{user.email}</div>
        </div>
      </div>
    ),
    lastLogin: user.lastLogin || 'Never',
    createdAt: user.createdAt || 'Unknown',
    courses: (
      <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
        {Array.isArray(user.courses) && user.courses.map((course) => (
          <Avatar key={typeof course === 'string' ? course : course._id} />
        ))}
        <Tooltip title='Courses' placement='top'>
          <span>{user.courses?.length || 0} courses</span>
        </Tooltip>
      </Avatar.Group>
    ),
    tags: (
      <Space>
        <Tag color='blue'>{user.role}</Tag>
      </Space>
    ),
    actions: (
      <Space>
        <Button onClick={() => onEditUser(user)}>
          <EditOutlined />
        </Button>
        <Popover 
          placement='bottomRight' 
          content={
            <Button danger onClick={() => handleDeleteUser(user._id)}>
              Delete
            </Button>
          } 
          title='Actions'
          trigger='click'
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Popover>
      </Space>
    )
  })) || [];

  if (isFetching) {
    return <Skeleton active />;
  }

  const pagination = {
    total: usersData?.pagination?._totalRows || 0,
    pageSize: usersData?.pagination?._limit || 10,
    current: usersData?.pagination?._page || 1,
    showSizeChanger: true,
    showTotal: (total: number) => `Total ${total} users`
  };

  return (
    <div className='users-list'>
      <Table 
        columns={columns} 
        dataSource={userData}
        pagination={pagination}
      />
    </div>
  );
};

export default UsersList;
