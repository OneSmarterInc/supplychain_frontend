import React, { useState } from "react";
import Chart from "react-apexcharts";
import UserNavBar from "../Components/UserNavBar";

const UserSideLive = () => {
  document.body.style.backgroundColor = "#e0e2e4";
  // eslint-disable-next-line
  const [options, setOptions] = useState({
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });
  // eslint-disable-next-line
  const [series, setSeries] = useState([
    {
      name: "Units Sold",
      data: [1276, 2386, 3649, 7066, 11132, 30000, 55000, 65526, 56523, 85000, 90236, 100000],
    },
  ]);
  return (
    <div>
      <UserNavBar />
      <h2 className="text-3xl p-2 pl-10 ">Live Simulation</h2>
      <div className="flex h-80 bg-slate-200 justify-around items-center mx-10 rounded-lg  border-2 border-neutral-600">
        <div className="info">
          <h2 className="text-3xl p-2 underline underline-offset-1">
            MBA-Batch 2023 |<span className="text-3xl p-2">Current Quarter: 6</span>
          </h2>
         
          <div className="buttons my-2">
            <button className="w-32 h-10 rounded-lg  bg-sky-900 text-white text-center p-2 mx-2 hover:bg-sky-950">
              Enter
            </button>
            <button className="w-28 h-10 rounded-lg  bg-green-600 text-white text-center p-2 hover:bg-green-700">
              Reports
            </button>
          </div>
        </div>
        <div className="graph ">
          <div className="mixed-chart pt-4">
            <Chart
              options={options}
              series={series}
              type="area"
              width="450"
              mar
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSideLive;
