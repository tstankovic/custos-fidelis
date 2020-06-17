import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Majica from '../images/shirt.webp';
import Duks from '../images/duks.webp';
import Kapa from '../images/kapa.webp';
import Trenerka from '../images/trenerka.webp';

const ShopWrapper = styled.main`
  min-height: 80vh;

  .categories {
    padding: 7rem 0 8rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .categories a {
    text-decoration: none;
  }

  .category {
    width: 225px;
    height: 225px;
    cursor: pointer;
  }

  .category img {
    height: 100%;
    width: 100%;
  }

  .category p {
    text-align: center;
  }

  .category p span {
    color: #555;
  }
`;

const Shop = () => {
  return (
    <ShopWrapper>
      <div className='container'>
        <div className='categories'>
          <Link to='/products/shirts'>
            <div className='category'>
              <img src={Majica} alt='shirts' />
              <p>
                <span>Мајице</span>
              </p>
            </div>
          </Link>
          <div className='category'>
            <img src={Duks} alt='sweetshirts' />
            <p>
              <span>Дуксеви</span>
            </p>
          </div>
          <div className='category'>
            <img src={Kapa} alt='caps' />
            <p>
              <span>Капе</span>
            </p>
          </div>
          <div className='category'>
            <img src={Trenerka} alt='tracksuits' />
            <p>
              <span>Тренерке</span>
            </p>
          </div>
        </div>
      </div>
    </ShopWrapper>
  );
};

export default Shop;
