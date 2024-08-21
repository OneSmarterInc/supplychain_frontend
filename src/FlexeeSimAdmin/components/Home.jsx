import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("NewUserEmail", email);
    navigate("/signup"); // Change "/signup" to your signup page route
  };

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
        <form className="flex space-x-6" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded p-2 py-1 w-96"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={handleEmailChange}
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