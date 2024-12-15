import React from 'react';
import './UsersList.scss';

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface UsersListProps {
  users: IUser[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <div className="users-list">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <div className="button-group">
                  <button 
                    className="btn btn-secondary"
                    onClick={() => console.log('Edit', user)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => console.log('Delete', user)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList; 