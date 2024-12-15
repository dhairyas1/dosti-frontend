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
  Divider
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
  DividerProps
} from 'antd';

// Re-export Layout components
export const { Header, Content, Footer, Sider } = Layout;

// Re-export Form components
export const { Item: FormItem } = Form;

// Re-export Input components
export const { TextArea, Password } = Input;

// Re-export Select components
export const { Option: SelectOption } = Select; 