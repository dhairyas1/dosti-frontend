import React from 'react';
import { Space, Button } from '../antd';
import { useDispatch } from 'react-redux';
import { closeNotification } from '../../pages/site/site.slice';
import { useAppSelector } from '../../hooks/useRedux';

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const { notification } = useAppSelector((state) => state.site);

  if (!notification) return null;

  const handleClose = () => {
    dispatch(closeNotification());
  };

  return (
    <div className='notification'>
      <div className='notification-content'>
        <h3>{notification.title}</h3>
        <p>{notification.message}</p>
        <Space>
          <Button onClick={handleClose}>Close</Button>
          {notification.actions?.map((action, index) => (
            <Button
              key={index}
              onClick={() => {
                action.onClick();
                handleClose();
              }}
            >
              {action.text}
            </Button>
          ))}
        </Space>
      </div>
    </div>
  );
};

export default Notification; 