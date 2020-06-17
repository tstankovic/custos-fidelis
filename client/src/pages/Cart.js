import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AppContext } from '../context';
import Title from '../components/Title';
import CartTable from '../components/Cart/CartTable';
import CartSummary from '../components/Cart/CartSummary';

const CartWrapper = styled.main`
  min-height: 80vh;

  .cart-empty {
    text-align: center;
  }

  .cart-empty h2 {
    font-size: 2rem;
    font-weight: lighter;
    color: #333;
  }

  .cart-empty button {
    margin: 7rem 0 5rem 0;
    height: 4rem;
    width: 25rem;
    font-size: 15px;
    background-color: #ccc;
    border: none;
    border-radius: 2px;
    outline: none;
    color: #333;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Cart = () => {
  const { cart, increment, decrement, remove } = useContext(AppContext);

  return (
    <CartWrapper>
      <Title title='Корпа' />
      <div className='container'>
        {cart.length ? (
          <>
            <CartTable
              cart={cart}
              increment={increment}
              decrement={decrement}
              remove={remove}
            />
            <CartSummary cart={cart} />
          </>
        ) : (
          <div className='cart-empty'>
            <h2>Ваша корпа је тренутно празна</h2>
            <Link to='/shop'>
              <button>Назад у продавницу</button>
            </Link>
          </div>
        )}
      </div>
    </CartWrapper>
  );
};

export default Cart;
