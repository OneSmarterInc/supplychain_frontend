import React from "react";
import Demand_hype_ch1 from "../Components/Demand_hype_ch1";
import Demand_hype_ch2 from "../Components/Demand_hype_ch2";
// import Demand_meta_ch1 from "./Components/Demand_meta_ch1";
// import Demand_meta_ch2 from "./Components/Demand_meta_ch2";
import NavBar from "../Components/NavBar";
import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";

const Demand_generation = () => {


  return (
    <div>
      <NavBar />
      <h1 className="text-4xl text-start px-3 py-2 underline">
        Demand Generation Decision
      </h1>
      <div className="grid grid-cols-2 grid-flow-col gap-3  m-1">
        <div className="row-span-2 rounded-lg -2xl h-full  flex flex-col justify-center">
          <Demand_hype_ch1 />
          <Demand_hype_ch2 />
        </div>
        <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg />
        </div>

        <DataChart/>
      </div>
    </div>
  );
};

export default Demand_generation;
