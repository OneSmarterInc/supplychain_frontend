import React, { useState } from "react";
import slider1 from "../Assets/slider1.png";
import slider2 from "../Assets/slider2.png";
import slider3 from "../Assets/slider3.png";
import slider4 from "../Assets/slider4.png";

const images = [slider1, slider2, slider3, slider4];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full  h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="min-w-full flex justify-center items-center"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-[calc(100%-20px)] h-[calc(100%-20px)] object-cover"
              style={{ padding: "10px" }}
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 bg-gray-800 text-white p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 bg-gray-800 text-white p-2 rounded-full"
      >
        &gt;
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2  flex justify-center w-full">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full mx-2  border-2 border-red-500 ${
              currentIndex === index ? "bg-red-600" : "border-red-400 bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
