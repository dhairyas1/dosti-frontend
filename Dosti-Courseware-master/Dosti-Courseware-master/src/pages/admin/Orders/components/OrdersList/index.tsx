import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrdersList.scss';
import { DownloadOutlined } from '@ant-design/icons';
import { IOrder, IOrderItem } from '../../../../../types/order.type';

interface DataOrderType {
  key: React.Key;
  name: JSX.Element;
  avatar?: string;
  email?: string;
  courses: JSX.Element;
  register: string;
  transaction: JSX.Element;
  amount: string;
  payment: string;
}

interface OrdersListProps {
  ordersList: IOrder[];
}

const OrdersList: React.FC<OrdersListProps> = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ordersData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ordersData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const ordersData: DataOrderType[] = props.ordersList.map((order) => {
    const { transaction, user, id, totalPrice, items } = order;

    return {
      key: id,
      name: (
        <div className='user-info'>
          <img alt={user.name} src={user.avatar || ''} className='user-info__avatar' />
          <div className='user-info__content'>
            <div className='user-info__name'>{user.name}</div>
            <div className='user-info__email'>{user.email}</div>
          </div>
        </div>
      ),
      register: order.createdAt || '',
      courses: (
        <div className='course-avatars'>
          {(items || []).slice(0, 2).map((course) => (
            <img key={course.id} src={course.thumbnail} alt={course.name} className='course-avatar' />
          ))}
          {(items || []).length > 2 && (
            <div className='course-avatar course-avatar--more'>
              +{(items || []).length - 2}
            </div>
          )}
        </div>
      ),
      transaction: (
        <div className='transaction-info'>
          <div>
            <Link to='/'>
              Invoice <DownloadOutlined />
            </Link>
          </div>
          <div>sandbox_64bccb1fc177e</div>
        </div>
      ),
      amount: `$${totalPrice}`,
      payment: transaction.method
    };
  });

  return (
    <div className='orders-list'>
      <div className='table-container'>
        <table className='data-table'>
          <thead>
            <tr>
              <th>Learners</th>
              <th>Register</th>
              <th>Courses</th>
              <th>Invoice / Transaction ID</th>
              <th>Amount</th>
              <th>Payment Gateway</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.key}>
                <td>{item.name}</td>
                <td>{item.register}</td>
                <td>{item.courses}</td>
                <td>{item.transaction}</td>
                <td>{item.amount}</td>
                <td>{item.payment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className='pagination'>
          <button
            className='pagination-btn'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          
          <button
            className='pagination-btn'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
