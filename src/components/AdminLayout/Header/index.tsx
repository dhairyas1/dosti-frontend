import { Layout, theme } from '../../antd';
import type { MenuProps } from 'antd';
import { Avatar, Badge, Drawer, Dropdown, Modal, Space, notification } from '../../antd';
import type { NotificationInstance } from 'antd/es/notification/interface';

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, setCollapsed }) => {
  const { Header } = Layout;
  const { token } = theme.useToken();

  return (
    <Header style={{ padding: 0, background: token.colorBgContainer }}>
      {/* Add your header content here */}
    </Header>
  );
};

export default Header; 