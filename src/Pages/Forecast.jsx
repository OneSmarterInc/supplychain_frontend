import React from "react";
import Forecasting_sales from "../Components/Forecasting_sales";
import Forecasting_sales2 from "../Components/Forecasting_sales2";
import { HStack, Select } from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";
const Forecast = () => {


  return (
    <div className=" ">
      <NavBar/>
      <h1 className="text-4xl text-start px-3 py-2 underline">
        Forecasting Decision
      </h1>
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="rounded-lg -2xl h-full  flex flex-col justify-center">
          <Forecasting_sales />
        </div>
        <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg />
        </div>
        <div className="rounded-lg -2xl h-96  flex flex-col justify-center">
          <Forecasting_sales2 />
        </div>
        <DataChart/>
      </div>
    </div>
  );
};

export default Forecast;
