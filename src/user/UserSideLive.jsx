import React, { useContext, useEffect, useState } from "react";
import UserNavBar from "../Components/UserNavBar";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useToast, Spinner } from "@chakra-ui/react";
import PlayComponent from "./live_simulation_function";
import JoinNow from "../Components/JoinNow";

const UserSideLive = () => {
  const { api } = useContext(MyContext);
  document.body.style.backgroundColor = "#e0e2e4"; // Background color update

  const [simData, setSimData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [code, setCode] = useState("");
  
  const toast = useToast(); // Initialize Chakra UI's toast
  
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.post(`${api}/subscribe/`, {
        user_id: user.userid,
        passcode: code,
      });

      if (response.status === 200) {
        toast({
          title: "Already subscribed.",
          description: "You have already subscribed to this simulation.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else if (response.status === 201) {
        toast({
          title: "Subscription successful.",
          description: "Successfully subscribed to the simulation.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCode("");
        getAllData();
      } else {
        toast({
          title: "Subscription failed.",
          description: "Failed to subscribe to the simulation.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error during subscription. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("Error during subscription:", error);
    }
  };

  const userId = user.userid;

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await axios.get(`${api}/user/${userId}/subscriptions/`);
      if (response.status === 200) {
        const simulations = response.data.map(sub => ({
          ...sub.simulation,
          subscribed_at: sub.subscribed_at,
          is_active: new Date(sub.simulation.end_date) >= new Date() // Active simulations
        }));
        setSimData(simulations);
        localStorage.setItem("simData", JSON.stringify(simulations));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load simulations.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Stop loading once done
    }
  };

  return (
    <div className="pb-12 bg-white-full p-0 px-6 relative pt-1.5 max-w-screen-full mx-auto">
      {/* Your HTML structure */}
      <div className="absolute left-1/2 transform top-10 min-h-full w-[2px] bg-red-500"></div>
      <div className="absolute left-1/2 transform -translate-x-full top-10 w-40 h-[2px] bg-red-500"></div>
      <div className="absolute left-1/2 transform -translate-x-40 top-7 text-red-500">
        <i className="fa-solid fa-caret-left text-lg"></i>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 rounded-full border-2 border-red-500 mt-12"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-3 h-3 rounded-full border-2 border-red-500 mt-16"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-4 h-4 rounded-full border-2 border-red-500 mt-20"></div>

      <section className="grid grid-cols-1 md:grid-cols-2 items-center relative gap-6">
        <div className="text-start">
          <h2 className="text-2xl font-bold mb-3">FLEXEE SIMULATION</h2>
          <h3 className="text-xl mb-4 font-semibold">{simData.length} ACTIVE COURSES</h3>
        </div>
        <div className="p-2 rounded">
          <h2 className="text-2xl font-bold mb-4 text-start">CODE ENTRY</h2>
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 border border-gray-300 rounded p-2 py-3"
              placeholder="Enter code"
            />
            <button
              type="submit"
              className="bg-red-500 w-28 text-white p-2 rounded"
            >
              {simData.length === 0 ? "Connect Now" : "SUBMIT"}
            </button>
          </form>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="xl" />
        </div>
      ) : simData.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-2">
          {simData
            .filter((item) => item.is_active === true)
            .reverse()
            .map((item, index) => (
              <div
                key={index}
                className="bg-white hover:bg-gray-200 h-64 cursor-pointer text-start rounded-md relative border border-gray-500 border-opacity-20 group"
              >
                <PlayComponent
                  id={item.simulation_id}
                  batch={item.course || `Simulation ${item.simulation_id}`}
                  startDate={item.start_date}
                  endDate={item.end_date}
                  time={`${item.decision_open} - ${item.decision_close}`}
                  currentQuarter={item.current_quarter || 0}
                  firm_data={item.firm_data}
                  selectedSimData={simData}
                />
              </div>
            ))}
        </section>
      ) : (
        <div className="p-4 pl-10">
          <p className="text-lg">You have not enrolled for any simulation yet. If you have a passcode, click on Join Now:</p>
        </div>
      )}
    </div>
  );
};

export default UserSideLive;