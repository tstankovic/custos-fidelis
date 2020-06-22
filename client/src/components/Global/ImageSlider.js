import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FcPrevious, FcNext } from 'react-icons/fc';

// import PrincipDuksImg from '../../images/princip-duks.png';

const ImageSliderWrapper = styled.div`
  width: 1100px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;

  .slider {
    padding: 3rem 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .image {
    flex-shrink: 0;
    padding-right: 50px;
  }

  .prev,
  .next {
    position: absolute;
    height: 100%;
    width: 50px;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .prev {
    left: 0;
  }

  .next {
    left: calc(100% - 50px);
  }

  .icon {
    cursor: pointer;
    z-index: 1;
  }
`;

const ImageSlider = () => {
  const [counter, setCounter] = useState(2);
  const [shirts, setShirts] = useState([]);

  const sliderEl = useRef();

  useEffect(() => {
    axios.get('/api/products/contentful/fixed/shirt/5').then((res) => {
      setShirts(
        res.data.items.map((item) => ({
          id: item.sys.id,
          url: item.fields.images[0].fields.file.url,
        }))
      );
    });
  }, []);

  useEffect(() => {
    sliderEl.current.style.transform = `translateX(${-counter * 350}px)`;
  }, [counter]);

  const handlePrev = () => {
    if (counter <= 0) return;
    sliderEl.current.style.transition = 'transform 0.5s ease-in-out';
    setCounter((prev) => prev + 1);
  };

  const handleNext = () => {
    if (counter >= shirts.length + 1) return;
    sliderEl.current.style.transition = 'transform 0.5s ease-in-out';
    setCounter((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (counter < 0) {
      setCounter(0);
    }

    if (counter > shirts.length + 1) {
      setCounter(shirts.length);
    }

    if (counter === 0) {
      sliderEl.current.style.transition = 'none';
      setCounter(shirts.length);
    }

    if (counter === shirts.length + 1) {
      sliderEl.current.style.transition = 'none';
      setCounter(1);
    }
  };

  return (
    <ImageSliderWrapper>
      <div className='prev'>
        <FcPrevious size={40} className='icon' onClick={handlePrev} />
      </div>
      <div
        className='slider'
        ref={sliderEl}
        onTransitionEnd={handleTransitionEnd}
      >
        {shirts.length && (
          <div className='image'>
            <img
              width='300px'
              height='300px'
              src={shirts[shirts.length - 2].url}
              alt='shirt'
            />
          </div>
        )}
        {shirts.length && (
          <div className='image'>
            <img
              width='300px'
              height='300px'
              src={shirts[shirts.length - 1].url}
              alt='shirt'
            />
          </div>
        )}
        {shirts.map((shirt, i) => (
          <div className='image' key={i}>
            <img width='300px' height='300px' src={shirt.url} alt='shirt' />
          </div>
        ))}
        {shirts.length && (
          <div className='image'>
            <img width='300px' height='300px' src={shirts[0].url} alt='shirt' />
          </div>
        )}
        {shirts.length && (
          <div className='image'>
            <img width='300px' height='300px' src={shirts[1].url} alt='shirt' />
          </div>
        )}
      </div>
      <div className='next'>
        <FcNext size={40} className='icon' onClick={handleNext} />
      </div>
    </ImageSliderWrapper>
  );
};

export default ImageSlider;
