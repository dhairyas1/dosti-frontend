import React from 'react';
import {
  Avatar as AntAvatar,
  Badge as AntBadge,
  Button as AntButton,
  Card as AntCard,
  Checkbox as AntCheckbox,
  Col as AntCol,
  Collapse as AntCollapse,
  DatePicker as AntDatePicker,
  Descriptions as AntDescriptions,
  Drawer as AntDrawer,
  Dropdown as AntDropdown,
  Form as AntForm,
  Input as AntInput,
  Layout as AntLayout,
  List as AntList,
  Menu as AntMenu,
  Modal as AntModal,
  Popover as AntPopover,
  Progress as AntProgress,
  Radio as AntRadio,
  Result as AntResult,
  Row as AntRow,
  Select as AntSelect,
  Skeleton as AntSkeleton,
  Space as AntSpace,
  Spin as AntSpin,
  Table as AntTable,
  Tabs as AntTabs,
  Tag as AntTag,
  Timeline as AntTimeline,
  Typography as AntTypography,
  notification as antNotification,
  theme as antTheme,
  type AvatarProps,
  type BadgeProps,
  type ButtonProps,
  type CardProps,
  type CheckboxProps,
  type ColProps as AntColProps,
  type CollapseProps,
  type DatePickerProps,
  type DescriptionsProps,
  type DrawerProps,
  type DropdownProps,
  type FormInstance,
  type FormProps,
  type InputProps,
  type LayoutProps,
  type ListProps,
  type MenuProps,
  type ModalProps,
  type NotificationArgsProps,
  type PopoverProps,
  type ProgressProps,
  type RadioProps,
  type ResultProps,
  type RowProps as AntRowProps,
  type SelectProps,
  type SkeletonProps,
  type SpaceProps,
  type SpinProps,
  type TableProps,
  type TabsProps,
  type TagProps,
  type TimelineProps,
  type TypographyProps
} from 'antd';

const { Header, Content, Footer, Sider } = AntLayout;
const { TextArea, Password } = AntInput;
const { Item: FormItem } = AntForm;
const { Option: SelectOption } = AntSelect;
const { Group: RadioGroup } = AntRadio;
const { Group: CheckboxGroup } = AntCheckbox;
const { Title, Text, Link } = AntTypography;

// Extended Row props interface
export interface RowProps extends AntRowProps {
  children?: React.ReactNode;
}

// Extended Col props interface
export interface ColProps extends AntColProps {
  children?: React.ReactNode;
}

// Row component with proper typing
const Row: React.FC<RowProps> = (props) => {
  return <AntRow {...props}>{props.children}</AntRow>;
};

// Col component with proper typing
const Col: React.FC<ColProps> = (props) => {
  return <AntCol {...props}>{props.children}</AntCol>;
};

// Export components
export const Avatar = AntAvatar;
export const Badge = AntBadge;
export const Button = AntButton;
export const Card = AntCard;
export const Checkbox = AntCheckbox;
export { Col };
export const Collapse = AntCollapse;
export const DatePicker = AntDatePicker;
export const Descriptions = AntDescriptions;
export const Drawer = AntDrawer;
export const Dropdown = AntDropdown;
export const Form = AntForm;
export const Input = AntInput;
export const Layout = AntLayout;
export const List = AntList;
export const Menu = AntMenu;
export const Modal = AntModal;
export const Popover = AntPopover;
export const Progress = AntProgress;
export const Radio = AntRadio;
export const Result = AntResult;
export { Row };
export const Select = AntSelect;
export const Skeleton = AntSkeleton;
export const Space = AntSpace;
export const Spin = AntSpin;
export const Table = AntTable;
export const Tabs = AntTabs;
export const Tag = AntTag;
export const Timeline = AntTimeline;
export const Typography = AntTypography;
export const notification = antNotification;
export const theme = antTheme;

// Export subcomponents
export {
  Header,
  Content, 
  Footer,
  Sider,
  TextArea,
  Password,
  FormItem,
  SelectOption,
  RadioGroup,
  CheckboxGroup,
  Title,
  Text,
  Link
};

// Export types
export type {
  AvatarProps,
  BadgeProps,
  ButtonProps,
  CardProps,
  CheckboxProps,
  ColProps,
  CollapseProps,
  DatePickerProps,
  DescriptionsProps,
  DrawerProps,
  DropdownProps,
  FormInstance,
  FormProps,
  InputProps,
  LayoutProps,
  ListProps,
  MenuProps,
  ModalProps,
  NotificationArgsProps,
  PopoverProps,
  ProgressProps,
  RadioProps,
  ResultProps,
  RowProps,
  SelectProps,
  SkeletonProps,
  SpaceProps,
  SpinProps,
  TableProps,
  TabsProps,
  TagProps,
  TimelineProps,
  TypographyProps
}; 