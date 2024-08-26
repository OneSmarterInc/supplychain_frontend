import React from "react";
import featuresImg from "../Assets/FeaturesImg.png";

const HomeFeatures = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white">
      <div className="pb-10 w-full max-w-5xl">
        <img src={featuresImg} alt="Features" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default HomeFeatures;