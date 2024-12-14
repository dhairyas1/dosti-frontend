import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../antd';
import './Drawer.scss';

const AdminDrawer: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className='admin-drawer'>
      <div className='admin-drawer__content'>
        {/* Other drawer content */}
      </div>
    </div>
  );
};

export default AdminDrawer;
