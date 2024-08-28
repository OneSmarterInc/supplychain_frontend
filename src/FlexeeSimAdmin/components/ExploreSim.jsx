import React from "react";
import { useNavigate } from "react-router-dom";

const ExploreSim = () => {
  const navigate = useNavigate();
  return (
    <div className="relative  bg-white h-64 cursor-pointer text-start p-4 px-8 rounded-md relative shadow-sm border border-gray-500 border-opacity-20 group">
      <div className="relative bg-white">
        <div className="text-center  px-6 max-w-screen-full mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold">FLEXEE CONTROL CENTER</h1>
          <p className="text-gray-700 text-lg md:text-xl mt-4">
            Here you can manage the simulation and  monitor the performance of your teams.
          </p>
          <button
            onClick={() => navigate("/flexeesim/backoffice/")}
            className="mt-5 px-6  bg-red-500 w-58 text-white p-2 rounded text-sm md:text-xl"
          >
            CONNECT NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExploreSim;