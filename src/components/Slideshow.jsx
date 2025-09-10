import React from 'react';
import Slider from 'react-slick';

import img1 from '../assets/slideshow1.png';
import img2 from '../assets/slideshow1.png';
import img3 from '../assets/slideshow1.png';
import img4 from '../assets/slideshow1.png';
import img5 from '../assets/slideshow1.png';
import img6 from '../assets/slideshow1.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SlideshowAssets = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const images = [img1, img2, img3, img4, img5, img6];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '24px auto',
      }}
    >
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              style={{
                width: '100%',
                height: '350px',
                objectFit: 'cover',
                borderRadius: '18px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideshowAssets;