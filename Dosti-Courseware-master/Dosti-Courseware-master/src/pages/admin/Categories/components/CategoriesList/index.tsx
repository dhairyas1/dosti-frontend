import { Button, Popover, Space, Table, notification, type TableProps } from '../../../../../components/antd';
import React, { useState } from 'react';
import './CategoriesList.scss';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ICategory } from '../../../../../types/category.type';
import { CategoryError } from '../../../../../utils/helpers';
import { useDeleteCategoryMutation } from '../../category.service';
import { startEditCategory } from '../../category.slice';

interface DataCategoryType {
  key: React.Key;
  name: any;
  courses: number;
  tags: string[];
  createdAt: string;
  description: string;
  actions?: any;
}

interface TableParams {
  pagination?: TableProps<DataCategoryType>['pagination'];
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, any>;
}

interface CategoryListProps {
  data: ICategory[];
  onCateEdit: (cateId: string) => void;
}
const SettingContent = (cateId: string) => {
  const [deleteCategory, deleteCategoryResult] = useDeleteCategoryMutation();

  const deleteCateHandler = () => {
    console.log(cateId);

    deleteCategory(cateId)
      .unwrap()
      .then((result) => {
        console.log(result);

        notification.success({
          message: 'Delete cate successfully',
          description: result.message
        });
      })
      .catch((error: CategoryError) => {
        console.log('error: ', error);

        notification.error({
          message: 'Delete cate failed',
          description: error.data.message
        });
      });
  };

  return (
    <div>
      <p>Content</p>
      <Link onClick={deleteCateHandler}>Delete</Link>
    </div>
  );
};

const CategoriesList: React.FC<CategoryListProps> = (props) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  //   const showUserDetail = () => {
  //     console.log('click');
  //     setOpen(true);
  //   };

  const columns: TableProps<DataCategoryType>['columns'] = [
    {
      title: 'Category',
      dataIndex: 'name',
      width: '20%'
    },
    {
      title: 'Description',
      dataIndex: 'description'
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt'
    },
    {
      title: 'Courses',
      dataIndex: 'courses',
      sorter: (a, b) => Number(a.courses) - Number(b.courses)
    },
    {
      title: 'Tags',
      dataIndex: 'tags'
    },
    {
      title: 'Manage',
      dataIndex: 'actions'
    }
  ];

  const cateEditHandler = (cateId: string) => {
    props.onCateEdit(cateId);
    dispatch(startEditCategory(cateId));
  };

  const categoriesSource = props.data.map((cateItem) => {
    const { _id, name, cateImage, cateSlug, description, createdAt, courses } = cateItem;

    const categoryTemplateItem: DataCategoryType = {
      key: _id,
      name: (
        <a href='#'>
          <div className='category-info'>
            <img alt='' src={cateImage} className='category-info__avatar' />

            <div className='category-info__content'>
              <div className='category-info__name'>{name}</div>
            </div>
          </div>
        </a>
      ),
      description: description,
      createdAt: createdAt || '',
      courses: courses || 0,
      tags: ['23432k', 'dsfdjsk'],
      actions: (
        <Space>
          <Button onClick={() => cateEditHandler(_id)}>
            <EditOutlined />
          </Button>
          <Popover placement='bottomRight' content={SettingContent(_id)} title='Actions'>
            <Button>
              <EllipsisOutlined />
            </Button>
          </Popover>
        </Space>
      )
    };

    return categoryTemplateItem;
  });

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 12
    }
  });

  const onChange: TableProps<DataCategoryType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);

    setTableParams({
      pagination
    });
  };

  return (
    <div className='users-list'>
      {/* {isFetching && <Skeleton />} */}
      <Table columns={columns} dataSource={categoriesSource} onChange={onChange} pagination={tableParams.pagination} />
    </div>
  );
};

export default CategoriesList;
