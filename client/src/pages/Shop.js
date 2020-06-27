import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Majica from '../images/tshirt-sketch.png';
import Polo from '../images/polo-sketch.jpg';
import Kacket from '../images/cap-sketch.jpg';
import Duks from '../images/hoodie-sketch.jpg';

const ShopWrapper = styled.main`
  min-height: 80vh;

  .categories {
    padding: 7rem 0 8rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      text-decoration: none;
    }
  }

  .category {
    width: 225px;
    height: 225px;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
    }

    p {
      margin-top: 1rem;
      text-align: center;
      border-bottom: 1px solid black;

      span {
        color: #333;
      }
    }
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
                <span>Majice</span>
              </p>
            </div>
          </Link>
          <div className='category'>
            <img src={Polo} alt='polo-shirts' />
            <p>
              <span>Polo majice</span>
            </p>
          </div>
          <div className='category'>
            <img src={Kacket} alt='caps' />
            <p>
              <span>Kačketi</span>
            </p>
          </div>
          <div className='category'>
            <img src={Duks} alt='hoodies' />
            <p>
              <span>Duksevi (uskoro)</span>
            </p>
          </div>
        </div>
      </div>
    </ShopWrapper>
  );
};

export default Shop;
