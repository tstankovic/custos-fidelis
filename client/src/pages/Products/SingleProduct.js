import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { AppContext } from '../../context';
import Button from '../../components/Button';
import Message from '../../components/Message';

const SingleProductWrapper = styled.main`
  min-height: 120vh;

  .product-wrapper {
    padding: 5rem 0;
    display: flex;
  }

  .product-images {
    flex: 2;
  }

  .product-info {
    padding-left: 2rem;
    flex: 3;

    h1 {
      font-size: 2.5rem;
      font-weight: 300;
    }
  }

  .product-price {
    padding: 2rem 0;
    font-size: 1.2rem;
    font-weight: lighter;
  }

  .product-description {
    font-size: 15px;
    color: #555;
    line-height: 24px;
  }

  .product-actions {
    padding-top: 2rem;
  }

  .size-select {
    padding-top: 0.5rem;

    select {
      font-size: 15px;
      padding: 0.1rem 0;
    }
  }

  .qty-select {
    padding-top: 2rem;
    display: flex;
  }

  .qty-input {
    width: 4rem;
    height: 2.5rem;

    input {
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 1rem;
      border: 1.2px solid #000;
    }
  }

  .all-images {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    column-gap: 2rem;
    row-gap: 2rem;
  }

  .image-wrapper {
    width: 50px;
    height: 50px;
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }
`;

const SingleProduct = (props) => {
  const [product, setProduct] = useState({});
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);
  const [messageVisible, setMessageVisible] = useState(false);

  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    const { id } = props.match.params;
    setLoading(true);
    axios.get(`/api/products/contentful/single/${id}`).then((res) => {
      const { sys, fields } = res.data;
      const product = {};
      product._id = sys.id;
      const sizes = [];
      for (const size in fields.sizes) {
        if (Number(fields.sizes[size]) > 0) {
          sizes.push(size);
        }
      }
      product.sizes = sizes;
      product.images = fields.images.map((image) => image.fields.file.url);
      product.name = fields.name;
      product.price = fields.price;
      product.description = fields.description;
      setProduct(product);
      setCurrentImage(product.images[0]);
      setLoading(false);
    });
  }, [props.match.params]);

  useEffect(() => {
    let timeout;
    if (messageVisible) {
      timeout = setTimeout(() => {
        setMessageVisible(false);
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [messageVisible]);

  const handleClick = (...args) => {
    setMessageVisible(true);
    setSize(false);
    setQty(1);
    const scrollToTop = () => {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    };
    scrollToTop();
    addToCart(...args);
  };

  if (loading) {
    return (
      <div className='loader-wrapper'>
        <div className='loader'>Loading...</div>
      </div>
    );
  }

  return (
    <SingleProductWrapper>
      <div className='container'>
        <Message visible={messageVisible} />
        <div className='product-wrapper'>
          <div className='product-images'>
            <div className='current-image'>
              {product.images && (
                <img
                  width='100%'
                  height='100%'
                  src={currentImage}
                  alt='current'
                />
              )}
            </div>
            <div className='all-images'>
              {product.images &&
                product.images.map((url, i) => (
                  <div
                    key={i}
                    className='image-wrapper'
                    onClick={() => setCurrentImage(url)}
                  >
                    <img width='100%' height='100%' src={url} alt='current' />
                  </div>
                ))}
            </div>
          </div>
          <div className='product-info'>
            <h1>{product.name}</h1>
            <p className='product-price'>
              {product.price && product.price.toFixed(2)} рсд
            </p>
            <p className='product-description'>{product.description}</p>
            <div className='product-actions'>
              <div className='sizes'>
                <p>Величине</p>
                <div className='size-select'>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value=''>Изаберите опцију</option>
                    {product.sizes &&
                      product.sizes.map((size, i) => (
                        <option key={i} value={size}>
                          {size}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className='qty-select'>
                <div className='qty-input'>
                  <input
                    type='number'
                    defaultValue='1'
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
                <Button
                  disabled={!size}
                  onClick={() => handleClick(product, size, qty)}
                >
                  Додај у корпу
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SingleProductWrapper>
  );
};

export default SingleProduct;
