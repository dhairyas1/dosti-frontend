// Re-export everything we need from antd
export {
  Layout,
  Menu,
  Button,
  Input,
  Form,
  Select,
  Space,
  Table,
  Tag,
  Modal,
  Drawer,
  Row,
  Col,
  Badge,
  Avatar,
  Dropdown,
  Popover,
  Skeleton,
  Result,
  notification,
  Radio,
  Progress,
  theme,
  Descriptions,
  Tabs,
  Tooltip,
  InputNumber,
  Statistic,
  Pagination,
  Card,
  Checkbox,
  Spin,
  Divider,
  ConfigProvider
} from 'antd';

// Re-export types
export type {
  MenuProps,
  ButtonProps,
  InputProps,
  FormProps,
  FormItemProps,
  SelectProps,
  TableProps,
  TablePaginationConfig,
  ModalProps,
  DrawerProps,
  RowProps,
  ColProps,
  RadioChangeEvent,
  TabsProps,
  CardProps,
  CheckboxProps,
  SpinProps,
  NotificationArgsProps,
  DividerProps,
  TableColumnProps,
  TableColumnsType,
  TableColumnType,
  CheckboxChangeEvent,
  SizeType,
  ThemeConfig
} from 'antd';

// Re-export Layout components
export const { Header, Content, Footer, Sider } = Layout;

// Re-export Form components
export const { Item: FormItem, List: FormList } = Form;

// Re-export Input components
export const { TextArea, Password, Search } = Input;

// Re-export Select components
export const { Option: SelectOption } = Select;

// Define ButtonCmpProps interface that includes all necessary props
export interface ButtonCmpProps extends ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default';
  htmlType?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
}

// Define Section interface
export interface ISection {
  sectionId: string;
  courseId: string;
  name: string;
  lessons: any[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Define Order interfaces
export interface IOrder {
  orderId: string;
  userId: string;
  items: IOrderItem[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderItem {
  orderId: string;
  courseId: string;
  price: number;
  quantity: number;
} 