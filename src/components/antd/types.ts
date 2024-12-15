import React from 'react';

export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'link';
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface NotificationArgsProps {
  message: string;
  description?: string;
  duration?: number;
  placement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

export interface MenuProps {
  items?: Array<{
    key: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
    children?: MenuProps['items'];
  }>;
  mode?: 'horizontal' | 'vertical';
  selectedKeys?: string[];
  onClick?: (info: { key: string }) => void;
}

export interface TabsProps {
  items?: Array<{
    key: string;
    label: React.ReactNode;
    children: React.ReactNode;
  }>;
  activeKey?: string;
  onChange?: (key: string) => void;
}

export interface ColProps {
  span?: number;
  xs?: number | { span: number; offset: number };
  sm?: number | { span: number; offset: number };
  md?: number | { span: number; offset: number };
  lg?: number | { span: number; offset: number };
  xl?: number | { span: number; offset: number };
  children?: React.ReactNode;
}

export interface RowProps {
  gutter?: number | [number, number];
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  align?: 'top' | 'middle' | 'bottom';
  children?: React.ReactNode;
}

export interface CardProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  hoverable?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
  children?: React.ReactNode;
}

export interface SpinProps {
  spinning?: boolean;
  size?: 'small' | 'default' | 'large';
  tip?: string;
  children?: React.ReactNode;
}

export interface TableProps<T> {
  pagination?: TablePaginationConfig;
  onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T>) => void;
  dataSource?: T[];
  columns?: ColumnsType<T>;
}

export interface TablePaginationConfig {
  current?: number;
  pageSize?: number;
  total?: number;
}

export type FilterValue = string | number | boolean | null;

export type SorterResult<T> = {
  column?: ColumnsType<T>[number];
  order?: 'ascend' | 'descend' | null;
  field?: string | string[];
  columnKey?: string;
};

export type ColumnsType<T> = Array<{
  title: string;
  dataIndex?: string;
  key?: string;
  width?: string | number;
  render?: (value: any, record: T) => React.ReactNode;
}>;

export interface FormProps {
  onFinish?: (values: any) => void;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
  className?: string;
}

export interface FormItemProps {
  label?: string;
  name?: string;
  rules?: Array<{
    required?: boolean;
    message?: string;
  }>;
  children?: React.ReactNode;
  className?: string;
}

export interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  name?: string;
}

export interface SelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  className?: string;
}

export interface SpaceProps {
  size?: 'small' | 'middle' | 'large';
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  children?: React.ReactNode;
  className?: string;
}

export interface DividerProps {
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  children?: React.ReactNode;
  className?: string;
}

export interface TagProps {
  color?: string;
  closable?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export interface ModalProps {
  title?: React.ReactNode;
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  footer?: React.ReactNode;
  width?: number | string;
  children?: React.ReactNode;
  className?: string;
} 