import React, { useState } from "react";

const testimonials = [
  {
    text: "Eudi no minavi se tentiae te vix. Par tem de mo ritum re prehe dunt in pro. Au gue ne more ceteri neius, cu fallitu cetero duo. Nec obli que lu patum in, an brute exercit fast idui qui. Pri ferri li bera visse in te preta risne, sonet vocent ea sit euo porte re it viu time am ofendit.",
    name: "Paulette Myers",
    title: "Art Director",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.",
    name: "John Doe",
    title: "CEO, CompanyX",
  },
  {
    text: "Mauris tempus erat laoreet turpis lobortis, eu tincidunt erat fermentum.",
    name: "Jane Smith",
    title: "Marketing Head",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-pink-200 text-center p-8 md:p-16 relative mx-4 md:mx-10 rounded-lg">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Testimonials</h2>
      <div className="flex flex-col items-center">
        <p className="text-base md:text-lg mb-4 max-w-3xl mx-auto">
          {testimonials[currentIndex].text}
        </p>
        <p className="font-semibold">{testimonials[currentIndex].name}</p>
        <p className="text-sm text-gray-600">
          {testimonials[currentIndex].title}
        </p>
      </div>

      {/* Navigation buttons */}
      <div className="absolute left-4 md:left-10 top-1/2 transform -translate-y-1/2">
        <button
          onClick={prevTestimonial}
          className="text-2xl md:text-3xl text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          ←
        </button>
      </div>
      <div className="absolute right-4 md:right-10 top-1/2 transform -translate-y-1/2">
        <button
          onClick={nextTestimonial}
          className="text-2xl md:text-3xl text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Testimonials;