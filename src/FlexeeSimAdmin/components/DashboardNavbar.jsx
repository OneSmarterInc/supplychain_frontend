import React, { useState } from "react";
import grid_img from "../Assets/Navbar-grid-img.png";
import logout_img from "../Assets/logout.png";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileDropdown from "../../Components/Profile";

const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/"); // Redirect to login after logout
  };

  const toggleProfileDropdown = () => {
    setProfileOpen(!profileOpen);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="w-full fixed top-0 z-40 bg-white shadow-md ">
      <div className="flex w-full items-center justify-start border-b border-gray-200 max-w-screen-full mx-auto ">
        <div className="flex items-center ">
          <div className="text-red-600 text-3xl font-bold " onClick={()=>{navigate('/')}}>
            <img src={grid_img} alt="Logo" className="h-18 w-20" />
          </div>
        </div>
        <div className="w-full">
          <div className="flex bg-[#F5F5F5] w-full justify-end items-center py-2">
            {/* <div className="relative cursor-pointer mx-1">
              <i className="fa-solid fa-bell text-gray-500 text-xl"></i>
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
            </div> */}
            <div className="relative cursor-pointer text-lg">
              <p className="font-medium text-red-500">{`${user.first_name} ${user.last_name}`}</p>
            </div>
            <div className="relative">
              <div
                className="flex items-center text-gray-500 cursor-pointer text-lg"
              >
               <p className="px-3 text-2xl opacity-50">|</p>
              <ProfileDropdown />
              </div>
            </div>
            
          </div>
          <div className=" bg-[#ECECEC] p-3 px-5 flex justify-between items-center text-black-500">
            <div className="flex items-center">
              <i className="fa-solid fa-home text-red-600 px-2"></i>
              <span
                onClick={() => navigate("/flexeesim/dashboard")}
                className="ml-2 cursor-pointer"
              >
                Dashboard
              </span>
              <i className="fa-solid fa-angle-right ml-2 text-red-600"></i>
              <div className="links">
                {location.pathname === "/dashboard" && (
                  <span className="ml-2"></span>
                )}
                {location.pathname === "/flexeesim/dashboard/courses" && (
                  <span className="ml-2">Course</span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardNavbar;