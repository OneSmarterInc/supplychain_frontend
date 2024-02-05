import React, { useState } from "react";
import Chart from "react-apexcharts";

const DataChart = () => {
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

  const [series, setSeries] = useState([
    {
      name: "Units Sold",
      data: [50, 60, 70, 80, 70, 60, 55, 65, 80, 85, 90, 100],
    },
  ]);

  return (
    <div className="app">
      <div className="row mx-5">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="area" width="630" />
        </div>
      </div>
    </div>
  );
};

export default DataChart;
