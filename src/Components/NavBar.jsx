import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  let id = localStorage.getItem("selectedSimulation");
  let simData = localStorage.getItem("simData");
  simData = JSON.parse(simData);

  const filteredSimulation = simData.filter(
    (item) => item.simulation_id === parseInt(id)
  );

  console.log("filteredSimulation", filteredSimulation);

  let current_quarter = `quarter${
    filteredSimulation[0]["current_quarter"] - 1
  }`; //note: -1 for temporary to sort error

  console.log("current_quarter", current_quarter);
  const decisions =
    filteredSimulation[0]["quarter_specific_decisions"][current_quarter];
  console.log(decisions);
  // const decisions = filteredSimulation[0]['quarter_specific_decisions']["quarter2"];
  console.log("decisions from navbar", decisions?.is_procurement);

  return (
    <div>
      <nav style={{ fontFamily: "ABeeZee" }} className="">
        <div className="flex flex-col items-center justify-center sm:items-stretch sm:justify-between">
          <div className=" bg-gray-800 py-2 px-3 flex justify-between items-center  ">
            <div className="text-2xl text-white font-bold ">
              Supplychain Simulation
            </div>
            <div className="text-2xl w-32 flex justify-between mx-3 text-white font-bold pl-14">
              <Link to="/" className="">
                <i className="fa-solid fa-user cursor-pointer"></i>
              </Link>
              <Link to="/" className="">
                <i className="fa-solid fa-house cursor-pointer"></i>
              </Link>
            </div>
          </div>
          <div className=" hidden sm:block bg-white">
            <div className=" flex justify-evenly space-x-4 py-1">
              {decisions?.is_forecasting === "True" && (
                <Link
                  to="/forecast"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Forecast
                </Link>
              )}
              {decisions?.is_procurement === "True" && (
                <Link
                  to="/procurement"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Procurements
                </Link>
              )}
              {decisions?.is_manufacturing === "True" && (
                <Link
                  to="/manufacturing"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Manufacturing
                </Link>
              )}
              {decisions?.is_distribution === "True" && (
                <Link
                  to="/distribution"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Distribution
                </Link>
              )}

              {decisions?.is_transportation === "True" && (
                <Link
                  to="/transportation"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Transport
                </Link>
              )}

              {decisions?.is_service === "True" && (
                <Link
                  to="/service"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Service
                </Link>
              )}
              {decisions?.is_demand_gen === "True" && (
                <Link
                  to="/demand"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Demand
                </Link>
              )}

              {decisions?.is_it === "True" && (
                <Link
                  to="/it"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  IT
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
