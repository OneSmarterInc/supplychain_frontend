import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileDropdown from "./Profile";

const UserNavBar = () => {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-end">
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
                    to="/usersidelive"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Live
                  </Link>
                  <Link
                    to="/usersideended"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Ended
                  </Link>
                </div>
              </div>
              {/* Profile Section */}
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default UserNavBar;
