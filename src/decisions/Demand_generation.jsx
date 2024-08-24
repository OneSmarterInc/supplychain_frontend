import React, { useContext, useEffect, useState } from "react";
import Demand_hype_ch1 from "../Components/Demand_hype_ch1";
import Demand_hype_ch2 from "../Components/Demand_hype_ch2";
import Demand_meta_ch1 from "../Components/Demand_meta_ch1";
import Demand_meta_ch2 from "../Components/Demand_meta_ch2";
import NavBar from "../Components/NavBar";
// import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import { Text, useToast } from "@chakra-ui/react";
import InfoButton from "../Components/InfoButton";

const Demand_generation = () => {
  const [metaCh1Value, setMetaCh1Value] = useState({});
  const [metaCh2Value, setMetaCh2Value] = useState({});
  const [hypeCh1Value, setHypeCh1Value] = useState({});
  const [hypeCh2Value, setHypeCh2Value] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  // console.log("hypeCh1Value", hypeCh1Value);

  const { api } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];

  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const currentQuarter = selectedSimData[0]?.current_quarter || 1; // Assuming the current quarter is provided in the sim data
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter); // Set the default to the current quarter

  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }
  console.log("Firm Key demand Live Sim: -------", firm_key_new);

  const [demandData, setDemandData] = useState();
  useEffect(() => {
    getDemand();
  }, []);

  const getDemand = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Demand",
          current_quarter: selectedSim[0].current_quarter,
          firm_key: firm_key_new,
        },
      });
      const data = response.data;
      setDemandData(data);
      localStorage.setItem("demandData", JSON.stringify(data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  console.log("DemandData:===", demandData);

  const submitDemand = async () => {
    try {
      const response = await axios.post(`${api}/decision/demand/`, {
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSim[0].current_quarter,
        hyperware_channel_one_active: hypeCh1Value.Active,
        hyperware_channel_one_price: hypeCh1Value.Price,
        hyperware_channel_one_market: hypeCh1Value.MarketSpending,
        hyperware_channel_two_active: hypeCh2Value.Active,
        hyperware_channel_two_price: hypeCh2Value.Price,
        hyperware_channel_two_market: hypeCh2Value.MarketSpending,
        metaware_channel_one_active: metaCh1Value.Active,
        metaware_channel_one_price: metaCh1Value.Price,
        metaware_channel_one_market: metaCh1Value.MarketSpending,
        metaware_channel_two_active: metaCh2Value.Active,
        metaware_channel_two_price: metaCh2Value.Price,
        metaware_channel_two_market: metaCh2Value.MarketSpending,
      });
      console.log("POST request successful", response.data);
      addUserLogger();
      getDemand();
      toast({
        title: "Demand Generation Submit Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    } catch (error) {
      console.error("Error making POST request: Transportation", error);
    }
  };
  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        decision: "Demand",
        action: "created",
        ip_address: "123.345.1",
        username: user.username,
        firm_key: firm_key_new,
        current_quarter: selectedSim[0].current_quarter,
      });
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  return (
    <div style={{ fontFamily: "ABeeZee" }}>
     <div className="sm:grid grid-cols-1 gap-3 m-1">
          <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow px-2">
            <InfoImg decision={"Demand"} />
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center p-2">
                <Text>Load data Quarterly</Text>
                <div className="pl-4 flex space-x-4">
                  {Array.from(
                    { length: selectedSim[0]?.current_quarter || 0 },
                    (_, i) => (
                      <div
                        key={i + 1}
                        onClick={() => setSelectedQuarter(i + 1)}
                        className={`flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-gray-100 text-gray-700 cursor-pointer ${
                          selectedQuarter === i + 1
                            ? "bg-red-500 border-red-500 text-white"
                            : ""
                        }`}
                      >
                        {i + 1}
                      </div>
                    )
                  )}
                </div>
              </div>
              <InfoButton />
            </div>
          <Demand_hype_ch1
            demandData={demandData}
            setHypeCh1ValuetoParent={setHypeCh1Value}
          />
          <Demand_hype_ch2
            demandData={demandData}
            setHypeCh2ValuetoParent={setHypeCh2Value}
          />
          <Demand_meta_ch1
            demandData={demandData}
            setMetaCh1ValuetoParent={setMetaCh1Value}
          />
          <Demand_meta_ch2
            demandData={demandData}
            setMetaCh2ValuetoParent={setMetaCh2Value}
          />

               {/* Submit Button */}
               <div className="flex justify-end mt-4">
            <button
              onClick={submitDemand}
              className={`${selectedQuarter === currentQuarter
                  ? "bg-red-500 hover:bg-black-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={selectedQuarter !== currentQuarter}
            >
              Submit Distribution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demand_generation;
