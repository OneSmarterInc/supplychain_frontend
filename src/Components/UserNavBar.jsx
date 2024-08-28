import React from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "./Profile";
import favicon from "../assets/favicon.png";

const UserNavBar = () => {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto px-6">
          <div className="relative flex h-16 items-center justify-end">
            <div className="flex w-screen items-center  justify-between">
              <div className="flex flex-shrink-0 items-center">
              <img src={favicon} className="h-12 w-12 " alt="" />
                <p className="text-2xl text-white font-bold">
                  Flexee 
                </p>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex items-center justify-between space-x-4">
                  <Link
                    to="/joinnow"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg -md px-3 py-2 text-sm font-medium"
                  >
                    Join Now
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
