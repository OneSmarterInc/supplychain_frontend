import React from "react";

const SuddenDemands = () => {
  return (
    <div className="bg-gray-200 rounded-lg p-4 w-[700px]">
      <h2 className="text-lg font-bold mb-4">Sudden Demand</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-lg font-bold mb-1">10000</p>
          <p>Smart Home Assistant</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-lg font-bold mb-1">15000</p>
          <p>Smart Thermostat</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="bg-gray-100 w-48 rounded-lg p-4">
          <p className="text-red-500 font-bold mb-1">Next Quarter</p>
          <p>Delivery required</p>
        </div>
        <div className="bg-gray-100 w-48 rounded-lg p-4">
          <p className="text-green-500 font-bold mb-1">1,000,000 $</p>
          <p>Stipulation</p>
        </div>
        <div className="bg-gray-100 w-48 rounded-lg p-4">
          <p className="text-red-500 font-bold mb-1">-500,000 $</p>
          <p className="text-gray-600 text-sm">Penalty</p>
          <p className="text-gray-600 text-xs">
            If unable to complete the order after accepting it
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg mr-4">
          Accept
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
          Decline
        </button>
      </div>
    </div>
  );
};

export default SuddenDemands;
