import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import graphics from '../assets/graphic.png';
const FleetFlowSimulation = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sim, setSim] = useState([]);

  const { api, api1 } = useContext(MyContext);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(`${api}/getsim/${user.sim_data}`);
        setSim(response.data[0]);
        const passcode = response.data[0].passcode;
        const subscribersResponse = await axios.get(`${api}/simulation/${passcode}/subscribers/`);
        setSubscribers(subscribersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscribers:", error);
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  // Helper function to convert the date part to US format
  const formatDateToUS = (dateString) => {
    if (!dateString) return "";

    // Split date and time
    const [datePart, timePart] = dateString.split("T");
    const date = new Date(datePart);

    // Format date to MM/DD/YYYY
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    // Return the formatted date along with the original time part
    return `${formattedDate} ${timePart ? timePart.slice(0, 5) : ""}`; // Time in HH:MM format
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="shadow-lg rounded-lg mt-24 w-full max-w-xl p-6 relative text-center"style={{ backgroundImage: `url(${graphics})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <button className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full">
          JOINED SIMULATION
        </button>

        <h2 className="text-2xl font-bold mt-10">{sim.course}</h2>
        <p className="text-gray-500 mt-2">
          DURATION:  {formatDateToUS(sim.start_date)} to {formatDateToUS(sim.end_date)}
        </p>

        <hr className="my-6 border-t-2 border-red-500 w-full" />

        <div className="flex items-center justify-center">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex items-center">
              <div className="flex -space-x-4">
                {subscribers.slice(0, 5).map((subscriber, index) => (
                  <img
                    key={index}
                    className="w-10 h-10 rounded-full border-2 border-white"
                    src={`${api1}${subscriber.user_detail.image}`}
                    alt={`${subscriber.user_detail.first_name} ${subscriber.user_detail.last_name}`}
                  />
                ))}
              </div>

              <p className="text-gray-600 ml-4">
                More than {subscribers.length} students have already joined.
              </p>
            </div>
          )}
        </div>

        {/* Arrow button */}
        <div className="mt-8">
          <button className="w-14 h-14 bg-gray-200 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FleetFlowSimulation;