import React from "react";
import BackOfficeImg from "../Assets/BackOfficeBgImg.png"; // Update with your actual image path
import backgroundImage2 from "../Assets/ExploreSim2.png";
import { useNavigate } from "react-router-dom";

const ExploreSim = () => {
  const navigate = useNavigate()
  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="relative h-full">
        {/* Top Section */}
        <div className="text-center p-8 bg-white">
          <h1 className="text-[40px] font-semibold">FLEXEE CONTROL CENTER</h1>
          {/* <h2 className="text-[32px] font-normal mt-0">
            THE FRESH CONNECTION BACKOFFICE
          </h2> */}
          <p className="text-gray-700 text-[24px] mt-2">
            Here you can manage the simulation and execute calculations.
            <br />
            You are also able to monitor the performance of your teams.
          </p>
          <button onClick={()=> navigate("/flexeesim/backoffice/user")} className="mt-6 px-8 py-3 border-2 border-[#AC090F] bg-[#ED1C24] text-white rounded-full">
            CONNECT NOW
          </button>
        </div>

        {/* Middle Section with Background Image */}
        <div
          className="relative w-screen h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${BackOfficeImg})` }}
        >
          <div className="w-[430px] text-start absolute bottom-[143px] right-[135px] z-20">
            <div>
              <h2 className="text-4xl text-black my-1 font-semibold">
                THE FRESH CONNECTION
              </h2>
              <h2 className="text-3xl text-black my-1 font-semibold">
                ONLINE TRAIN THE TRAINER
              </h2>
            </div>
            <div className="my-3 text-white text-lg w-96 mb-5">
              WELCOME TO THE ONLINE TRAIN THE TRAINER FOR THE FRESH CONNECTION.
            </div>
            <button className="px-6 py-4 w-[340px] border-2 border-red-700 bg-white hover:bg-slate-200 text-gray-600 rounded-full flex items-center justify-between space-x-1">
              <span>
                <i className="fa-solid fa-circle-question text-2xl"></i>
              </span>
              <span className="text-2xl">TRAINER QUESTION</span>
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-start bg-white p-8 pt-0">
          <button className="px-8 mx-7 mr-36 py-3 border-2 border-red-700 bg-red-500 text-white rounded-full flex items-center space-x-2">
            <span>
              <i className="fa-solid fa-cube"></i>
            </span>
            <span>EXPLORE SIMULATION</span>
          </button>
          <div className="flex items-center space-x-4">
            <img
              src={backgroundImage2}
              alt="Icon"
              className="h-56 w-full bg-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSim;
