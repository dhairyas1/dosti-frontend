import React from 'react';
import { Button } from 'antd';
import './styles.scss';

const Checkout: React.FC = () => {
  const handleCheckout = () => {
    // Handle checkout logic
  };

  return (
    <div className="checkout">
      <Button
        type="primary"
        onClick={handleCheckout}
        className="checkout-button"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default Checkout; 