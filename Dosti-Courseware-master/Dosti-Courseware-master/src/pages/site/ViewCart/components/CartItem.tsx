import { Button, Col, Row } from 'antd';
import type { ButtonProps, ColProps, RowProps } from 'antd';
import { DeleteOutlined, HeartOutlined } from '@ant-design/icons';
import React from 'react';
import './CartItem.scss';

interface CartItemProps {
  courseItem: {
    _id: string;
    title: string;
    thumbnail: string;
    price: number;
    author: string;
  };
  onRemove: (courseId: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ courseItem, onRemove }) => {
  const { _id, title, thumbnail, price, author } = courseItem;

  const removeButtonProps: ButtonProps = {
    type: 'text',
    onClick: () => onRemove(_id),
  };

  const saveButtonProps: ButtonProps = {
    type: 'text',
  };

  const rowProps: RowProps = {
    gutter: [16, 16],
    align: 'middle',
  };

  const colProps = {
    thumbnail: { flex: '100px' } as ColProps,
    info: { flex: 'auto' } as ColProps,
    actions: { flex: '150px' } as ColProps,
    price: { flex: '100px' } as ColProps,
  };

  return (
    <div className='cart-item'>
      <Row {...rowProps}>
        <Col {...colProps.thumbnail}>
          <div className='cart-item__img'>
            <img src={thumbnail} alt={title} />
          </div>
        </Col>

        <Col {...colProps.info}>
          <div className='cart-item__info'>
            <h3 className='cart-item__info-title'>{title}</h3>
            <div className='cart-item__info-author'>By {author}</div>
            <div className='cart-item__info-price'>${price.toFixed(2)}</div>
          </div>
        </Col>

        <Col {...colProps.actions}>
          <div className='cart-item__actions'>
            <Button {...removeButtonProps}>
              <DeleteOutlined /> Remove
            </Button>
            <Button {...saveButtonProps}>
              <HeartOutlined /> Save for later
            </Button>
          </div>
        </Col>

        <Col {...colProps.price}>
          <div className='cart-item__price'>
            <span className='cart-item__price-text'>
              ${price.toFixed(2)}
            </span>
          </div>
        </Col>
      </Row>
      <hr className="cart-item__divider" />
    </div>
  );
};

export default CartItem;
