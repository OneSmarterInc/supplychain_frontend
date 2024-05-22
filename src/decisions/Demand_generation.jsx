import React, { useState } from "react";
import Demand_hype_ch1 from "../Components/Demand_hype_ch1";
import Demand_hype_ch2 from "../Components/Demand_hype_ch2";
import Demand_meta_ch1 from "../Components/Demand_meta_ch1";
import Demand_meta_ch2 from "../Components/Demand_meta_ch2";
import NavBar from "../Components/NavBar";
// import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";
import DemandDataChart from "../DataChartsOfDecisions/Demand/DemandDataChart";

const Demand_generation = () => {
  const [metaCh1Value, setMetaCh1Value] = useState({});
  const [metaCh2Value, setMetaCh2Value] = useState({});
  const [hypeCh1Value, setHypeCh1Value] = useState({});
  const [hypeCh2Value, setHypeCh2Value] = useState({});

  // console.log("hypeCh1Value", hypeCh1Value);

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

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
          <Demand_hype_ch1 setHypeCh1ValuetoParent={setHypeCh1Value} />
          <Demand_hype_ch2 setHypeCh2ValuetoParent={setHypeCh2Value} />
          <Demand_meta_ch1 setMetaCh1ValuetoParent={setMetaCh1Value} />
          <Demand_meta_ch2 setMetaCh2ValuetoParent={setMetaCh2Value} />
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demand_generation;
