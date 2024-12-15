import React from 'react';
import { Button, Space, notification } from 'antd';
import { useDispatch } from 'react-redux';
import { closeNotification } from '../../pages/site/site.slice';
import { useAppSelector } from '../../hooks/useRedux';

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const { notification: notificationState } = useAppSelector((state) => state.site);

  if (!notificationState) return null;

  const handleClose = () => {
    dispatch(closeNotification());
  };

  return (
    <div className='notification'>
      <div className='notification-content'>
        <h3>{notificationState.title}</h3>
        <p>{notificationState.message}</p>
        <Space>
          <Button onClick={handleClose}>Close</Button>
          {notificationState.actions?.map((action, index) => (
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