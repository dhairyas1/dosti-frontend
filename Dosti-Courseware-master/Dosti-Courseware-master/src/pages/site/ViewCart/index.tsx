import { Button, Col, Input, Row, notification } from 'antd';
import type { ButtonProps, ColProps, InputProps, RowProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { useGetCartQuery, useRemoveFromCartMutation } from '../client.service';
import CartItem from './components/CartItem';
import './ViewCart.scss';
import { ICourseDetail } from '../../../types/course.type';

interface CartItem {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  author: string;
}

interface Cart {
  items: CartItem[];
  totalPrice: number;
}

const ViewCart: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [removeFromCart] = useRemoveFromCartMutation();
  const { data: cartData } = useGetCartQuery();
  const cart = cartData?.cart as Cart | undefined;

  const isEmpty = !cart?.items || cart.items.length === 0;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart) {
      setCartItems(cart.items);
      setTotalPrice(cart.totalPrice);
    }
  }, [cart]);

  const handleRemoveFromCart = async (courseId: string) => {
    try {
      await removeFromCart({ courseId }).unwrap();
      notification.success({
        message: 'Course removed from cart successfully',
        description: 'The course has been removed from your cart'
      });
    } catch (error) {
      notification.error({
        message: 'Failed to remove course',
        description: 'There was an error removing the course from your cart'
      });
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const rowProps: RowProps = {
    gutter: [24, 24],
  };

  const colProps = {
    list: { xs: 24, md: 16 } as ColProps,
    checkout: { xs: 24, md: 8 } as ColProps,
  };

  const checkoutButtonProps: ButtonProps = {
    type: 'primary',
    size: 'large',
    onClick: handleCheckout,
    disabled: cartItems.length === 0,
    style: { width: '100%' },
  };

  const applyButtonProps: ButtonProps = {
    type: 'primary',
    size: 'large',
  };

  const couponInputProps: InputProps = {
    placeholder: "Enter coupon code",
    size: 'large',
    id: "coupon-input",
    style: { flex: 1 },
  };

  const cartItemToDisplay = (item: ICourseDetail): CartItem => ({
    _id: item._id,
    title: item.title || '',
    thumbnail: item.thumbnail,
    price: item.price,
    author: item.author || 'Unknown'
  });

  if (isEmpty) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className='view-cart'>
      <div className='view-cart__wrap container'>
        <h2 className='view-cart__heading'>Shopping Cart</h2>

        <Row {...rowProps}>
          <Col {...colProps.list}>
            <div className='view-cart__list'>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <CartItem
                    key={item._id}
                    courseItem={cartItemToDisplay(item)}
                    onRemove={handleRemoveFromCart}
                  />
                ))
              ) : (
                <div className='view-cart__empty'>
                  <h3>Your cart is empty</h3>
                  <p>Browse our courses and find something you like!</p>
                </div>
              )}
            </div>
          </Col>

          <Col {...colProps.checkout}>
            <div className='view-cart__checkout'>
              <div className='view-cart__total'>
                <h3>Total:</h3>
                <h3>${totalPrice.toFixed(2)}</h3>
              </div>

              <Button {...checkoutButtonProps}>
                Checkout
              </Button>

              <div className='view-cart__coupon'>
                <h4>Promotions</h4>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Input {...couponInputProps} />
                  <Button {...applyButtonProps}>
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewCart;
