import { Button, Col, Input, Row, notification } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonCmp from '../../../components/Button';
import { RootState } from '../../../store/store';
import { openAuthModal } from '../../auth.slice';
import { useGetRetrieveCartQuery } from '../client.service';
import { removeCart } from '../client.slice';
import './ViewCart.scss';
import CartItem from './components/CartItem';

interface CartItem {
  _id: string;
  courseId: string;
  title: string;
  thumbnail: string;
  price: number;
  author: string;
}

interface CartData {
  cart: {
    totalPrice: number;
    items: CartItem[];
  };
}

const ViewCart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.client.cart);
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const courseIds = cart.items.map((item) => item.courseId);

  const { data: cartData, isFetching } = useGetRetrieveCartQuery({ courseIds });

  const totalPrice = cartData?.cart.totalPrice || 0;
  const cartItems = cartData?.cart.items || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeCartHandler = (courseId: string) => {
    dispatch(removeCart(courseId));
    notification.success({
      message: 'Course removed from cart',
      description: 'The course has been removed from your cart successfully'
    });
  };

  const checkoutHandler = () => {
    if (courseIds.length === 0) {
      notification.error({
        message: 'Please add courses to cart',
        description: 'Your cart is empty. Please add some courses before proceeding.'
      });
      return;
    }

    if (isAuth) {
      navigate('/checkout');
    } else {
      notification.error({
        message: 'Please login to checkout',
        description: 'You need to be logged in to complete the checkout process.'
      });
      dispatch(openAuthModal());
    }
  };

  return (
    <div className='view-cart'>
      <div className='view-cart__wrap container spacing-h-sm'>
        <h2 className='view-cart__title'>Shopping Cart</h2>
        <div className='view-cart__content'>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={18}>
              <div className='view-cart__list'>
                <h4 className='view-cart__list-title'>{cart?.items?.length || 0} Courses in Cart</h4>
                <div className='view-cart__list-wrap'>
                  {isFetching && <div>Loading...</div>}
                  {!isFetching &&
                    cartItems.map((cartItem) => (
                      <CartItem
                        key={cartItem._id}
                        courseItem={cartItem}
                        onRemove={removeCartHandler}
                      />
                    ))}
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <div className='view-cart__summary'>
                <h4 className='view-cart__summary-title'>Total: </h4>
                <h3 className='view-cart__summary-price'>${totalPrice}</h3>
                <div onClick={checkoutHandler}>
                  <div className='view-cart__summary-btn btn btn-md'>Checkout</div>
                </div>
                <hr className="view-cart__divider" />
                <div className='view-cart__summary-promo'>
                  <span className='view-cart__summary-promo-title'>Promo code</span>
                  <div className='view-cart__summary-promo-input-group'>
                    <div className="view-cart__input-wrapper">
                      <Input placeholder="Enter Coupon" />
                      <Button type="primary" size="small">Apply</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
