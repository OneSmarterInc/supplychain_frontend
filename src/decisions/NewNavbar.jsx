import React from "react";
import { useNavigate } from "react-router-dom";

const BackOfficeNavbar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const navigate = useNavigate()

  const redirect = () => {
    navigate('/usersidelive')
  };

  return (
    <div className="">
      <div className="w-full  top-0 left-0  ">
        <div className="flex justify-between items-center  bg-black text-white p-2 h-12">
          <div className="flex justify-between w-full">
            <div className="px-3 cursor-pointer">
            <h1 className="text-2xl font-bold pl-7 text-white cursor-pointer" onClick={redirect}>FLEXEE</h1>
            </div>
            <div className="flex items-center px-3 ">
              <svg
                class="h-8 w-8 text-white "
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <rect x="4" y="4" width="6" height="6" rx="1" />{" "}
                <rect x="14" y="4" width="6" height="6" rx="1" />{" "}
                <rect x="4" y="14" width="6" height="6" rx="1" />{" "}
                <rect x="14" y="14" width="6" height="6" rx="1" />
              </svg>
              <i className="fa-solid fa-bell mx-2 px-3 text-2xl"></i>
              <p className="px-3 text-2xl opacity-50">|</p>
              <a href="/" className="hover:text-gray-500">
                Back To My Account
              </a>
              <i className="fa-solid fa-circle-user mr-2 px-3 text-3xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackOfficeNavbar;
