import React, { useContext, useEffect, useState } from "react";
import Forecasting_sales from "../Components/Forecasting_sales";
import Forecasting_sales2 from "../Components/Forecasting_sales2";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import {
  Box,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import InfoImg from "../Components/InfoImg";
import InfoButton from "../Components/InfoButton";

const Forecast = () => {
  const { api } = useContext(MyContext);
  const toast = useToast();
  const navigate = useNavigate();

  const [ForecastHyperware, setForecastHyperware] = useState({});
  const [ForecastMetaware, setForecastMetaware] = useState({});
  const [ForecastData, setForecastData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoadingLastQuarter, setIsLoadingLastQuarter] = useState(false); // State for last quarter loading

  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const currentQuarter = selectedSimData[0]?.current_quarter || 1;
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const firm_data = selectedSimData[0]?.firm_data ? Object.keys(selectedSimData[0].firm_data)[0] : null;

  let firm_key_new = "";
  if (selectedSimData[0]?.firm_data && Array.isArray(selectedSimData[0].firm_data)) {
    let firm_obj = selectedSimData[0].firm_data.filter((item) => {
      return item.emails && item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  useEffect(() => {
    setLoading(true);
    getForecast().finally(() => setLoading(false));
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
          firm_key: firm_key_new,
        },
      });
      const data = response.data;
      setForecastData(data);
      localStorage.setItem("ForecastData", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching Forecast data:", error);
      setForecastData({});
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
          sim_id: selectedSimData[0]?.simulation_id || "",
          admin_id: selectedSimData[0]?.admin_id || "",
          current_decision: "Forecast",
          current_quarter: previousQuarter,
          firm_key: firm_key_new,
        },
      });

      const previousData = response.data;
      setForecastData(previousData); // Set the previous quarter's data to the current state
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

  const submitForecast = async () => {
    // Helper function to check if all regions have values
    const areRegionsFilled = (channel) => {
      return Object.values(channel).every(region => region !== "");
    };
  
    // Validation: check if all regions in both channels are filled
    if (
      !areRegionsFilled(ForecastHyperware.channel1) ||
      !areRegionsFilled(ForecastHyperware.channel2) ||
      !areRegionsFilled(ForecastMetaware.channel1) ||
      !areRegionsFilled(ForecastMetaware.channel2)
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all the required regions before submitting.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return; // Stop the submission if validation fails
    }
  
    setLoading(true);
    try {
      const response = await axios.post(`${api}/decision/forecast/`, {
        simulation_id: selectedSimData[0]?.simulation_id || "",
        admin_id: selectedSimData[0]?.admin_id || "",
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSimData[0]?.current_quarter || 1,
        hyperware_channel_one: ForecastHyperware.channel1,
        hyperware_channel_two: ForecastHyperware.channel2,
        metaware_channel_one: ForecastMetaware.channel1,
        metaware_channel_two: ForecastMetaware.channel2,
      });
      console.log("POST request successful", response.data);
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
    } finally {
      setLoading(false);
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
              <div className="pl-4 flex space-x-4">
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
            <InfoButton decision="Forecast" />
          </div>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <Forecasting_sales
                key={`hyperware-${selectedQuarter}`}
                setForecastHyperwaretopass={setForecastHyperware}
                forecastData={ForecastData || {}}
              />
              <div className="py-2">
                <Forecasting_sales2
                  key={`metaware-${selectedQuarter}`}
                  setForecastMetawaretopass={setForecastMetaware}
                  forecastData={ForecastData || {}}
                />
              </div>
            </>
          )}

          <div className="flex justify-between mt-4">
            <div
              onClick={loadPreviousQuarter}
              className="font-bold py-2 px-4 text-red-400 cursor-pointer"
              disabled={isLoadingLastQuarter || currentQuarter <= 1}
            >
              <span className="text-black">To load inputs from the previous quarter, </span>{isLoadingLastQuarter ? <Spinner size="sm" /> : "Click here!"}
            </div>
            <button
              onClick={submitForecast}
              className={`${selectedQuarter === currentQuarter && !loading
                  ? "bg-red-500 hover:bg-black-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={selectedQuarter !== currentQuarter || loading}
            >
              {loading ? <Spinner size="sm" /> : "Submit Forecast"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;