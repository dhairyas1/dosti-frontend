import { Link } from 'react-router-dom';
import type { TableProps } from 'antd';
import type { FilterValue, ColumnsType } from 'antd/es/table/interface';
import type { RadioChangeEvent } from 'antd/es/radio/interface';
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
  Pagination
} from 'antd';
import { Line as LineProgress } from '@ant-design/plots';
import type { LineConfig } from '@ant-design/plots';

export type TablePaginationConfig = TableProps<any>['pagination'];
export type { FilterValue, ColumnsType, RadioChangeEvent };
export type LineProgressProps = LineConfig & {
  style?: React.CSSProperties;
};

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