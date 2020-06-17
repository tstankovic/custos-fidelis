import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CartImg from '../../images/cart.png';

const CartDetailsWrapper = styled.div`
  .cart {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 250px;
    height: 100%;
  }

  .total-price {
    font-size: 15px;
    color: #fff;
  }

  .total-products {
    padding-left: 1rem;
    font-size: 14px;
    color: #aaa;
  }

  .image-wrapper {
    width: 20px;
    height: 20px;
    margin-bottom: 0.2rem;
  }
`;

const CartDetails = ({ cartTotal, itemsTotal }) => (
  <CartDetailsWrapper>
    <Link to='/cart' className='cart'>
      <p>
        <span className='total-price'>{cartTotal.toFixed(2)} рсд</span>
        <span className='total-products'>
          {itemsTotal} производ
          {itemsTotal === 0 || itemsTotal > 1 ? 'а' : ''}
        </span>
      </p>
      <div className='image-wrapper'>
        <img width='100%' height='100%' src={CartImg} alt='shopping-cart' />
      </div>
    </Link>
  </CartDetailsWrapper>
);

export default CartDetails;
