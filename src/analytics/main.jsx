import React from "react";
import RevenueDashboard from "./NetIncome";
import "./main.css";
import HighlightFirmChart from "./Evaluate";
import FirmRadarChart from "./EvaluateRadar";
import ForecastChart from "./ForecastChart";
function Analytics() {
  return (
    <div className="">
      <div className=" text-gray-900 text-2xl text-center py-2">Dashboard</div>
      <div className="analytics-container grid grid-cols-2 bg-purple-100  py-20 pt-0">
        <div className="content">
          <HighlightFirmChart />
        </div>
        <div className="content flex flex-col justify-evenly items-center px-4">
          <div className="w-full rounded-md shadow-md h-full m-3 bg-pink-100">
            {" "}
            <FirmRadarChart />
          </div>
          <div className="w-full rounded-md shadow-md h-full m-3 bg-pink-100">
            <RevenueDashboard />
          </div>
          <div className="w-full rounded-md shadow-md h-full m-3 bg-pink-100">
            {" "}
            <ForecastChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
