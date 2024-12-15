import React from 'react';
import './styles.scss';

// Types
export type TableProps<T> = {
  pagination?: TablePaginationConfig;
  onChange?: (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: any) => void;
  dataSource?: T[];
  columns?: ColumnsType<T>;
};

export type TablePaginationConfig = {
  current?: number;
  pageSize?: number;
  total?: number;
};

export type FilterValue = string | number | boolean | null;

export type RadioChangeEvent = {
  target: {
    value: string | number;
  };
};

export type ColumnsType<T> = Array<{
  title: string;
  dataIndex?: string;
  key?: string;
  width?: string | number;
  render?: (value: any, record: T) => React.ReactNode;
}>;

// Layout Components
export const Layout: React.FC<{children: React.ReactNode}> = ({children}) => <div className="layout">{children}</div>;
export const Header: React.FC<{children: React.ReactNode}> = ({children}) => <header className="header">{children}</header>;
export const Content: React.FC<{children: React.ReactNode}> = ({children}) => <main className="content">{children}</main>;
export const Footer: React.FC<{children: React.ReactNode}> = ({children}) => <footer className="footer">{children}</footer>;
export const Sider: React.FC<{children: React.ReactNode}> = ({children}) => <aside className="sider">{children}</aside>;

// Form Components
export const Form: React.FC<{
  onFinish?: (values: any) => void;
  children: React.ReactNode;
  className?: string;
}> = ({ onFinish, children, className = '' }) => (
  <form onSubmit={(e) => { e.preventDefault(); onFinish?.({}); }} className={`form ${className}`}>
    {children}
  </form>
);

export const FormItem: React.FC<{
  label?: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className = '' }) => (
  <div className={`form-item ${className}`}>
    {label && <label className="form-label">{label}</label>}
    {children}
  </div>
);

// Input Components
export const Input: React.FC<{
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}> = ({ value, onChange, placeholder, type = 'text', className = '' }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`input ${className}`}
  />
);

export const TextArea: React.FC<{
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
}> = ({ value, onChange, rows = 3, className = '' }) => (
  <textarea
    value={value}
    onChange={onChange}
    rows={rows}
    className={`textarea ${className}`}
  />
);

export const Password: React.FC<{
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}> = ({ value, onChange, className = '' }) => (
  <input
    type="password"
    value={value}
    onChange={onChange}
    className={`input-password ${className}`}
  />
);

// Select Component
export const Select: React.FC<{
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: Array<{ value: string; label: string }>;
  className?: string;
}> = ({ value, onChange, options = [], className = '' }) => (
  <select
    value={value}
    onChange={onChange}
    className={`select ${className}`}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export const SelectOption: React.FC<{
  value: string;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <option value={value}>{children}</option>
);

// Button Component
export const Button: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'primary' | 'secondary' | 'link';
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}> = ({ onClick, children, type = 'primary', htmlType = 'button', className = '', disabled = false }) => (
  <button 
    className={`btn btn-${type} ${className}`}
    onClick={onClick}
    type={htmlType}
    disabled={disabled}
  >
    {children}
  </button>
);

// Table Component
export const Table: React.FC<TableProps<any>> = ({ 
  dataSource = [], 
  columns = [], 
  pagination,
  onChange 
}) => (
  <div className="table-wrapper">
    <table className="table">
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key || column.dataIndex}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((record, index) => (
          <tr key={record.key || index}>
            {columns.map(column => (
              <td key={column.key || column.dataIndex}>
                {column.render 
                  ? column.render(record[column.dataIndex as string], record)
                  : record[column.dataIndex as string]
                }
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {pagination && (
      <div className="pagination">
        <button 
          onClick={() => onChange?.({ ...pagination, current: (pagination.current || 1) - 1 }, {}, {})}
          disabled={pagination.current === 1}
        >
          Previous
        </button>
        <span>{pagination.current} / {Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))}</span>
        <button 
          onClick={() => onChange?.({ ...pagination, current: (pagination.current || 1) + 1 }, {}, {})}
          disabled={pagination.current === Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))}
        >
          Next
        </button>
      </div>
    )}
  </div>
);

// Other Components
export const Space: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`space ${className}`}>{children}</div>
);

export const Row: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`row ${className}`}>{children}</div>
);

export const Col: React.FC<{
  children: React.ReactNode;
  span?: number;
  className?: string;
}> = ({ children, span = 12, className = '' }) => (
  <div className={`col col-${span} ${className}`}>{children}</div>
);

export const Divider: React.FC = () => <hr className="divider" />;

export const Tag: React.FC<{
  children: React.ReactNode;
  color?: string;
  className?: string;
}> = ({ children, color = 'default', className = '' }) => (
  <span className={`tag tag-${color} ${className}`}>{children}</span>
);

export const Modal: React.FC<{
  title?: string;
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
}> = ({ title, open, onOk, onCancel, children }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        {title && <div className="modal-header">{title}</div>}
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={onOk}>OK</Button>
        </div>
      </div>
    </div>
  );
};

export const notification = {
  success: ({ message, description }: { message: string; description?: string }) => {
    alert(`Success: ${message}\n${description || ''}`);
  },
  error: ({ message, description }: { message: string; description?: string }) => {
    alert(`Error: ${message}\n${description || ''}`);
  }
};