import React, { useRef, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Ensure compatibility with installed versions
import "./OperationalDashboard.css"; // CSS for styling

const Operational = () => {
  const barChartRef = useRef(null);
  const lineChartRef1 = useRef(null);
  const lineChartRef2 = useRef(null);



  // Quarterly Production Levels (Bar Chart)
  const quarterlyProductionData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Smart Home Assistant",
        data: [15000, 20000, 18000, 22000],
        backgroundColor: "#C5C5C5",
        barPercentage: 1,
        categoryPercentage: 0.3,
      },
      {
        label: "Smart Thermostat",
        data: [12000, 14000, 13000, 17000],
        backgroundColor: "#EF0D0D",
        barPercentage: 1,
        categoryPercentage: 0.3,
      },
    ],
  };

  // Quarterly Shipment Statistics (Line Chart)
  const quarterlyShipmentData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Region 1",
        data: [12000, 15000, 18000, 17000],
        borderColor: "red",
        tension: 0.1,
      },
      {
        label: "Region 2",
        data: [14000, 16000, 15000, 18000],
        borderColor: "gray",
        tension: 0.1,
      },
      {
        label: "Region 3",
        data: [11000, 14000, 18000, 24000],
        borderColor: "pink",
        tension: 0.1,
      },
    ],
  };

  // Q4 Fill Rate Data (Pie Chart)
  const quarterlyFillRateData = {
    labels: ["On-time Orders %", "Late Orders %"],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: ["red", "gray"],
        hoverBackgroundColor: ["darkred", "darkgray"],
      },
    ],
  };

  // Quarterly Defect Rate (Line Chart)
  const quarterlyDefectRateData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Smart Home Assistant",
        data: [0.02, 0.015, 0.018, 0.017],
        borderColor: "red",
        tension: 0.1,
      },
      {
        label: "Smart Thermostat",
        data: [0.025, 0.02, 0.023, 0.022],
        borderColor: "gray",
        tension: 0.1,
      },
    ],
  };

  return (
    <div style={{ padding: "20px",  height:'100vh' }}>
      <div
        className="grid grid-cols-2 gap-6 mb-6 p-4 rounded-lg"
        style={{ background: "white" }}
      >
        <div className="chart-container">
          <h2 className="text-red-600">Quarterly Production Levels</h2>
          <Bar ref={barChartRef} data={quarterlyProductionData} />
        </div>
        <div className="bg-white border  rounded-lg p-2">
          <h2 className="text-red-600"> Instructions</h2>
          <ul className="list-disc list-inside p-2">
            <li>
              Retained earnings this month are at $12,179,142.13. To stay
              competitive, focus on reinvesting in growth areas while
              controlling operational expenses to align with industry leaders.
            </li>
          </ul>
          {/* <span className="text-gray-300"><i>ai generated</i></span> */}
        </div>
      </div>

      <div
        className="grid grid-cols-3 gap-2 p-1 rounded-lg pb-10"
        style={{ background: "white" }}
        >
        <div className="chart-container">
          <h2 className="text-red-600">Quarterly Shipment Statistics</h2>
          <Line ref={lineChartRef1} data={quarterlyShipmentData} />
        </div>

        <div className="chart-container">
          <h2 className="text-red-600">Quarterly Defect Rate</h2>
          <Line ref={lineChartRef2} data={quarterlyDefectRateData} />
        </div>

        <div className="chart-container pb-2 pl-28 pr-28" style={{alignItems: "center" }}>
          <h2 className="text-red-600">Q4 Fill Rate</h2>
          <Pie data={quarterlyFillRateData} />
        </div>
      </div>
    </div>
  );
};

export default Operational;
