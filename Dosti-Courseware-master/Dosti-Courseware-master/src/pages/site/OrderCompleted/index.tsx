import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';
import './OrderCompleted.scss';

const OrderCompleted: React.FC = () => {
  const primaryButtonProps: ButtonProps = {
    type: 'primary',
  };

  const secondaryButtonProps: ButtonProps = {
    type: 'default',
  };

  return (
    <div className='order-completed'>
      <div className='order-completed__wrap container'>
        <div className='order-completed__content'>
          <CheckCircleOutlined className='order-completed__icon' />
          <h2 className='order-completed__title'>Order Completed!</h2>
          <p className='order-completed__text'>
            Thank you for your purchase. You can now start learning from your courses.
          </p>
          <div className='order-completed__actions'>
            <Link to="/profile">
              <Button {...primaryButtonProps}>
                Go to My Learning
              </Button>
            </Link>
            <Link to="/courses">
              <Button {...secondaryButtonProps}>
                Browse More Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCompleted;
