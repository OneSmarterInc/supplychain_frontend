import { background } from "@chakra-ui/react";
import React from "react";
import { Line, Bar } from "react-chartjs-2";

const Customer = () => {
  // Example data for Market Penetration Rate (Team 1)
  const quarterlyMarketPenetrationData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Smart Home Assistant",
        data: [0.35, 0.38, 0.42, 0.45], // Market penetration rate for SHA
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.4)",
        tension: 0.1,
      },
      {
        label: "Smart Thermostat",
        data: [0.3, 0.33, 0.35, 0.37], // Market penetration rate for ST
        fill: false,
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.4)",
        tension: 0.1,
      },
    ],
  };

  // Example data for Customer Satisfaction Index (CSI) (Team 1)
  const quarterlyCSIData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Smart Home Assistant",
        data: [85, 88, 90, 91], // CSI for SHA (out of 100)
        backgroundColor: "#DA2929",
        barPercentage: 1,
        categoryPercentage: 0.3,

        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
      },
      {
        label: "Smart Thermostat",
        data: [80, 83, 85, 88], // CSI for ST (out of 100)
        backgroundColor: "#848484",
        barPercentage: 1,
        categoryPercentage: 0.3,

        hoverBackgroundColor: "rgba(255, 99, 132, 0.8)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  // Example data for Customer Flipping (Team 1) (Stacked Bar Chart)
  const customerFlippingData = {
    labels: [
      "Region 1-ch1",
      "Region 1-ch2",
      "Region 2-ch1",
      "Region 2-ch2",
      "Region 3-ch1",
      "Region 3-ch2",
    ],
    datasets: [
      {
        label: "Retained Customers",
        data: [5000, 6000, 4500, 5500, 6200, 4800], // Number of retained customers for Team 1
        backgroundColor: "#848484",
      },
      {
        label: "Flipped Customers",
        data: [1500, 1200, 1000, 1400, 1800, 1100], // Number of customers flipped from Team 1 to other teams
        backgroundColor: "#DA2929",
      },
    ],
  };

  const options = {
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <div className="grid grid-cols-2 gap-6 mb-6 p-4 rounded-lg" style={{background:'white'}}>
        <div>
          <h2 className="text-red-600">Quarterly Market Penetration Rate</h2>
          <Line data={quarterlyMarketPenetrationData} />
        </div>

        <div className="bg-white rounded-lg p-2 border">
          <h2 className="text-red-600"> Instructions</h2>
          <ul className="list-disc list-inside p-2 ">
            <li>
              Retained earnings this month are at $12,179,142.13. To stay
              competitive, focus on reinvesting in growth areas while
              controlling operational expenses to align with industry leaders.
            </li>
          </ul>
        {/* <span className="text-gray-300"><i>ai generated</i></span> */}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6 p-4 rounded-lg" style={{background:'white'}}>
        <div style={{ width: "600px", marginBottom: "40px" }}>
          <h2 className="text-red-600">Quarterly Customer Satisfaction Index (CSI)</h2>
          <Bar data={quarterlyCSIData} />
        </div>

        <div style={{ width: "600px", marginBottom: "40px" }}>
          <h2 className="text-red-600">Customer Flipping - Q4 (Team 1)</h2>
          <Bar data={customerFlippingData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Customer;
