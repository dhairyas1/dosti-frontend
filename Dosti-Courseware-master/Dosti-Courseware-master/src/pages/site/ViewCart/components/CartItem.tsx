import { Button, Col, Row } from 'antd';
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

const CartItem: React.FC<CartItemProps> = (props) => {
  const { _id, title, thumbnail, price, author } = props.courseItem;

  return (
    <div className='cart-item'>
      <Row>
        <Col span={4}>
          <div className='cart-item__img'>
            <img src={thumbnail} alt={title} />
          </div>
        </Col>
        <Col span={12}>
          <div className='cart-item__info'>
            <h3 className='cart-item__info-title'>{title}</h3>
            <div className='cart-item__info-author'>By {author}</div>
            <div className='cart-item__info-price'>${price}</div>
          </div>
        </Col>
        <Col span={4}>
          <div className='cart-item__actions'>
            <Button type="text" onClick={() => props.onRemove(_id)}>Remove</Button>
            <Button type="text">Save for later</Button>
          </div>
        </Col>
        <Col span={4}>
          <div className='cart-item__price'>
            <span className='cart-item__price-text'>${price}</span>
          </div>
        </Col>
      </Row>
      <hr className="cart-item__divider" />
    </div>
  );
};

export default CartItem;
