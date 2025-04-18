import React from "react";
import Slider, { LazyLoadTypes } from "react-slick";
import "./Carousel.scss"; // Import the SCSS file for styling

interface CarouselProps {
  images: string[];
  onSlideChanged: (currentSlide: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ images, onSlideChanged }) => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    lazyLoad: 'anticipated' as LazyLoadTypes,
    afterChange: (currentSlide: number) => onSlideChanged(currentSlide),
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
