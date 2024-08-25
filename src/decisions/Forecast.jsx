import React, { useContext, useEffect, useState } from "react";
import Forecasting_sales from "../Components/Forecasting_sales";
import Forecasting_sales2 from "../Components/Forecasting_sales2";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import {
  Box,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import InfoImg from "../Components/InfoImg";
import { FiArrowRight } from "react-icons/fi";
import InfoButton from "../Components/InfoButton";

const Forecast = () => {
  const { api } = useContext(MyContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [ForecastHyperware, setForecastHyperware] = useState({});
  const [ForecastMetaware, setForecastMetaware] = useState({});
  const [ForecastData, setForecastData] = useState({});

  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const currentQuarter = selectedSimData[0]?.current_quarter || 1; // Assuming the current quarter is provided in the sim data
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter); // Set the default to the current quarter

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const selectedSim = selectedSimData;
  const firm_data = selectedSim[0]?.firm_data ? Object.keys(selectedSim[0].firm_data)[0] : null;

  let firm_key_new = "";
  if (Array.isArray(selectedSim[0]?.firm_data)) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; // Only one user in one firm, so using firm_obj[0]
    }
  }

  useEffect(() => {
    getForecast();
  }, [selectedQuarter]);

  const getForecast = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSimData[0]?.simulation_id || "",
          admin_id: selectedSimData[0]?.admin_id || "",
          current_decision: "Forecast",
          current_quarter: selectedQuarter,
          firm_key: 'Team 01',
        },
      });
      const data = response.data;
      console.log("Fetched Forecast Data:", data);

      setForecastData(data);
      localStorage.setItem("ForecastData", JSON.stringify(data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const submitForecast = async () => {
    try {
      const response = await axios.post(`${api}/decision/forecast/`, {
        simulation_id: selectedSim[0]?.simulation_id || "",
        admin_id: selectedSim[0]?.admin_id || "",
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSim[0]?.current_quarter || 1,
        hyperware_channel_one: ForecastHyperware.channel1,
        hyperware_channel_two: ForecastHyperware.channel2,
        metaware_channel_one: ForecastMetaware.channel1,
        metaware_channel_two: ForecastMetaware.channel2,
      });
      console.log("POST request successful", response.data);
      await getForecast();
      addUserLogger();
      toast({
        title: "Forecast Submitted Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate("/Procurement");
    } catch (error) {
      console.error("Error making POST request: Forecast", error);
      toast({
        title: "Error submitting Forecast",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        decision: "Transportation",
        action: "created",
        ip_address: "123.345.1",
        username: user.first_name +" "+ user.last_name,
        firm_key: firm_key_new,
        current_quarter:selectedSim[0].current_quarter,

      });
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  return (
    <div style={{ fontFamily: "ABeeZee" }}>
      <div className="sm:grid grid-cols-1 gap-3 m-1 ">
        <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow">
          <InfoImg decision={"Forecast"} />
          <div className="flex items-center justify-between w-full">
          <div className="flex items-center pl-5 pt-2 pb-2">
              <Text>Load data Quarterly</Text>
              <div className=" pl-4 flex space-x-4">
                {Array.from(
                  { length: selectedSimData[0]?.current_quarter || 0 },
                  (_, i) => (
                    <div
                      key={i + 1}
                      onClick={() => setSelectedQuarter(i + 1)}
                      className={`flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-gray-100 text-gray-700 cursor-pointer ${selectedQuarter === i + 1 ? "bg-red-500 border-red-500 text-white" : ""
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
          <Forecasting_sales
            key={`hyperware-${selectedQuarter}`} // Add a key prop to force re-render
            setForecastHyperwaretopass={setForecastHyperware}
            forecastData={ForecastData[`Q${selectedQuarter}`]?.hyperware || {}}
          />

          <div className="py-2">
            <Forecasting_sales2
              key={`metaware-${selectedQuarter}`} // Add a key prop to force re-render
              setForecastMetawaretopass={setForecastMetaware}
              forecastData={ForecastData[`Q${selectedQuarter}`]?.metaware || {}}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            
            <button
              onClick={submitForecast}
              className={`${selectedQuarter === currentQuarter
                  ? "bg-red-500 hover:bg-black-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={selectedQuarter !== currentQuarter}
            >
              Submit Forecast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;