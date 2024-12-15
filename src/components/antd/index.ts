import { Link } from 'react-router-dom';
import {
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
  type RadioChangeEvent
} from 'antd';
import { Line as LineProgress } from '@ant-design/charts';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, ColumnsType } from 'antd/es/table/interface';
import type { LineConfig } from '@ant-design/charts';

export type { TablePaginationConfig, FilterValue, ColumnsType, RadioChangeEvent };
export type LineProgressProps = LineConfig;

const { Header, Content, Footer, Sider } = Layout;
const { TextArea, Password } = Input;
const { Item: FormItem } = Form;
const { Option: SelectOption } = Select;

export {
  Layout,
  Header,
  Content,
  Footer,
  Sider,
  Menu,
  Button,
  Input,
  TextArea,
  Password,
  Form,
  FormItem,
  Select,
  SelectOption,
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
  LineProgress,
  Link
};