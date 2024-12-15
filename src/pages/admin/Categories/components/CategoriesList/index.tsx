import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import './styles.scss';

interface Category {
  id: string;
  name: string;
  description: string;
}

const CategoriesList: React.FC = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const dataSource: Category[] = [];

  return (
    <Table<Category>
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
    />
  );
};

export default CategoriesList; 