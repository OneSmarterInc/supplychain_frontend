import React from "react";
import aboutus from "../Assets/about.png";

const AboutUs = () => {
  return (
    <div className="w-screen h-screen">
      
      <div className="flex  justify-evenly  items-center bg-white p-6">
        <div className="">
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-2">
              Dolore dolore voluptate aliqua ut mi
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About us</h2>
            <p className="text-teal-500 text-2xl mb-4">
              Supply Chain Simulation
            </p>
            <p className="text-gray-700">
              TO PERFECT WHAT IS BUILT WHILE PROTECTING WHAT IS NATURAL.
            </p>
          </div>
          <button className="mt-6 bg-transparent border-2 border-teal-500 text-teal-500 py-2 px-4 rounded">
            Learn more
          </button>
        </div>
        <div className="mt-8">
          <img
            src={aboutus}
            alt="Supply Chain Simulation"
            className=" w-96 rounded-t-full h-96 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
