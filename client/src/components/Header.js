import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AppContext } from '../context';
import CartPreview from './Cart/CartPreview';
import CartDetails from './Cart/CartDetails';

const HeaderWrapper = styled.header`
  width: 100%;
  padding-top: 1rem;
  background: #000;
  color: #fff;

  .row {
    display: flex;
    justify-content: space-between;
  }

  .logo {
    padding: 2rem 0;
  }

  nav ul {
    list-style: none;
    width: 400px;
    display: flex;
    justify-content: space-between;
  }

  nav ul li a {
    text-decoration: none;
    color: #fff;
    font-size: 15px;
    letter-spacing: 1px;
    display: inline-block;
    padding: 1.5rem 0;
  }

  .search {
    display: flex;
    align-items: center;
  }

  .search input {
    width: 250px;
    height: 50px;
    padding: 0.5rem;
    background-color: #fafafa;
    border: none;
    outline: none;
  }

  .cart {
    display: flex;
    position: relative;
  }

  .sticky {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #000;
    padding: 0 2rem;
  }
`;

const Header = () => {
  const { cart, remove } = useContext(AppContext);

  useEffect(() => {
    const nav = document.querySelector('.row-nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('sticky', window.scrollY > 115);
    });
  }, []);

  const cartTotal = cart.reduce((acc, cur) => {
    acc += cur.product.price * cur.qty;
    return acc;
  }, 0);

  let itemsTotal = 0;
  for (const item of cart) {
    itemsTotal += Number(item.qty);
  }

  return (
    <HeaderWrapper>
      <div className='container'>
        <div className='row'>
          <h1 className='logo'>LOGO</h1>
          <div className='search'>
            <input type='text' placeholder='Претрага производа...' />
          </div>
        </div>
        <div className='row row-nav'>
          <nav>
            <ul>
              <li>
                <Link to='/'>Насловна</Link>
              </li>
              <li>
                <Link to='/shop'>Продавница</Link>
              </li>
              <li>
                <Link to='/story'>Прича</Link>
              </li>
              <li>
                <Link to='/about'>О нама</Link>
              </li>
            </ul>
          </nav>
          <div className='cart'>
            <CartDetails cartTotal={cartTotal} itemsTotal={itemsTotal} />
            <CartPreview cart={cart} cartTotal={cartTotal} remove={remove} />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;
