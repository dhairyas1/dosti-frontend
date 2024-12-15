import React from 'react';
import { TableProps } from '../types';
import '../styles.scss';

export function Table<T extends object>({ 
  dataSource = [], 
  columns = [], 
  pagination,
  onChange 
}: TableProps<T>) {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={column.key || column.dataIndex || index} style={{ width: column.width }}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((record, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={column.key || column.dataIndex || colIndex}>
                  {column.render 
                    ? column.render(column.dataIndex ? record[column.dataIndex as keyof T] : undefined, record)
                    : column.dataIndex 
                      ? String(record[column.dataIndex as keyof T])
                      : undefined
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="table-pagination">
          <button 
            disabled={pagination.current === 1}
            onClick={() => onChange?.({
              ...pagination,
              current: (pagination.current || 1) - 1
            }, {}, {} as any)}
          >
            Previous
          </button>
          <span>{pagination.current} / {Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))}</span>
          <button 
            disabled={pagination.current === Math.ceil((pagination.total || 0) / (pagination.pageSize || 10))}
            onClick={() => onChange?.({
              ...pagination,
              current: (pagination.current || 1) + 1
            }, {}, {} as any)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
} 