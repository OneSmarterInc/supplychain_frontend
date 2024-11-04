import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios"; // Ensure axios is imported
import MyContext from "../Components/ContextApi/MyContext";

const SimRoute = ({ children }) => {
  const { api } = useContext(MyContext);
  const [simData, setSimData] = useState(false); // Initialize as null to differentiate between no data and loading state
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const getAllData = async () => {
      try {
        const response = await axios.get(`${api}/getsim/${user.sim_data}`);
        if (response.status === 200) {
           
            setSimData(response.data[0].is_deployed);
          localStorage.setItem("simData", JSON.stringify(response.data));
          localStorage.setItem("selectedSimulation", JSON.stringify(response.data[0].simulation_id));
          localStorage.setItem("selectedSimData", JSON.stringify(response.data));
          localStorage.setItem("selectedSim", JSON.stringify(response.data));
        }
      } catch (error) {
        console.error("Error fetching simulation data", error);
      }
    };

    // Fetch data only if user exists
    if (user) {
      getAllData();
    }
  }, [api]);

  // Redirect to dashboard if simData is loaded
  if (simData) {
    return <Navigate to="/dashboard" />;
  }

  // Render children if no simData yet (or while loading)
  return children;
};

export default SimRoute;