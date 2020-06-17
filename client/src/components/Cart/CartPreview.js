import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

const CartPreviewWrapper = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  background-color: #000;
  padding: 1rem;
  display: none;

  .cart:hover & {
    display: block;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-bottom: 1rem;

    a {
      color: #fff;
    }
  }

  .cart-item-image {
    width: 40px;
    width: 40px;
  }

  .cart-item-info p:first-child {
    padding-bottom: 0.2rem;
  }

  .cart-total {
    margin: 0.5rem 0;
    text-align: center;
    font-size: 14px;

    span {
      font-weight: bold;
    }
  }

  .cart-actions {
    margin-top: 1rem;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .cart-preview-btn,
  .checkout-btn {
    height: 2.5rem;
    width: 100%;
    border: none;
    border-radius: 2px;
    outline: none;
    font-weight: bold;
    cursor: pointer;
  }

  .cart-preview-btn {
    background-color: #eee;
    color: #333;
  }

  .checkout-btn {
    background-color: #555;
    color: #fff;
  }

  .remove-btn {
    cursor: pointer;
  }

  .cart-empty {
    text-align: center;
    font-size: 14px;
    padding: 0.5rem 0;
  }
`;

const CartPreview = ({ cart, cartTotal, remove }) => (
  <CartPreviewWrapper>
    {cart.length ? (
      <>
        {cart.map((item, i) => (
          <div key={i} className='cart-item'>
            <div className='cart-item-remove'>
              <FaTrashAlt className='remove-btn' onClick={() => remove(item)} />
            </div>
            <div className='cart-item-info'>
              <p>
                <Link to={`/product/${item.product.id}`}>
                  {item.product.name} - {item.size}
                </Link>
              </p>
              <p>
                {item.qty} x {item.product.price.toFixed(2)} рсд
              </p>
            </div>
            <div className='cart-item-image'>
              <img
                width='100%'
                height='100%'
                src={item.product.image}
                alt='cart-item'
              />
            </div>
          </div>
        ))}

        <p className='cart-total'>
          <span>Укупно:</span> {cartTotal.toFixed(2)} рсд
        </p>

        <div className='cart-actions'>
          <Link to='/cart'>
            <button className='cart-preview-btn'>Преглед корпе →</button>
          </Link>
          <Link to='/checkout'>
            <button className='checkout-btn'>Плаћање →</button>
          </Link>
        </div>
      </>
    ) : (
      <p className='cart-empty'>Нема производа у корпи</p>
    )}
  </CartPreviewWrapper>
);

export default CartPreview;
