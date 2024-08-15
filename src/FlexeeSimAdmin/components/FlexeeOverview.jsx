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
    <div className="flex justify-center w-full">
      <div className=" mx-20 px-4 py-16">
        <div className="flex space-x-2 items-end">
          <div className="">
            <h1 className="text-4xl font-bold text-start mb-8">
              FLEXEE OVERVIEW
            </h1>
            <p className="text-lg text-gray-600 text-start mr-12  mb-12">
              <span className="text-red-500 font-semibold">FLEXEE </span> is a
              comprehensive supply chain management simulation that encompasses
              all major elements of the supply chain, including suppliers,
              manufacturers, distributors, retailers, and end-users. Firms
              participating in FLEXEE are responsible for managing a wide range
              of activities, including:
            </p>
            <p className="text-lg bg-red-600 text-start py-1 w-40"></p>
          </div>

          <div className="grid grid-cols-4">
            <div className="w-[700px] grid grid-cols-4">
              <div className="flex flex-col justify-end items-center">
                <div className="my-1">
                  <img src={IT} alt="" className="h-20" />
                </div>
                <div className="h-40 bg-purple-500 w-full relative ">
                  <h1 className="text-white text-lg text-start  p-2 font-semibold">
                    INFORMATION TECHNOLOGY
                  </h1>
                  <h1 className="text-white text-sm px-2 text-start">
                    Mechanization, steam power, weawing loom
                  </h1>
                  <div className="h-20 p-1 w-20 bg-purple-600 rounded-full absolute -bottom-10 left-12">
                    <img
                      src={settingIt}
                      alt=""
                      className=" rounded-full bg-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end items-center">
                <div className="my-1">
                  <img src={Forecast} alt="" className="h-20" />
                </div>
                <div className="h-44 bg-pink-900 w-full relative">
                  {" "}
                  <h1 className="text-white text-lg text-start  p-2 font-semibold">
                    {" "}
                    FORECASTING
                  </h1>
                  <h1 className="text-white  text-sm px-2 text-start">
                    Mass production, assembly line, electrical energy
                  </h1>
                  <div className="h-20 p-1 w-20 bg-pink-950 rounded-full absolute -bottom-10 left-12">
                    <img
                      src={routeForecast}
                      alt=""
                      className=" rounded-full bg-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end items-center">
                <div className="my-1">
                  <img src={Demand} alt="" className="h-20" />
                </div>
                <div className="h-48 bg-blue-500 w-full relative">
                  {" "}
                  <h1 className="text-white text-lg text-start  p-2 font-semibold">
                    DEMAND MANAGEMENT
                  </h1>
                  <h1 className="text-white  text-sm px-2 text-start">
                    Automation, Computers and Electronics
                  </h1>
                  <div className="h-20 p-1 w-20 bg-blue-600 rounded-full absolute -bottom-10 left-12">
                    <img
                      src={chipDemand}
                      alt=""
                      className=" rounded-full bg-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end items-center">
                <div className="my-1">
                  <img src={Service} alt="" className="h-20" />
                </div>
                <div className="h-52 bg-green-500 w-full relative">
                  {" "}
                  <h1 className="text-white text-lg text-start  p-2 font-semibold">
                    CUSTOMER SERVICE
                  </h1>
                  <h1 className="text-white  text-sm px-2 text-start">
                    Cyber Physical Systems, internet of things, networks
                  </h1>
                  <div className="h-20 p-1 w-20 bg-green-600 rounded-full absolute -bottom-10 left-12">
                    <img
                      src={wifiService}
                      alt=""
                      className=" rounded-full bg-cover h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-16">
          <div className="relative">
            <div className="bg-red-500 p-1 rounded absolute left-0 top-16">
              <h3 className="text-lg font-bold text-white">MANUFACTURING</h3>
            </div>
            <img
              src={image1}
              alt="Manufacturing"
              className="rounded-md w-full h-full object-cover mt-2"
            />
          </div>
          <div className="relative">
            <div className="bg-red-500 p-1 rounded absolute left-0 top-16">
              <h3 className="text-xl font-bold text-white">WARE HOUSING</h3>
            </div>
            <img
              src={image2}
              alt="Ware Housing"
              className="rounded-md w-full h-full object-cover mt-2"
            />
          </div>
          <div className="relative">
            <div className="bg-red-500 p-1 rounded absolute left-0 top-16">
              <h3 className="text-xl font-bold text-white">TRANSPORTATION</h3>
            </div>
            <img
              src={image3}
              alt="Transportation"
              className="rounded-md w-full h-full object-cover mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexeeOverview;
