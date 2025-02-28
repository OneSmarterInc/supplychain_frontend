import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { initializeDecisionStatus } from "./DecisionSubmit";

const StatusBar = ({ simulation_id, firm_key, quarter, api, current }) => {
  const [statusData, setStatusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initializeLoading, setInitializeLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch status from the API

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          `${api}/decision-status-get/${simulation_id}/${firm_key}/${quarter}/`
        );
        if (response.status === 404) {
          const response2 = initializeDecisionStatus(
            api,
            simulation_id,
            firm_key,
            quarter
          );
          setStatusData(response2.data);
        } else {
          setStatusData(response.data);
        }
      } catch (error) {
        console.error("Error fetching status data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [simulation_id, firm_key, quarter, api]);
  useEffect(() => {
    if (!statusData || statusData.length === 0) {
      initializeStatus();
    }
  }, [statusData]);
  const initializeStatus = async () => {
    setInitializeLoading(true);
    await initializeDecisionStatus(api, simulation_id, firm_key, quarter);
    setInitializeLoading(false);
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  // Decision labels
  const decisionLabels = [
    { key: "forecast", label: "Forecast" },
    { key: "procurement", label: "Procurement" },
    { key: "manufacture", label: "Manufacture" },
    { key: "distribution", label: "Distribution" },
    { key: "transport", label: "Transport" },
    { key: "demand", label: "Demand" },
    { key: "service", label: "Service" },
    { key: "it", label: "IT" },
  ];

  return (
    <div className="flex justify-center gap-0 items-center ">
      {decisionLabels.map(({ key, label }) => (
        <div
          key={key}
          className={`w-36 h-8 flex sm:text-sm md:text-base justify-center items-center font-bold shadow-md transition-colors duration-300 cursor-pointer 
            ${
              statusData[0][key]
                ? "bg-white border-b-4 border-green-500 text-green-500"
                : "bg-white border-b-2 border-gray-500 text-gray-500"
            }
            ${
              label === current
                ? " bg-white border-b-4 border-red-600 text-red-500"
                : ""
            }`}
          onClick={() => navigate(`/${label}`)}
        >
          {label}
          {statusData[0][key] ? <i className="fas fa-check ml-2"></i> : ""}
        </div>
      ))}
    </div>
  );
};

export default StatusBar;
