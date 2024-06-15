import React, { useContext, useEffect, useState } from "react";
import Forecasting_sales from "../Components/Forecasting_sales";
import Forecasting_sales2 from "../Components/Forecasting_sales2";
import NavBar from "../Components/NavBar";
// import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import ForecastDataChart from "../DataChartsOfDecisions/Forecasting/ForecastDataChart";
const Forecast = () => {
  const { api } = useContext(MyContext);
  const [ForecastHyperware, setForecastHyperware] = useState({});
  const [ForecastMetaware, setForecastMetaware] = useState({});

  console.log("ForecastHyperware", ForecastHyperware);
  console.log("ForecastMetaware", ForecastMetaware);

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  const [ForecastData, setForecastData] = useState();
  useEffect(() => {
    getForecast();
  }, []);

  const getForecast = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Forecast",
          current_quarter: selectedSim[0].current_quarter,
          firm_key: firm_data,
        },
      });
      const data = response.data;
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
        firm_key: firm_data,
        quarter: 18,
        hyperware_channel_one: ForecastHyperware.channel1,
        hyperware_channel_two: ForecastHyperware.channel2,
        metaware_channel_one: ForecastMetaware.channel1,
        metaware_channel_two: ForecastMetaware.channel2,
      });
      console.log("POST request successful", response.data);
      getForecast();
      addUserLogger();
    } catch (error) {
      console.error("Error making POST request: Forecast", error);
    }
  };

  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        decision: "Forecast",
        action: "created",
        ip_address: "123.345.1",
        username: user.username
      });
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  return (
    <div style={{ fontFamily: "ABeeZee" }} className=" ">
      <NavBar />
      <div className="flex justify-between">
        <h1 className="text-2xl text-start pl-6 py-2 ">Forecast Decision</h1>

        <div className="flex">
          {" "}
          <h1 className="text-xl text-start px-3 py-2 text-blue-500">
            {selectedSim[0]?.name}
          </h1>{" "}
          <h1 className="text-xl text-start px-1 py-2 text-blue-500">|</h1>{" "}
          <h1 className="text-xl text-start px-3 py-2 text-gray-600 ">
            {user.username}
          </h1>
        </div>
      </div>
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="m-3 rounded-2xl  h-screen bg-white p-2  flex flex-col justify-start">
          <Forecasting_sales
            setForecastHyperwaretopass={setForecastHyperware}
          />{" "}
          <div className="py-5">
            <Forecasting_sales2
              setForecastMetawaretopass={setForecastMetaware}
            />
          </div>
        </div>

        <div className="rounded-2xl m-3  overflow-hidden    bg-white h-screen p-2">
          <InfoImg />
          <div className="py-10">
            <ForecastDataChart
              submitForecast={submitForecast}
              ForecastHyperware={ForecastHyperware}
              ForecastMetaware={ForecastMetaware}
            />{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
