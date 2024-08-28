import React, { useContext, useEffect, useState } from "react";
import UserNavBar from "../Components/UserNavBar";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useToast, Spinner } from "@chakra-ui/react";
import PlayComponent from "./live_simulation_function";
import JoinNow from "../Components/JoinNow";

const UserSideLive = () => {
  const { api } = useContext(MyContext);
  document.body.style.backgroundColor = "#e0e2e4";

  const [simData, setSimData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user.userid;

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    try {
      const response = await axios.get(`${api}/user/${userId}/subscriptions/`);
      console.log(response.status);
      if (response.status === 200) {
        console.log("AllData", response.data);
        const simulations = response.data.map(sub => ({
          ...sub.simulation,
          subscribed_at: sub.subscribed_at,
          is_active: new Date(sub.simulation.end_date) >= new Date() // Assuming active means the simulation hasn't ended yet
        }));
        setSimData(simulations);
        const serializedValue = JSON.stringify(simulations);
        localStorage.setItem("simData", serializedValue);
      }
    } catch (error) {
      console.error("Error fetching subscription data:", error);
      toast({
        title: "Error",
        description: "Failed to load simulations.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Stop loading when data is fetched
    }
  };

  return (
    <div>
      <h2 className="text-3xl p-2 pl-10">Live Simulations</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner size="xl" />
        </div>
      ) : simData.length > 0 ? (
        simData
          .filter((item) => item.is_active === true)
          .reverse()
          .map((item, index) => (
            <PlayComponent
              key={index}
              id={item.simulation_id}
              batch={item.course || `Simulation ${item.simulation_id}`}
              startDate={item.start_date}
              endDate={item.end_date}
              time={`${item.decision_open} - ${item.decision_close}`}
              currentQuarter={item.current_quarter || 0}
              firm_data={item.firm_data}
              selectedSimData={simData}
            />
          ))
      ) : (
        <div className="p-4 pl-10">
          <p className="text-lg">You have not enrolled for any simulation yet. If you have a passcode, click on Join Now:</p>
        </div>
      )}
          <div className="h-100">
          </div>
          <JoinNow refreshSimulations={getAllData}/>
    </div>
  );
};

export default UserSideLive;