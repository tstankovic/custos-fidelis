import React, { useEffect } from 'react';
import styled from 'styled-components';

import HeroImg from '../images/hero-main.jpg';
import HeroNew from '../images/hero-new.jpg';
import PrincipMajicaImg from '../images/princip-majica.jpg';
import CrniDuksImg from '../images/crni-duks-sunce.jpg';
import ModelLogoImg from '../images/Model-logo-1.jpg';
import FbIcon from '../images/fb-icon.png';
import InstaIcon from '../images/insta-icon.png';
import YtIcon from '../images/yt-icon.png';
import FbIconDark from '../images/fb-icon-dark.png';
import InstaIconDark from '../images/insta-icon-dark.png';
import YtIconDark from '../images/yt-icon-dark.png';

import ImageSlider from '../components/Global/ImageSlider';

const HomeWrapper = styled.main`
  .hero {
    min-height: 100vh;
    background-image: url(${HeroImg});
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
    background-color: lightsalmon;
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
          <button className='shop-btn'>КУПИ</button>
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
          style={{ backgroundImage: `url(${CrniDuksImg})` }}
        >
          <div className='hero-slider-img-content'>
            <h1>ПРИНЦИП ДУКС</h1>
            <button>ПРОДАВНИЦА</button>
          </div>
        </div>
        <div
          className='hero-slider-img'
          style={{ backgroundImage: `url(${ModelLogoImg})` }}
        >
          <div className='hero-slider-img-content'>
            <h1>ПРИНЦИП ДУКС</h1>
            <button>ПРОДАВНИЦА</button>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='icons-wrapper'>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={FbIcon} alt='facebook' className='img-main' />
              <img src={FbIconDark} alt='facebook' className='img-dark' />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={InstaIcon} alt='instagram' className='img-main' />
              <img src={InstaIconDark} alt='instagram' className='img-dark' />
            </a>
            <a
              href='https://youtube.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={YtIcon} alt='youtube' className='img-main' />
              <img src={YtIconDark} alt='youtube' className='img-dark' />
            </a>
          </div>
        </div>
      </section>
    </HomeWrapper>
  );
};

export default Home;
