import React from 'react';
import { notification, type NotificationArgsProps, Space, Button } from '../antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  type: NotificationType;
  message: string;
  description?: string;
}

export const openNotification = ({ type, message, description = '' }: NotificationProps) => {
  const args: NotificationArgsProps = {
    message,
    description,
    duration: 3,
  };

  notification[type](args);
};

const Notification: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    const key = `openNotify`;
    const btn = (
      <Space>
        <Button type='link' size='small' onClick={() => api.destroy()}>
          Destroy All
        </Button>
        <Button type='primary' size='small' onClick={() => api.destroy(key)}>
          Confirm
        </Button>
      </Space>
    );
    api.open({
      message: 'Notification Title',
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key
    });
  };

  return (
    <>
      {contextHolder}
      <Button type='primary' onClick={openNotification}>
        Open the notification box
      </Button>
    </>
  );
};

export default Notification;
