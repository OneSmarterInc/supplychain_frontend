// components/Financial.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement, // Important for Pie/Donut charts
  Title,
  Tooltip,
  Legend
);

const Financial = () => {
  // Dummy data for the various charts
  const revenueData = {
    labels: ["Region 1", "Region 2", "Region 3"],
    datasets: [
      {
        label: "Smart Home Assistant (Channel 1)",
        data: [120000, 95000, 135000],
        backgroundColor: "#C5C5C5",
        barPercentage: 1,
        categoryPercentage: 0.3,
      },
      {
        label: "Smart Thermostat (Channel 1)",
        data: [110000, 90000, 125000],
        backgroundColor: "#9D9D9D",
        barPercentage: 1,
        categoryPercentage: 0.3,
      },
      {
        label: "Smart Home Assistant (Channel 2)",
        data: [130000, 105000, 145000],
        backgroundColor: "#848484",
        barPercentage: 1,
        categoryPercentage: 0.3,
      },
      {
        label: "Smart Thermostat (Channel 2)",
        data: [115000, 100000, 130000],
        backgroundColor: "#EF0D0D",
        barPercentage: 1,
        categoryPercentage: 0.3,
      },
    ],
  };

  const revenueOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Revenue in USD",
        },
      },
    },
  };

  const costData = {
    labels: ["Procurement", "Operating Expenses", "Marketing", "Transportation"],
    datasets: [
      {
        data: [50000, 30000, 20000, 15000],
        backgroundColor: [
          "#DA2929",
          "#FF7C7C",
          "#848484",
          "#C5C5C5",
        ],
      },
    ],
  };

  const costOptions = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          let value = tooltipItem.raw; // Access the raw data value
          return `$${value.toLocaleString()}`; // Format with dollar sign and comma separator
        }
      }
    }
  }
};

  const cashFlowData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Cash Inflows",
        data: [1000000, 1200000, 1100000, 1300000],
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
      {
        label: "Cash Outflows",
        data: [900000, 800000, 930000, 950000],
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  const cashFlowOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Cash Flow in USD",
        },
      },
    },
  };

  

  return (
    <div style={{ padding: "20px" }}>
      <div className="grid grid-cols-2 gap-6 mb-6 p-4 rounded-lg" style={{background:'white'}}>
        {/* Revenue Overview */}
        <div >
          <h2 className="text-red-600">Revenue Overview</h2>
          <Bar data={revenueData} options={revenueOptions} />
        </div>
        <div className="bg-white pl-2 pr-2">
          <h2 className="text-red-600 px-2 pb-2."> Instructions</h2>
        <div className="bg-white border  rounded-lg px-4 py-2">
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
      </div>

      {/* Cost Breakdown */}
      <div className="grid grid-cols-2 gap-0 py-4 p-2 rounded-lg" style={{background:'white'}}>
        <div className="w-100">
          <h2 className="text-red-600">Cash Flow Analysis</h2>
          <Line data={cashFlowData} options={cashFlowOptions} />
        </div>

        <div className="chart-container pb-2 pl-48 pr-48" style={{alignItems: "center" }}>
          <h2 className="text-red-600">Cost Breakdown</h2>
          <Pie data={costData} options={costOptions} />
        </div>
         {/* Cash Flow Analysis */}
      </div>
    </div>
  );
};

export default Financial;
