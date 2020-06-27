import React, { useEffect } from 'react';
import styled from 'styled-components';

import HeroMain from '../images/hero-main.jpg';
import HeroNew from '../images/hero-new.jpg';
import HeroToggleFirst from '../images/hero-toggle-1.jpg';
import HeroToggleSecond from '../images/hero-toggle-2.jpg';

import ImageSlider from '../components/Global/ImageSlider';

const HomeWrapper = styled.main`
  .hero {
    min-height: 100vh;
    background-image: url(${HeroMain});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;

    div {
      width: 300px;
      height: 120px;
      position: absolute;
      top: 225px;
      left: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .shop-btn {
    height: 75px;
    width: 250px;
    border: none;
    border-radius: 5px;
    outline: none;
    background: #000;
    color: #fff;
    cursor: pointer;
    font-size: 2rem;
    font-weight: bold;
    letter-spacing: 2px;
  }

  .hero-new {
    min-height: 100vh;
    background-image: url(${HeroNew});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    // background-attachment: fixed;
    position: relative;
  }

  .hero-slider {
    min-height: 100vh;
    position: relative;
  }

  .hero-slider-img {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .active {
    opacity: 1;
  }

  .hero-slider-img-content {
    width: 400px;
    height: 150px;
    position: absolute;
    top: 250px;
    left: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    h1 {
      color: #fff;
      font-size: 40px;
    }

    button {
      width: 200px;
      height: 50px;
      background: none;
      border: none;
      outline: none;
      background-color: firebrick;
      color: white;
      font-size: 18px;
      border-radius: 2px;
      cursor: pointer;
    }
  }

  .icons-wrapper {
    padding: 5rem 0;
    display: flex;
    justify-content: space-around;

    a:hover .img-dark {
      display: inline;
    }

    a:hover .img-main {
      display: none;
    }
  }

  .img-dark {
    display: none;
  }
`;

const Home = () => {
  useEffect(() => {
    const imgs = document.querySelectorAll('.hero-slider-img');
    const interval = setInterval(() => {
      for (const img of imgs) {
        img.classList.toggle('active');
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <HomeWrapper>
      <section className='hero'>
        <div>
          <button className='shop-btn'>KUPI</button>
        </div>
      </section>
      <section>
        <ImageSlider />
      </section>
      <section className='hero-new'></section>
      <section>
        <ImageSlider />
      </section>
      <section className='hero-slider'>
        <div
          className='hero-slider-img active'
          style={{ backgroundImage: `url(${HeroToggleFirst})` }}
        >
          <div className='hero-slider-img-content'>
            <h1>NOVE MAJICE</h1>
            <button>PRODAVNICA</button>
          </div>
        </div>
        <div
          className='hero-slider-img'
          style={{ backgroundImage: `url(${HeroToggleSecond})` }}
        >
          <div className='hero-slider-img-content'>
            <h1>NOVI DUKSEVI</h1>
            <button>PRODAVNICA</button>
          </div>
        </div>
      </section>
    </HomeWrapper>
  );
};

export default Home;
