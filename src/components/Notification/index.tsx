import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';

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