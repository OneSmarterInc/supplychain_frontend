import React, { useState } from "react";
import grid_img from "../Assets/Navbar-grid-img.png";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileDropdown from "../../Components/Profile";
import { Text } from "@chakra-ui/react";

const DashboardNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const course = JSON.parse(localStorage.getItem("SelectedCourse")) || {};

  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="w-full top-0  bg-white pl-4">
      <div className="flex w-full items-center justify-start max-w-screen-full mx-auto">
        <div className="flex items-center">
          <div class=" p-4">
            <h1 class="text-3xl font-bold text-gray-700 cursor-pointer" style={{width:"14rem"}} onClick={()=>{navigate('/flexeesim/dashboard')}}>FLEXEE</h1>
            <p class="text-sm font-bold text-red-500">SUPPLY CHAIN MANAGEMENT</p>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full justify-end items-center ">
            <div className="relative cursor-pointer text-lg">
              <p className="font-medium text-gray-700">{`Welcome, ${user.first_name}`}</p>
            </div>
            <div  className="relative">
              <div className="flex items-center text-gray-500 cursor-pointer text-lg">
                {<ProfileDropdown />}
              </div>
            </div>
          </div>
          {/* <div className="bg-[#ECECEC] p-3 px-5 flex justify-between items-center text-black">
            <div className="flex items-center">
              <i className="fa-solid fa-home text-red-600 px-2"></i>
              <span
                onClick={() => navigate("/flexeesim/dashboard")}
                className="ml-2 cursor-pointer"
              >
                Dashboard
              </span>
              {location.pathname.includes("/flexeesim/dashboard/courses") && (
                <>
                  <i className="fa-solid fa-angle-right ml-2 text-red-600"></i>
                  <span className="ml-2 cursor-pointer" onClick={() => navigate("/flexeesim/dashboard")}>
                    Course {course.course && (
                      <>
                        <i className="fa-solid fa-angle-right ml-2 text-red-600"></i>
                        <span className="ml-2">{course.course}</span>
                      </>
                    )}
                  </span>
                </>
              )}
            </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
