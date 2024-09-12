import React, { useContext, useEffect } from "react";
import RevenueDashboard from "./NetIncome";
import "./main.css";
import FirmRadarChart from "./EvaluateRadar";
import ForecastChart from "./ForecastChart";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

function Analytics() {

  const {api} = useContext(MyContext);
  const selectedSim = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const [reportData, setReportData] = React.useState('');

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const currentQuarter = selectedSim[0]?.current_quarter;
  const simulation_id = selectedSim[0]?.simulation_id;

  let firm_key = "";
  if (selectedSim[0]?.firm_data && Array.isArray(selectedSim[0].firm_data)) {
    let firm_obj = selectedSim[0].firm_data.filter((item) => {
      return item.emails && item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key = firm_obj[0].firmName; // Only one user in one firm, so using firm_obj[0]
    }
  }
  
  useEffect(() => {
    getEvalue();
  }, [simulation_id, firm_key, currentQuarter]);
  
  const getEvalue = async () => {
    try {
      const response = await axios.get(`${api}/reports/evaluation/`, {
        params: {
          simulation_id: simulation_id,
          firm_key: firm_key,
          selected_quarter: currentQuarter - 1,
        },
      });
      const data = response.data;
      
      setReportData(data[0]);
      console.log(data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="text-gray-800 text-3xl font-bold text-center py-4">
        Analytics Dashboard
      </div>
      <div className="analytics-container grid grid-cols-1 lg:grid-cols-2 gap-3 p-6">
        
        <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-3">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Firm Performance Overview
          </h2>
          <FirmRadarChart apiData={reportData} />
          {/* <p className="text-gray-600 mt-4">
            Insight: The firm's performance has improved in key areas such as customer satisfaction and market share. However, there is room for improvement in operational efficiency.
          </p> */}
        </div>

        <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Net Income to Expenses
          </h2>
          <RevenueDashboard simulation_id={simulation_id} firm_key={firm_key} previous_quarter={currentQuarter - 1} />
          {/* <p className="text-gray-600 mt-4">
            Insight: The net income has shown a steady increase over the past quarters, indicating strong financial health. However, a slight dip in the last quarter requires attention.
          </p> */}
        </div>

        <div className="lg:col-span-3 bg-white rounded-lg shadow-lg p-6 pb-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Forecast differnce from last Quarter
          </h2>
          <ForecastChart simulation_id={simulation_id} firm_key={firm_key} previous_quarter={currentQuarter - 1} />
          {/* <p className="text-gray-600 mt-4">
            Insight: Revenue is projected to grow by 10% in the next quarter, driven by new product launches and market expansion. Keep an eye on emerging market trends to adjust forecasts accordingly.
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default Analytics;