import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CartSummaryWrapper = styled.div`
  width: 50%;
  float: right;
  margin-bottom: 3rem;

  h2 {
    font-weight: lighter;
    margin-bottom: 1.5rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
  }

  td {
    height: 4rem;
    background-color: #fafafa;
  }

  th {
    background-color: #eee;
    color: #333;
    text-align: left;
  }

  td {
    color: #555;
  }

  th p,
  td p {
    padding-left: 1rem;
  }

  .checkout-btn {
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

  .checkout-btn:hover {
    background-color: #222;
  }

  .price-final {
    font-weight: bold;
  }
`;

const CartSummary = ({ cart }) => {
  const cartTotal = cart.reduce((acc, cur) => {
    acc += cur.product.price * cur.qty;
    return acc;
  }, 0);

  return (
    <CartSummaryWrapper>
      <h2>Укупна вредност корпе</h2>
      <table>
        <tbody>
          <tr>
            <th>
              <p>Укупно</p>
            </th>
            <td>
              <p>{cartTotal.toFixed(2)} рсд</p>
            </td>
          </tr>
          <tr>
            <th>
              <p>Укупно</p>
            </th>
            <td>
              <p className='price-final'>{cartTotal.toFixed(2)} рсд</p>
            </td>
          </tr>
        </tbody>
      </table>
      <Link to='/checkout'>
        <button className='checkout-btn'>Наставите са плаћањем →</button>
      </Link>
    </CartSummaryWrapper>
  );
};

export default CartSummary;
