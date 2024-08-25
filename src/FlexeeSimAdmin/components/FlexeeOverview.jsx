import React from "react";
import image1 from "../Assets/Rectangle 10.png";
import image2 from "../Assets/Rectangle 11.png";
import image3 from "../Assets/Rectangle 12.png";
import IT from "../Assets/IT.png";
import Service from "../Assets/Service.png";
import Demand from "../Assets/Demand.png";
import Forecast from "../Assets/Forecast.png";
import settingIt from "../Assets/settingIt.png";
import wifiService from "../Assets/wifiService.png";
import chipDemand from "../Assets/chipDemand.png";
import routeForecast from "../Assets/routerForecast.png";

const FlexeeOverview = () => {
  return (
    <div className="flex justify-center w-full bg-gray-50 py-16">
      <div className="w-full max-w-7xl mx-4 px-4 md:px-8">
        <div className="flex flex-col md:flex-row space-y-8 md:space-x-4 items-start">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-start mb-4">
              FLEXEE OVERVIEW
            </h1>
            <p className="text-base md:text-lg text-gray-600 text-start mb-6">
              <span className="text-red-500 font-semibold">FLEXEE </span> is a comprehensive supply chain management simulation that encompasses all major elements of the supply chain, including suppliers, manufacturers, distributors, retailers, and end-users. Firms participating in FLEXEE are responsible for managing a wide range of activities, including:
            </p>
            <div className="w-32 h-1 bg-red-600 mb-8"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard
              title="INFORMATION TECHNOLOGY"
              description="Mechanization, steam power, weaving loom"
              imgSrc={IT}
              iconSrc={settingIt}
              bgColor="bg-purple-500"
              iconBgColor="bg-purple-600"
            />
            <FeatureCard
              title="FORECASTING"
              description="Mass production, assembly line, electrical energy"
              imgSrc={Forecast}
              iconSrc={routeForecast}
              bgColor="bg-pink-900"
              iconBgColor="bg-pink-900"
            />
            <FeatureCard
              title="DEMAND MANAGEMENT"
              description="Automation, Computers and Electronics"
              imgSrc={Demand}
              iconSrc={chipDemand}
              bgColor="bg-blue-500"
              iconBgColor="bg-blue-600"
            />
            <FeatureCard
              title="CUSTOMER SERVICE"
              description="Cyber Physical Systems, internet of things, networks"
              imgSrc={Service}
              iconSrc={wifiService}
              bgColor="bg-green-500"
              iconBgColor="bg-green-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <ImageCard title="MANUFACTURING" imgSrc={image1} />
          <ImageCard title="WAREHOUSING" imgSrc={image2} />
          <ImageCard title="TRANSPORTATION" imgSrc={image3} />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ title, description, imgSrc, iconSrc, bgColor, iconBgColor }) => (
  <div className="flex flex-col justify-end items-center">
    <img src={imgSrc} alt={title} className="h-16 md:h-20 mb-2" />
    <div className={`h-48 w-full relative ${bgColor}`}>
      <h1 className="text-white text-lg md:text-xl font-semibold p-2">{title}</h1>
      <p className="text-white text-sm px-2">{description}</p>
      <div className={`h-16 md:h-20 w-16 md:w-20 ${iconBgColor} rounded-full absolute -bottom-8 left-1/2 transform -translate-x-1/2`}>
        <img src={iconSrc} alt={title} className="h-full w-full rounded-full" />
      </div>
    </div>
  </div>
);

const ImageCard = ({ title, imgSrc }) => (
  <div className="relative">
    <div className="bg-red-500 p-2 rounded absolute left-0 top-4 md:top-8">
      <h3 className="text-lg md:text-xl font-bold text-white">{title}</h3>
    </div>
    <img
      src={imgSrc}
      alt={title}
      className="rounded-md w-full h-full object-cover mt-8 md:mt-2"
    />
  </div>
);

export default FlexeeOverview;