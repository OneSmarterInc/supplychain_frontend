import React from "react";
import logo from "../Assets/Vector.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleDashboardClick = () => {
    if (user?.isadmin) {
      navigate("/flexeesim/dashboard/");
    } else {
      navigate("/usersidelive");
    }
  };

  return (
    <nav className="sticky top-0 left-0 w-full z-50 shadow-md bg-white">
      <div className="flex justify-between px-4 md:px-10 py-4 items-center">
        <div className="flex items-center">
          <h1 className="text-lg md:text-xl font-bold text-red-500 pr-1">FLEXEE</h1>
          <h1 className="text-lg md:text-xl font-bold">SIMULATION</h1>
          <div className="ml-4">
            <img src={logo} alt="Logo" className="h-8 md:h-12" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <span
              onClick={handleDashboardClick}
              className="text-sm md:text-base text-Red-500 hover:text-red-500 hover:underline underline-offset-4 decoration-red-600 cursor-pointer font-bold"
            >
              Dashboard
            </span>
          ) : (
            <>
            <Link
              to="/student/signin/"
              className="text-sm md:text-base text-Red-500 hover:text-red-500 hover: underline-offset-4 decoration-red-600 cursor-pointer font-bold pr-4"
            >
              Student Signin 
              
            </Link>
            |
            <Link
              to="/faculty/signin/"
              className="text-sm md:text-base text-Red-500 hover:text-red-500 hover: underline-offset-4 decoration-red-600 cursor-pointer font-bold"
            >
               Faculty Signin
             
            </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;