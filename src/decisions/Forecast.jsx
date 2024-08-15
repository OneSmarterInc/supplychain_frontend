import React, { useContext, useEffect, useState } from "react";
import Forecasting_sales from "../Components/Forecasting_sales";
import Forecasting_sales2 from "../Components/Forecasting_sales2";
import NavBar from "../Components/NavBar";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { Box, Radio, RadioGroup, Stack, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import InfoImg from "../Components/InfoImg";
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import InfoButton from "../Components/InfoButton";

const Forecast = () => {
  const { api } = useContext(MyContext);

  const [ForecastHyperware, setForecastHyperware] = useState({});
  const [ForecastMetaware, setForecastMetaware] = useState({});
  const [ForecastData, setForecastData] = useState({});
  const [selectedQuarter, setSelectedQuarter] = useState(1); // default to quarter 1

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; // note: only one user in one firm so using firm_obj[0]
    }
  }

  useEffect(() => {
    console.log("Selected Quarter:", selectedQuarter);
    getForecast();
  }, [selectedQuarter]);
  
  const getForecast = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Forecast",
          current_quarter: selectedQuarter,
          firm_key: firm_key_new,
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
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSim[0].current_quarter,
        hyperware_channel_one: ForecastHyperware.channel1,
        hyperware_channel_two: ForecastHyperware.channel2,
        metaware_channel_one: ForecastMetaware.channel1,
        metaware_channel_two: ForecastMetaware.channel2,
      });
      console.log("POST request successful", response.data);
      getForecast();
      toast({
        title: "Forecast Submitted Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/procurement")
    } catch (error) {
      console.error("Error making POST request: Forecast", error);
    }
  };

  const toast = useToast();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "ABeeZee" }} className=" ">
      <NavBar />

      <div className="sm:grid grid-cols-1 gap-3 m-1 ">
        <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow">
          <InfoImg decision={"forecast"} />
          <div className="flex items-center justify-between w-full">
      <div className="flex items-center p-2">
        <Text>Load data Quarterly</Text>
        <RadioGroup 
          value={selectedQuarter} 
          onChange={(val) => setSelectedQuarter(parseInt(val))}
          className="pt-2 pl-4"
        >
          <Stack direction="row">
            {Array.from({ length: selectedSim[0].current_quarter }, (_, i) => (
              <Radio key={i + 1} value={i + 1}>
                {i+1}
                <FiArrowRight />
              </Radio>
            ))}
          </Stack>
        </RadioGroup>
      </div>
      <InfoButton />
    </div>
          <Forecasting_sales
            setForecastHyperwaretopass={setForecastHyperware}
            forecastData={ForecastData[`Q${selectedQuarter}`]?.hyperware || {}}
          />
          
          <div className="py-2">
            <Forecasting_sales2
              setForecastMetawaretopass={setForecastMetaware}
              forecastData={ForecastData[`Q${selectedQuarter}`]?.metaware || {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;