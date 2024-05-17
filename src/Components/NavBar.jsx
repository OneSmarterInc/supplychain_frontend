import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="  ">
        <div className="flex flex-col items-center justify-center sm:items-stretch sm:justify-between">
          <div className=" bg-gray-800 py-2 px-3 flex justify-between items-center  ">
            <div className="text-2xl text-white font-bold pl-14">
              Supplychain Simulation
            </div>
            <div className="text-2xl w-32 flex justify-between mx-3 text-white font-bold pl-14">
              <Link to="/" className="">
                <i class="fa-solid fa-user cursor-pointer"></i>
              </Link>
              <Link to="/" className="">
                <i class="fa-solid fa-house cursor-pointer"></i>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex justify-evenly space-x-4 py-1">
              <Link
                to="/procurement"
                className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
              >
                Procurements
              </Link>
              <Link
                to="/manufacturing"
                className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
              >
                Manufacturing
              </Link>
              <Link
                to="/distribution"
                className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
              >
                Distribution
              </Link>

              <Link
                to="/service"
                className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
              >
                Service
              </Link>
              <Link
                to="/forecast"
                className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
              >
                Forecast
              </Link>
              <Link
                to="/demand"
                className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
              >
                Demand
              </Link>
              <Link
                to="/transportation"
                className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
              >
                Transportation
              </Link>

              <Link
                to="/it"
                className="text-orange-400  hover:text-red-500 rounded-md px-3 py-1 text-lg  focus:bg-green-300 focus:text-white font-medium"
              >
                It
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
