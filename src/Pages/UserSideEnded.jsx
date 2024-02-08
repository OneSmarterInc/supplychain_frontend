import React, { useState } from "react";
import Chart from "react-apexcharts";
import UserNavBar from "../Components/UserNavBar";

const UserSideEnded = () => {
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
      data: [50, 60, 70, 80, 70, 60, 55, 65, 80, 85, 90, 100],
    },
  ]);
  return (
    <div>
      <UserNavBar />
      <h2 className="text-3xl p-2 ">Ended Simulation</h2>
      <div className="grid grid-cols-3 place-items-center">
        <div className="info">
          <h2 className="text-4xl p-2 underline underline-offset-1">
            MBA-Batch 2023 | Ended
          </h2>
          {/* <h2 className="text-3xl p-2">Current Quarter: 6</h2> */}
          <div className="buttons my-2">
            <button className="w-28 h-10 rounded-xl bg-green-600 text-white text-center p-2 mx-2 hover:bg-green-700">
              Enter
            </button>
            <button className="w-28 h-10 rounded-xl bg-red-500 text-white text-center p-2 hover:bg-red-600">
              Reports
            </button>
          </div>
        </div>
        <div className="graph col-span-2 place-self-center">
          <div className="mixed-chart my-10">
            <Chart
              options={options}
              series={series}
              type="area"
              width="850"
              mar
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSideEnded;
