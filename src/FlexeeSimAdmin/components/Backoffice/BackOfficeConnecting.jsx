import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you're using react-router for navigation
import flowers from "../../Assets/backofficeFlowers.png";
import backofficaconnectingimg from "../../Assets/backofficeConnectingimg.png";

function BackOfficeConnecting() {
  const [status, setStatus] = useState("IDLE");
  const [connected, setConnected] = useState(false);
  const [textColor, setTextColor] = useState("text-gray-700"); // Initial text color
  const navigate = useNavigate();

  useEffect(() => {
    // Set up a sequence of status changes over 2 seconds
    const timer1 = setTimeout(() => {
      setStatus("CONNECTING");
      setTextColor("text-green-500");
    }, 500);
    
    const timer2 = setTimeout(() => {
      setStatus("CONNECTED");
      setConnected(true);
    }, 1500);

    // Redirect to the user page after 2 seconds
    const redirectTimer = setTimeout(() => navigate("/flexeesim/backoffice/user"), 100);

    // Clean up timers on component unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="bg-white h-screen pt-0">
      <div
        style={{ backgroundImage: `url(${flowers})` }}
        className="flex h-80 bg-cover flex-col space-y-4 justify-end items-center"
      >
        <div className="ml-4 text-center">
          <p className={`${textColor} text-[32px] font-medium`}>
            Please Wait While We Are Processing Your Request.
          </p>
          <p className="text-gray-500 text-[32px] font-medium">
            don't refresh or leave this page.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-10 h-10 border-4 my-2 rounded-full flex justify-center items-center">
            <i className="fa-solid fa-spinner animate-spin rounded-full text-3xl text-gray-600"></i>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-5">
        <div className="border border-gray-500 rounded-md border-opacity-20 p-5 rounded-l min-w-[600px]">
          <h3 className="text-2xl font-medium text-gray-800 mb-3 border-0 border-b pb-2 border-b-gray-500 border-opacity-20">
            SYSTEM STATUS
          </h3>
          <div
            className={`flex justify-between items-center mb-2 border-0 border-b pb-2 border-b-gray-500 border-opacity-20 ${
              status === "IDLE" || connected ? "text-green-500" : "text-gray-400 opacity-50"
            }`}
          >
            <p className="text-sm font-medium">CONNECTION STATUS: {status}</p>
            <i
              className={`fa-solid fa-circle-check text-lg ${
                status === "IDLE" || connected ? "text-green-500" : "text-gray-400"
              }`}
            ></i>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="p-5 rounded-lg">
          <h3 className="text-4xl text-center font-medium text-gray-800 mb-3">
            Flexee Control Center
          </h3>
          <div className="flex justify-center items-center mb-8">
            <div className="w-2 h-2 rounded-full bg-blue-900 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-blue-700 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-blue-500 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-600 mx-1"></div>
            <div className="w-2 h-2 rounded-full bg-red-600 mx-1"></div>
          </div>

          <div className="flex items-center justify-center mt-4">
            <div>
              <img src={backofficaconnectingimg} alt="Connecting" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BackOfficeConnecting;