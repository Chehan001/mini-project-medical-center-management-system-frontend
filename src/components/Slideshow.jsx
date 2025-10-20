import React from "react";
import Slider from "react-slick";

import img1 from "../assets/slideshow1.png";
import img2 from "../assets/slideshow1.png";
import img3 from "../assets/slideshow1.png";
import img4 from "../assets/slideshow1.png";
import img5 from "../assets/slideshow1.png";
import img6 from "../assets/slideshow1.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideshowAssets = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  const slides = [img1, img2, img3, img4, img5, img6];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        margin: "30px auto",
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Slider {...settings}>
        {slides.map((src, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={src}
              alt={`slide-${index}`}
              style={{
                width: "100%",
                height: "auto",       // height is auto
                aspectRatio: "16/9",  // rectangle shape
                objectFit: "cover",   // fill container
                borderRadius: "12px",
                transition: "transform 5s ease",
              }}
            />
          </div>
        ))}
      </Slider>

      {/* Responsive adjustments */}
      <style>
        {`
          @media (max-width: 900px) {
            .slick-slide img {
              aspect-ratio: 16/9;
            }
          }

          @media (max-width: 600px) {
            .slick-slide img {
              aspect-ratio: 16/9;
              border-radius: 12px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SlideshowAssets;
