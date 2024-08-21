import React from "react";
import logo from "../Assets/Vector.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Check if the user is logged in
  const user = localStorage.getItem("user");

  return (
    <div className="fixed top-0 left-0 w-screen z-50 shadow-md bg-white">
      <div className="flex justify-between px-10 pt-7 items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-red-500 pr-1">FLEXEE</h1>
          <h1 className="text-xl font-bold">SIMULATION</h1>
          <div className="ml-4">
            <img src={logo} alt="" className="h-12" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <Link
              to="/flexeesim/dashboard/"
              className="text-gray-500 hover:text-red-500 hover:underline underline-offset-4 decoration-red-600 cursor-pointer"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/signin/"
              className="text-gray-500 hover:text-red-500 hover:underline underline-offset-4 decoration-red-600 cursor-pointer"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;