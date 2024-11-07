import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("NewUserEmail", email);
    navigate("/signup");
  };

  return (
    <div className="bg-white text-center p-4 md:p-8">
      <div className="mt-8 md:mt-16">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-700">
        Flexee is the ultimate simulation for real-world supply chain mastery

        </h2>
        <h2 className="text-xl md:text-3xl font-bold text-red-500 py-2">
        Experience supply chain management in action. 
        </h2>
        <p className="text-gray-500 mt-4 text-lg md:text-2xl">
        Flexee pushes you to develop strategies that meet today’s industry challenges.
          {/* in supply chain management and production strategy. */}
        </p>
      </div>
      <div className="mt-8 md:mt-16 flex justify-center">
        {/* <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full max-w-xl" onSubmit={handleSubmit}>
          <input
            type="email"
            className="flex-1 border border-gray-300 rounded p-3 py-2 w-full md:w-full"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            type="submit"
            className="bg-red-500 w-full md:w-36 text-white p-3 rounded"
          >
            GET STARTED
          </button>
        </form> */}
      </div>
    </div>
  );
}

export default Home;