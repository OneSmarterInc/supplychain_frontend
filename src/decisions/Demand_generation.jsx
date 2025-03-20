import React, { useContext, useEffect, useState } from "react";
import Demand_hype_ch1 from "../Components/Demand_hype_ch1";
import Demand_hype_ch2 from "../Components/Demand_hype_ch2";
import Demand_meta_ch1 from "../Components/Demand_meta_ch1";
import Demand_meta_ch2 from "../Components/Demand_meta_ch2";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import { Text, useToast, Box, Spinner } from "@chakra-ui/react"; 
import InfoButton from "../Components/InfoButton";
import StatusBar from "./StatusBar";
import { submitDecisionStatus } from "./DecisionSubmit";

const Demand_generation = () => {
  const [metaCh1Value, setMetaCh1Value] = useState({});
  const [metaCh2Value, setMetaCh2Value] = useState({});
  const [hypeCh1Value, setHypeCh1Value] = useState({});
  const [hypeCh2Value, setHypeCh2Value] = useState({});
  const [loading, setLoading] = useState(false); 
  const [simulation, setSimulation] = useState({}); 
  const [demandData, setDemandData] = useState();
  const [isLoadingLastQuarter, setIsLoadingLastQuarter] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { api } = useContext(MyContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const currentQuarter = selectedSimData[0]?.current_quarter || 1;
  const simulation_id = selectedSimData[0]?.simulation_id;

  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);

  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item) =>
      item.emails.includes(user.email)
    );
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  useEffect(() => {
    setLoading(true); 
    getDemand().finally(() => setLoading(false)); 
  }, [selectedQuarter]);
  const getSimulation = async () => {
    try {
      const response = await axios.get(
        `${api}/getsim/${selectedSim[0].simulation_id}`
      );
      setSimulation(response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  useEffect(() => {
    getSimulation();
  }, []);
  const getDemand = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Demand",
          current_quarter: selectedQuarter,
          firm_key: firm_key_new,
        },
      });
      setDemandData(response.data);
      localStorage.setItem("demandData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error making GET request:", error);

      // Clear state and local storage on error
      setDemandData(null);
      localStorage.removeItem("demandData");

      // Reset input values
      setMetaCh1Value({});
      setMetaCh2Value({});
      setHypeCh1Value({});
      setHypeCh2Value({});
    }
  };

  const loadPreviousQuarter = async () => {
    if (currentQuarter <= 1) return;

    const previousQuarter = currentQuarter - 1;
    setIsLoadingLastQuarter(true);
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Demand",
          current_quarter: previousQuarter,
          firm_key: firm_key_new,
        },
      });

      const previousData = response.data;
      setDemandData(previousData); 
      toast({
        title: `Loaded data from Quarter ${previousQuarter}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error loading previous quarter data:", error);
      toast({
        title: "Failed to load previous quarter data",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoadingLastQuarter(false);
    }
  };

  const validateInputs = () => {
    const requiredFields = [
      hypeCh1Value.Active, hypeCh1Value.Price, hypeCh1Value.MarketSpending,
      hypeCh2Value.Active, hypeCh2Value.Price, hypeCh2Value.MarketSpending,
      metaCh1Value.Active, metaCh1Value.Price, metaCh1Value.MarketSpending,
      metaCh2Value.Active, metaCh2Value.Price, metaCh2Value.MarketSpending
    ];

    for (const field of requiredFields) {
      if (!field) {
        toast({
          title: "Validation Error",
          description: "Please fill all the required fields before submitting.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return false;
      }
    }
    return true;
  };

  const submitDemand = async () => {
    if (!validateInputs()) return; 

    setLoading(true); 
    try {
      const response = await axios.post(`${api}/decision/demand/`, {
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: simulation[0].current_quarter,
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

      await submitDecisionStatus(
        api,
        "demand",
        selectedSimData,
        firm_key_new,
        simulation[0].current_quarter,
      );
      toast({
        title: "Demand Decision Submitted Successfully!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/Service");
    } catch (error) {
      console.error("Error making POST request:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div style={{ fontFamily: "ABeeZee" }}>
     <StatusBar simulation_id={simulation_id} firm_key={firm_key_new} quarter={currentQuarter} api={api} current={"Demand"}/>
      
      <div className="sm:grid grid-cols-1 gap-3 m-1">
        <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow px-2">
          <InfoImg decision={"Demand"} />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center pl-5 pt-2 pb-2">
              <Text>Load data Quarterly</Text>
              <div className="pl-4 flex space-x-4">
                {Array.from(
                  { length: simulation[0]?.current_quarter || 0 },
                  (_, i) => (
                    <div
                      key={i + 1}
                      onClick={() => setSelectedQuarter(i + 1)}
                      className={`flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-gray-100 text-gray-700 cursor-pointer ${selectedQuarter === i + 1 ? "bg-red-500 border-red-500 text-white" : ""}`}
                    >
                      {i + 1}
                    </div>
                  )
                )}
              </div>
            </div>
            <InfoButton decision="Demand" />
          </div>

          {/* Load previous quarter button */}
          <div
            onClick={loadPreviousQuarter}
            className="font-bold py-2 px-4 text-red-400 cursor-pointer"
            disabled={isLoadingLastQuarter || currentQuarter <= 1}
          >
            <span className="text-black">To load inputs from the previous quarter, </span>
            {isLoadingLastQuarter ? <Spinner size="sm" /> : "Click here!"}
          </div>

          {/* Show Spinner while loading */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <div className="m-3 rounded-2xl bg-white flex flex-col justify-start border-2 px-2">
                <Text fontSize="xl" fontWeight="bold" p="5" pb="0">
                  {selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.hyperware}
                </Text>
                <Demand_hype_ch1
                  demandData={demandData}
                  setHypeCh1ValuetoParent={setHypeCh1Value}
                />
                <Demand_hype_ch2
                  demandData={demandData}
                  setHypeCh2ValuetoParent={setHypeCh2Value}
                />
              </div>
              <div className="m-3 rounded-2xl bg-white flex flex-col justify-start border-2 px-2">
                <Text fontSize="xl" fontWeight="bold" p="5" pb="0">
                  {selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware}
                </Text>
                <Demand_meta_ch1
                  demandData={demandData}
                  setMetaCh1ValuetoParent={setMetaCh1Value}
                />
                <Demand_meta_ch2
                  demandData={demandData}
                  setMetaCh2ValuetoParent={setMetaCh2Value}
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={submitDemand}
              className={`${selectedQuarter === currentQuarter && !loading ? "bg-red-500 hover:bg-black-700 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } font-bold py-2 px-4 rounded-xl transition duration-300 ease-in-out`}
              disabled={selectedQuarter !== currentQuarter || loading}
            >
              {loading ? <Spinner size="sm" /> : "Submit Demand"} 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demand_generation;