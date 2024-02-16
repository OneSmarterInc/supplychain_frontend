import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-gray-800 w-full">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
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
                  <Link
                    to="/procurement"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Procurements
                  </Link>
                  <Link
                    to="/manufacturing"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Manufacturing
                  </Link>
                  <Link
                    to="/distribution"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Distribution
                  </Link>

                  <Link
                    to="/service"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Service
                  </Link>
                  <Link
                    to="/forecast"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Forecast
                  </Link>
                  <Link
                    to="/demand"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Demand
                  </Link>
                  <Link
                    to="/transportation"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Transportation
                  </Link>

                  <Link
                    to="/it"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    It
                  </Link>
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
