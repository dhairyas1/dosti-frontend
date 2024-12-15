import React from 'react';
import './styles.scss';

// Types
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
}

export interface RowProps {
  gutter?: number | [number, number];
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  align?: 'top' | 'middle' | 'bottom';
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

export type TableProps<T> = {
  pagination?: TablePaginationConfig;
  onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<T>) => void;
  dataSource?: T[];
  columns?: ColumnsType<T>;
};

export type TablePaginationConfig = {
  current?: number;
  pageSize?: number;
  total?: number;
};

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

// Components
export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  type = 'primary', 
  htmlType = 'button', 
  className = '', 
  disabled = false, 
  loading = false 
}) => (
  <button 
    className={`btn btn-${type} ${loading ? 'loading' : ''} ${className}`}
    onClick={onClick}
    type={htmlType}
    disabled={disabled || loading}
  >
    {loading ? 'Loading...' : children}
  </button>
);

export const Card: React.FC<CardProps> = ({ 
  title, 
  extra, 
  children, 
  bordered = true, 
  hoverable = false, 
  loading = false,
  className = '' 
}) => (
  <div className={`card ${bordered ? 'card--bordered' : ''} ${hoverable ? 'card--hoverable' : ''} ${loading ? 'card--loading' : ''} ${className}`}>
    {(title || extra) && (
      <div className="card__header">
        {title && <div className="card__title">{title}</div>}
        {extra && <div className="card__extra">{extra}</div>}
      </div>
    )}
    <div className="card__body">
      {loading ? (
        <Spin />
      ) : children}
    </div>
  </div>
);

export const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  defaultChecked, 
  disabled, 
  onChange, 
  children 
}) => (
  <label className={`checkbox ${disabled ? 'checkbox--disabled' : ''}`}>
    <input
      type="checkbox"
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={e => onChange?.({ target: { checked: e.target.checked } })}
    />
    <span className="checkbox__checkmark"></span>
    {children && <span className="checkbox__label">{children}</span>}
  </label>
);

export const Spin: React.FC<SpinProps> = ({ 
  spinning = true, 
  size = 'default', 
  tip, 
  children 
}) => (
  <div className={`spin ${spinning ? 'spin--active' : ''} spin--${size}`}>
    <div className="spin__indicator"></div>
    {tip && <div className="spin__tip">{tip}</div>}
    {children && (
      <div className={`spin__container ${spinning ? 'spin__container--blur' : ''}`}>
        {children}
      </div>
    )}
  </div>
);

export const Menu: React.FC<MenuProps> = ({ 
  items = [], 
  mode = 'horizontal', 
  selectedKeys = [], 
  onClick 
}) => (
  <ul className={`menu menu--${mode}`}>
    {items.map(item => (
      <li
        key={item.key}
        className={`menu__item ${selectedKeys.includes(item.key) ? 'menu__item--selected' : ''}`}
        onClick={() => onClick?.({ key: item.key })}
      >
        {item.icon && <span className="menu__item-icon">{item.icon}</span>}
        <span className="menu__item-label">{item.label}</span>
      </li>
    ))}
  </ul>
);

export const Row: React.FC<RowProps & { children: React.ReactNode }> = ({ 
  children, 
  gutter = 0, 
  justify = 'start', 
  align = 'top' 
}) => {
  const margin = typeof gutter === 'number' ? gutter : gutter[0];
  return (
    <div 
      className={`row row--justify-${justify} row--align-${align}`} 
      style={{ margin: `-${margin/2}px` }}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            style: { padding: `${margin/2}px` }
          });
        }
        return child;
      })}
    </div>
  );
};

export const Col: React.FC<ColProps & { children: React.ReactNode }> = ({ 
  children, 
  span = 24, 
  xs, 
  sm, 
  md, 
  lg, 
  xl 
}) => (
  <div className={`
    col 
    col-${span} 
    ${xs ? `col-xs-${typeof xs === 'number' ? xs : xs.span}` : ''} 
    ${sm ? `col-sm-${typeof sm === 'number' ? sm : sm.span}` : ''} 
    ${md ? `col-md-${typeof md === 'number' ? md : md.span}` : ''} 
    ${lg ? `col-lg-${typeof lg === 'number' ? lg : lg.span}` : ''} 
    ${xl ? `col-xl-${typeof xl === 'number' ? xl : xl.span}` : ''}
  `}>
    {children}
  </div>
);

export const Tabs: React.FC<TabsProps> = ({ 
  items = [], 
  activeKey, 
  onChange 
}) => (
  <div className="tabs">
    <div className="tabs__nav">
      {items.map(item => (
        <div
          key={item.key}
          className={`tabs__tab ${activeKey === item.key ? 'tabs__tab--active' : ''}`}
          onClick={() => onChange?.(item.key)}
        >
          {item.label}
        </div>
      ))}
    </div>
    <div className="tabs__content">
      {items.find(item => item.key === activeKey)?.children}
    </div>
  </div>
);

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