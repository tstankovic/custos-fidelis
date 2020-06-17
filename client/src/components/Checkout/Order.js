import React, { useState } from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';

import axios from '../../axios';

const OrderWrapper = styled.div`
  flex: 3;

  h2 {
    font-weight: lighter;
    color: #333;
  }

  table {
    border-collapse: collapse;
  }

  .order-details {
    width: 100%;
    margin-top: 1.5rem;
    margin-bottom: 3rem;
    border-collapse: collapse;
  }

  .order-details th {
    padding: 1.5rem;
    width: 50%;
    background-color: #eee;
    color: #555;
  }

  .order-details td {
    width: 50%;
    background-color: #fafafa;
    color: #555;
    text-align: center;
    padding: 1.5rem 0;
  }

  .order-details td p {
    padding-left: 1.5rem;
    text-align: left;
  }

  .qty {
    margin-top: 0.2rem;
    font-weight: bold;
  }

  .total-price {
    font-weight: bold;
  }

  .payment-method {
    margin: 2rem 0;
    width: 100%;
  }

  .payment-method th {
    padding: 1.5rem;
    background: #eee;
    color: #555;
    text-align: left;
  }

  .payment-method td {
    background-color: #fafafa;
    color: #555;
    padding: 1.5rem;
    font-size: 15px;
  }

  input[type='checkbox'] {
  }

  .order-btn {
    margin-top: 2.5rem;
    height: 4rem;
    width: 100%;
    border: none;
    border-radius: 2px;
    outline: none;
    color: #fafafa;
    background-color: #444;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
  }

  .order-btn:hover {
    background-color: #222;
  }

  .order-btn:disabled {
    cursor: not-allowed;
    background-color: #aaa;
  }
`;

const Order = ({ cart, handleOrder }) => {
  const [recaptcha, setRecaptcha] = useState(false);

  const cartTotal = cart.reduce((acc, cur) => {
    acc += cur.product.price * cur.qty;
    return acc;
  }, 0);

  const onChange = async (value) => {
    if (value) {
      const response = await axios.post('/api/orders/recaptcha', {
        response: value,
      });
      if (response.statusText == 'OK') {
        setRecaptcha(true);
      } else {
        setRecaptcha(false);
      }
    } else {
      setRecaptcha(false);
    }
  };

  return (
    <OrderWrapper>
      <h2>Ваша наруџбина</h2>
      <table className='order-details'>
        <tbody>
          <tr>
            <th>Производ</th>
            <th>Укупно</th>
          </tr>
          {cart.map((item, i) => (
            <tr key={i}>
              <td>
                <p>
                  {item.product.name} - {item.size}
                </p>
                <p className='qty'>x {item.qty}</p>
              </td>
              <td>{item.product.price.toFixed(2)} рсд</td>
            </tr>
          ))}
          <tr>
            <th>Укупно</th>
            <td>{cartTotal.toFixed(2)} рсд</td>
          </tr>
          <tr>
            <th>Укупно</th>
            <td className='total-price'>{cartTotal.toFixed(2)} рсд</td>
          </tr>
        </tbody>
      </table>

      <table className='payment-method'>
        <thead>
          <tr>
            <th>Payment method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Pay with cach upon delivery</td>
          </tr>
        </tbody>
      </table>

      <ReCAPTCHA
        sitekey='6Ld6wQEVAAAAAIwwd-_XFnTQjoXi10aMmVq78ssr'
        onChange={onChange}
      />

      <button className='order-btn' onClick={handleOrder} disabled={!recaptcha}>
        Наручите
      </button>
    </OrderWrapper>
  );
};

export default Order;
