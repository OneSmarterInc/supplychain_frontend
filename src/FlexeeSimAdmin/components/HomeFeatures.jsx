import React from "react";
import featuresImg from "../Assets/FeaturesImg.png";

const HomeFeatures = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="pb-10">
        <img src={featuresImg} alt="" className="w-full h-96" />
      </div>
    </div>
  );
};

export default HomeFeatures;
