import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../axios';
import Title from '../../components/Title';
import config from '../../config';

const ShirtsWrapper = styled.main`
  padding-bottom: 5rem;

  a {
    text-decoration: none;
  }

  .products-sort {
    margin-bottom: 3rem;
    padding-left: 1.6rem;

    select {
      font-size: 15px;
      padding: 0.1rem 0;
    }
  }

  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    row-gap: 4rem;
  }

  .product-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product {
    width: 230px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h4 {
      padding-top: 1rem;
      color: #333;
      font-weight: 500;
    }

    p {
      padding-top: 0.75rem;
      color: #555;
      font-size: 15px;
    }
  }

  .image-wrapper {
    width: 100%;
    height: 230px;
  }
`;

const Shirts = () => {
  const [shirts, setShirts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(window.location.hostname);
    console.log(
      'together: ' + window.location.hostname + '/api/products/contentful/shirt'
    );
    console.log('from config: ' + config[process.env.NODE_ENV].endpoint);
    setLoading(true);
    axios
      .get('/api/products/contentful/shirt')
      .then((res) => {
        const { items } = res.data;
        const shirts = [];
        for (const item of items) {
          const shirt = {};
          const sizes = [];
          for (const size in item.fields.sizes) {
            if (Number(item.fields.sizes[size]) > 0) {
              sizes.push(size);
            }
          }
          shirt.sizes = sizes;
          shirt.images = item.fields.images.map(
            (image) => image.fields.file.url
          );
          shirt._id = item.sys.id;
          shirt.name = item.fields.name;
          shirt.price = item.fields.price;
          shirt.description = item.fields.description;
          shirts.push(shirt);
        }
        setShirts(shirts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className='loader-wrapper'>
        <div className='loader'>Loading...</div>
      </div>
    );
  }

  return (
    <ShirtsWrapper>
      <Title title='Мајице' />

      <div className='container-products'>
        <div className='products-sort'>
          <select>
            <option value=''>Подразумевано сортирање</option>
            <option value='new'>Најновије</option>
            <option value='price_asc'>По цени - растуће</option>
            <option value='price_desc'>По цени - опадајуће</option>
          </select>
        </div>
        <div className='content'>
          {shirts.map((shirt, i) => (
            <div key={i} className='product-wrapper'>
              <Link to={`/product/${shirt._id}`}>
                <div className='product'>
                  <div className='image-wrapper'>
                    <img
                      width='100%'
                      height='100%'
                      src={shirt.images[0]}
                      alt='shirt'
                    />
                  </div>
                  <h4>{shirt.name}</h4>
                  <p>{shirt.price.toFixed(2)} рсд</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </ShirtsWrapper>
  );
};

export default Shirts;
