import React, { useContext, useState } from "react";
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

  const submitForecast = async () => {
    try {
      const response = await axios.post(`${api}/decision/forecast/`, {
        firm_key: "123",
        quarter: null,
        hyperware_channel_one: ForecastHyperware.channel1,
        hyperware_channel_two: ForecastHyperware.channel2,
        metaware_channel_one: ForecastMetaware.channel1,
        metaware_channel_two: ForecastMetaware.channel2,
      });
      console.log("POST request successful", response.data);
    } catch (error) {
      console.error("Error making POST request: Forecast", error);
    }
  };
  return (
    <div className=" ">
      <NavBar />
      <h1 className="text-4xl text-start px-3 py-2 underline">
        Forecasting Decision
      </h1>
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="rounded-lg -2xl h-full  flex flex-col justify-center">
          <Forecasting_sales
            setForecastHyperwaretopass={setForecastHyperware}
          />
        </div>
        <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg />
        </div>
        <div className="rounded-lg -2xl h-96  flex flex-col justify-center">
          <Forecasting_sales2 setForecastMetawaretopass={setForecastMetaware} />
        </div>
        <ForecastDataChart
          submitForecast={submitForecast}
          ForecastHyperware={ForecastHyperware}
          ForecastMetaware={ForecastMetaware}
        />
      </div>
    </div>
  );
};

export default Forecast;
