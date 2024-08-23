import React from "react";
import RevenueDashboard from "./NetIncome";
import "./main.css";
import FirmRadarChart from "./EvaluateRadar";
import ForecastChart from "./ForecastChart";

function Analytics() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-gray-800 text-3xl font-bold text-center py-6">
        Analytics Dashboard
      </div>
      <div className="analytics-container grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        
        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Firm Performance Overview
          </h2>
          <FirmRadarChart />
          <p className="text-gray-600 mt-4">
            Insight: The firm's performance has improved in key areas such as customer satisfaction and market share. However, there is room for improvement in operational efficiency.
          </p>
        </div>

        <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Net Income Analysis
          </h2>
          <RevenueDashboard />
          <p className="text-gray-600 mt-4">
            Insight: The net income has shown a steady increase over the past quarters, indicating strong financial health. However, a slight dip in the last quarter requires attention.
          </p>
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Forecast differnce from last Quarter
          </h2>
          <ForecastChart />
          <p className="text-gray-600 mt-4">
            Insight: Revenue is projected to grow by 10% in the next quarter, driven by new product launches and market expansion. Keep an eye on emerging market trends to adjust forecasts accordingly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;