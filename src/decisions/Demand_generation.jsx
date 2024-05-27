import React, { useContext, useEffect, useState } from "react";
import Demand_hype_ch1 from "../Components/Demand_hype_ch1";
import Demand_hype_ch2 from "../Components/Demand_hype_ch2";
import Demand_meta_ch1 from "../Components/Demand_meta_ch1";
import Demand_meta_ch2 from "../Components/Demand_meta_ch2";
import NavBar from "../Components/NavBar";
// import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";
import DemandDataChart from "../DataChartsOfDecisions/Demand/DemandDataChart";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

const Demand_generation = () => {
  const [metaCh1Value, setMetaCh1Value] = useState({});
  const [metaCh2Value, setMetaCh2Value] = useState({});
  const [hypeCh1Value, setHypeCh1Value] = useState({});
  const [hypeCh2Value, setHypeCh2Value] = useState({});

  // console.log("hypeCh1Value", hypeCh1Value);

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  const [demandData, setDemandData] = useState();
  useEffect(() => {
    getDemand();
  }, []);

  const getDemand = async () => {
    try {
      const response = await axios.get(
        `${api}/previous/`,
        {
          params: {
            user_id: user.userid,
            sim_id: selectedSim[0].simulation_id,
            admin_id: selectedSim[0].admin_id,
            current_decision: "Demand",
            current_quarter: selectedSim[0].current_quarter,
            firm_key: firm_data,
          },
        }
      );
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
        firm_key: firm_data,
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
      getDemand();
    } catch (error) {
      console.error("Error making POST request: Transportation", error);
    }
  };
  const { api } = useContext(MyContext);
  return (
    <div style={{ fontFamily: "ABeeZee" }}>
      <NavBar />
      <div style={{ fontFamily: "ABeeZee" }} className="flex justify-between">
        <h1
          style={{ fontFamily: "ABeeZee" }}
          className="text-2xl text-start pl-6 py-2 "
        >
          Demand Generation Decision
        </h1>

        <div className="flex">
          {" "}
          <h1 className="text-xl text-start px-3 py-2 text-blue-500">
            {selectedSim[0].name}
          </h1>{" "}
          <h1 className="text-xl text-start px-1 py-2 text-blue-500">|</h1>{" "}
          <h1 className="text-xl text-start px-3 py-2 text-gray-600 ">
            {user.username}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-flow-col gap-2   ">
        <div className="row-span-2 m-3 rounded-2xl  h-screen bg-white p-2  flex flex-col justify-center overflow-scroll  scroll-pt-96">
          <div className="mt-[620px]"></div>
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
        </div>
        <div className=" rounded-2xl m-3     bg-white h-screen p-2">
          <div className=" bg-cover overflow-hidden bg-no-repeat">
            <InfoImg />
          </div>
          <div className="py-10">
            <DemandDataChart
              metaCh1Value={metaCh1Value}
              metaCh2Value={metaCh2Value}
              hypeCh1Value={hypeCh1Value}
              hypeCh2Value={hypeCh2Value}
              submitDemand={submitDemand}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demand_generation;
