import React from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./Profile";

const NavBar = () => {
  let id = localStorage.getItem("selectedSimulation");
  let simData = localStorage.getItem("simData");
  simData = JSON.parse(simData);

  const filteredSimulation = simData.filter(
    (item) => item.simulation_id === parseInt(id)
  );

  console.log("filteredSimulation", filteredSimulation);

  let current_quarter = `quarter${filteredSimulation[0]["current_quarter"]}`; //note: -1 for temporary to sort error

  console.log("current_quarter", current_quarter);
  const decisions =
    filteredSimulation[0]["quarter_specific_decisions"][current_quarter];
  // const decisions = filteredSimulation[0]['quarter_specific_decisions']["quarter2"];
  console.log("decisions from navbar", decisions);

  return (
    <div>
      <nav style={{ fontFamily: "ABeeZee" }} className="">
        <div className="flex flex-col items-center justify-center sm:items-stretch sm:justify-between">
          <div className=" bg-gray-800 py-1 px-3 flex justify-between items-center  ">
            <div className="text-2xl text-white font-bold ">
              Supplychain Simulation
            </div>
            <div className="text-2xl font-serif w-40 flex justify-between items-center mx-3 text-white font-bold pl-14">
              <div className="mx-3">
                <ProfileDropdown />
              </div>
              <Link to="/" className="">
                <i className="fa-solid fa-house cursor-pointer"></i>
              </Link>
            </div>
          </div>
          <div className=" hidden sm:block bg-white">
            <div className=" flex justify-evenly space-x-4 py-1">
              {decisions?.is_forecasting === true && (
                <Link
                  to="/forecast"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Forecast
                </Link>
              )}
              {decisions?.is_procurement === true && (
                <Link
                  to="/procurement"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Procurements
                </Link>
              )}
              {decisions?.is_manufacturing === true && (
                <Link
                  to="/manufacturing"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Manufacturing
                </Link>
              )}
              {decisions?.is_distribution === true && (
                <Link
                  to="/distribution"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Distribution
                </Link>
              )}
               {decisions?.is_transportation === true && (
                <Link
                  to="/transportation"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Transport
                </Link>
              )}
              {decisions?.is_service === true && (
                <Link
                  to="/service"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Service
                </Link>
              )}
              {decisions?.is_demand_gen === true && (
                <Link
                  to="/demand"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  Demand
                </Link>
              )}
              {decisions?.is_it === true && (
                <Link
                  to="/it"
                  className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
                >
                  IT
                </Link>
              )}{" "}
             
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
