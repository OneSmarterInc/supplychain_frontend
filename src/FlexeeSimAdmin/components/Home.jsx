import React from "react";
function Home() {
  return (
    <div className="bg-white text-center p-8">
      <div className="mt-16">
        <h2 className="text-4xl font-bold text-gray-700">
          FLEXEE SIMULATION is designed to provide
        </h2>
        <h2 className="text-3xl font-bold text-red-500 py-2">
          COMPREHENSIVE LEARNING EXPERIENCE
        </h2>
        <p className="text-gray-500 mt-4 text-3xl">
          in supply chain management and production strategy.
        </p>
      </div>
      <div className="mt-16 flex justify-center">
        <form className="flex space-x-6">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded p-2 py-1 w-96"
            placeholder="Enter Your Email Address"
          />
          <button
            type="submit"
            className="bg-red-500 w-28 text-white p-2 rounded"
          >
            GET STARTED
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
