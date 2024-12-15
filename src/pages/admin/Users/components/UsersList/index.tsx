import React from 'react';
import { Table, Space, Button } from '../../../../../components/antd';
import { IUser } from '../../../../../types/user.type';

interface UsersListProps {
  users: IUser[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: IUser) => (
        <Space>
          <Button onClick={() => console.log('Edit', record)}>Edit</Button>
          <Button onClick={() => console.log('Delete', record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};

export default UsersList; 