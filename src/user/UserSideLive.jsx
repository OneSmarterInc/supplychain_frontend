import React, { useContext, useEffect, useState } from "react";
import UserNavBar from "../Components/UserNavBar";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useToast, Spinner } from "@chakra-ui/react";
import { Puff } from "react-loader-spinner";
import PlayComponent from "./live_simulation_function";
import JoinNow from "../Components/JoinNow";
import bg from "../FlexeeSimAdmin/Assets/bg.png";
import wheel from "../assets/wheel.png";
import ProfileDropdown from "../Components/Profile";
const UserSideLive = () => {
  const { api } = useContext(MyContext);
  document.body.style.backgroundColor = "#e0e2e4"; // Background color update

  const [simData, setSimData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const [code, setCode] = useState("");
  const [flag, setFlag] = useState(false);

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
      setFlag(true);
      console.log(response.data.data);
      user.sim_data = response.data.data;
      localStorage.setItem("user", JSON.stringify(user));
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
  }, [flag]);

  const getAllData = async () => {
    try {
      const response = await axios.get(`${api}/getsim/${user.sim_data}`);
      if (response.status === 200) {
        setSimData(response.data);
        localStorage.setItem("simData", JSON.stringify(response.data));
        localStorage.setItem(
          "selectedSimulation",
          JSON.stringify(response.data.simulation_id)
        );
        localStorage.setItem("selectedSimData", JSON.stringify(response.data));
        localStorage.setItem("selectedSim", JSON.stringify(response.data));
      }
    } catch (error) {
    } finally {
      setLoading(false); // Stop loading once done
    }
  };

  return (
    <div
      className="pb-12 p-0 px-6  h-screen relative pt-1.5 w-[95%] mx-auto"
      // style={{
      //   backgroundImage: `url(${bg})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div>
        {/* <h1 className="text-3xl font-bold">FLEXEE</h1>
          <h3 className="text-2xl">Supplychain Management</h3> */}
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 items-center relative gap-6">
        <div className=" mt-0 h-[55%] space-y-4">
          <h1 className="text-2xl font-semibold text-gray-600">
            ENTER THE CODE TO JOIN SIMULATION{" "}
          </h1>
          <h3 className="text-xl text-gray-600">
            Enter the code that has been sent to you by the faculty to join the
            simulation.
          </h3>

          <div className="p-2 rounded margin-auto w-[90%]">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border-2 border-gray-300 rounded p-2 py-3"
                placeholder="Ex:rf42d9"
                disabled={simData.length > 0} // Disable input if simData has values
              />
              <button
                type="submit"
                className="bg-red-600 w-full text-white p-2 rounded font-semibold text-2xl font-robot"
                disabled={simData.length > 0} // Disable button if simData has values
              >
                {simData.length === 0 ? "JOIN SIMULATION" : "JOIN SIMULATION"}
              </button>
            </form>
            <div className="space-y-4 mt-8">
            <div>
            <h1 className="text-2xl font-semibold text-gray-600">
              After joining the simulation
            </h1>
            <h3 className="text-xl text-red-600">
              What are the next step to explore ?
            </h3>
            </div>
            <h3 className="text-xl text-gray-600">
              Forecast, Procurement, Manufacture, Distribution, Transport,
              Service, Demand, Inventory Management , Order Management:Supplier
              Management, Reports and Analytics etc
            </h3>
            </div>
          </div>
        </div>
        <div className=" ml-24">
          {/* <div className="mt-10 ml-[35px]"><ProfileDropdown /> </div> */}

          <img src={wheel} className="mt-36 h-[530px] w-[530px]"></img>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Puff color="red" height={100} width={100} /> {/* Loader */}
        </div>
      ) : simData.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-2">
          {/* {simData
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
            ))} */}
        </section>
      ) : (
        <div className="p-4 pl-10">
          <p className="text-lg"></p>
        </div>
      )}
    </div>
  );
};

export default UserSideLive;
