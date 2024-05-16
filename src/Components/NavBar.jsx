import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  let id = localStorage.getItem("selectedSimulation");
  let simData = localStorage.getItem("simData");
  simData = JSON.parse(simData);

  const filteredSimulation = simData.filter(
    (item) => item.simulation_id === parseInt(id)
  );
  localStorage.setItem("selectedSim", JSON.stringify(filteredSimulation));
  let current_quarter = `quarter${filteredSimulation[0]["current_quarter"]}`;
  const decisions =
    filteredSimulation[0]["quarter_specific_decisions"][current_quarter];
  console.log(decisions);
  // const decisions = filteredSimulation[0]['quarter_specific_decisions']["quarter2"];
  console.log(decisions.is_procurement);

  return (
    <div>
      <nav className="bg-gray-800 w-full">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <p className="text-2xl text-white font-bold">
                  Supplychain Simulation
                </p>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Home
                  </Link>
                  {decisions.is_forecasting === "True" && (
                    <Link
                      to="/forecast"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                    >
                      Forecast
                    </Link>
                  )}
                  {decisions.is_procurement === "True" && (
                    <Link
                      to="/procurement"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                    >
                      Procurements
                    </Link>
                  )}
                  {decisions.is_manufacturing === "True" && (
                    <Link
                      to="/manufacturing"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                    >
                      Manufacturing
                    </Link>
                  )}
                  {decisions.is_distribution === "True" && (
                    <Link
                      to="/distribution"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                    >
                      Distribution
                    </Link>
                  )}

                  {decisions.is_transportation === "True" && (
                    <Link
                      to="/transportation"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                    >
                      Transport
                    </Link>
                  )}

                  {decisions.is_service === "True" && (
                    <Link
                      to="/service"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                    >
                      Service
                    </Link>
                  )}
                  {decisions.is_demand_gen === "True" && (
                    <Link
                      to="/demand"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                    >
                      Demand
                    </Link>
                  )}
                
                  
                  {decisions.is_it === "True" && (
                    <Link
                      to="/it"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                    >
                      IT
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
