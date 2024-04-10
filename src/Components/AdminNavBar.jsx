import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

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
                    to="/createsim"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Start New
                  </Link>
                  <Link
                    to="/adminsidelive"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Live
                  </Link>
                  <Link
                    to="/adminsideended"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Ended
                  </Link>
                </div>
              </div>
              <div
                className="p-2 bg-red-700 text-white cursor-pointer rounded-md"
                onClick={handleLogOut}
              >
                {" "}
                LogOut
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavBar;
