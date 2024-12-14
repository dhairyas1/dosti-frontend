import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import UsersList from './components/UsersList';
import AddUser from './components/AddUser';
import UserDetail from './components/UserDetail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { IUser } from '../../../types/user.type';

const Users: React.FC = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const showAddUser = () => {
    setIsAddUserOpen(true);
  };

  const closeAddUser = () => {
    setIsAddUserOpen(false);
  };

  const showUserDetail = (user: IUser) => {
    setSelectedUser(user);
    setIsUserDetailOpen(true);
  };

  const closeUserDetail = () => {
    setSelectedUser(null);
    setIsUserDetailOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className='users'>
      <div className='users__wrap'>
        <div className='users__header'>
          <Space size="large">
            <Input
              placeholder="Search users"
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 200 }}
            />
            <Button 
              type='primary' 
              icon={<PlusOutlined />} 
              onClick={showAddUser}
            >
              Add User
            </Button>
          </Space>
        </div>
        <div className='users__content'>
          <UsersList 
            onEditUser={showUserDetail} 
            searchValue={searchValue} 
          />
        </div>
      </div>
      {isAddUserOpen && <AddUser onClose={closeAddUser} />}
      {isUserDetailOpen && selectedUser && (
        <UserDetail 
          user={selectedUser} 
          onClose={closeUserDetail} 
        />
      )}
    </div>
  );
};

export default Users;
