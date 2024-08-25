import React from "react";
import BackOfficeImg from "../Assets/BackOfficeBgImg.png"; // Update with your actual image path
import backgroundImage2 from "../Assets/ExploreSim2.png";
import { useNavigate } from "react-router-dom";

const ExploreSim = () => {
  const navigate = useNavigate();
  return (
    <div className="relative  bg-gray-100">
      <div className="relative bg-white">
        {/* Top Section */}
        <div className="text-center py-12 px-6 max-w-screen-full mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold">FLEXEE CONTROL CENTER</h1>
          <p className="text-gray-700 text-lg md:text-xl mt-4">
            Here you can manage the simulation and execute calculations.
            <br />
            You are also able to monitor the performance of your teams.
          </p>
          <button
            onClick={() => navigate("/flexeesim/backoffice/user")}
            className="mt-8 px-6 py-3 border-2 border-[#AC090F] bg-[#ED1C24] text-white rounded-full text-lg md:text-xl"
          >
            CONNECT NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreSim;