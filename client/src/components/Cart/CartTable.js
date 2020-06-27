import React from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';

const CartTableWrapper = styled.div`
  width: 100%;

  table {
    width: 100%;
    margin-bottom: 5rem;
    border-collapse: collapse;
  }

  table thead {
    background-color: #eee;
    color: #333;
  }

  table tbody {
    background-color: #fafafa;
    color: #555;
  }

  th {
    height: 5rem;
    width: 250px;
  }

  th:first-child {
    width: 100px;
  }

  td {
    text-align: center;
  }

  .image-wrapper {
    width: 60px;
    height: 60px;
    margin: 1rem auto;
  }

  .quantity {
    width: 66%;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .quantity div {
    width: 30px;
    height: 30px;
    border: 1.2px solid #333;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .qty-btn {
    background: none;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
  }

  .qty-btn:hover {
    background: #333;
    color: #fff;
  }

  .item-qty {
    color: #000;
  }

  .remove-btn:hover {
    cursor: pointer;
    color: firebrick;
  }
`;

const CartTable = ({ cart, increment, decrement, remove }) => (
  <CartTableWrapper>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Proizvod</th>
          <th>Naziv</th>
          <th>Cena</th>
          <th>Količina</th>
          <th>Ukupno</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, i) => (
          <tr key={i}>
            <td>
              <FaTrashAlt className='remove-btn' onClick={() => remove(item)} />
            </td>
            <td>
              <div className='image-wrapper'>
                <img
                  width='100%'
                  height='100%'
                  src={item.product.image}
                  alt='product'
                />
              </div>
            </td>
            <td>
              {item.product.name} - {item.size}
            </td>
            <td>{item.product.price.toFixed(2)} rsd</td>
            <td>
              <div className='quantity'>
                <div>
                  <button className='qty-btn' onClick={() => decrement(item)}>
                    -
                  </button>
                </div>
                <div className='item-qty'>{item.qty}</div>
                <div>
                  <button className='qty-btn' onClick={() => increment(item)}>
                    +
                  </button>
                </div>
              </div>
            </td>
            <td>{(item.qty * item.product.price).toFixed(2)} rsd</td>
          </tr>
        ))}
      </tbody>
    </table>
  </CartTableWrapper>
);

export default CartTable;
