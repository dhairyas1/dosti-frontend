import { NotificationArgsProps } from '../types';

export const notification = {
  success: ({ message, description, duration = 4.5, placement = 'topRight' }: NotificationArgsProps) => {
    alert(`Success: ${message}\n${description || ''}`);
  },
  error: ({ message, description, duration = 4.5, placement = 'topRight' }: NotificationArgsProps) => {
    alert(`Error: ${message}\n${description || ''}`);
  },
  warning: ({ message, description, duration = 4.5, placement = 'topRight' }: NotificationArgsProps) => {
    alert(`Warning: ${message}\n${description || ''}`);
  },
  info: ({ message, description, duration = 4.5, placement = 'topRight' }: NotificationArgsProps) => {
    alert(`Info: ${message}\n${description || ''}`);
  }
}; 