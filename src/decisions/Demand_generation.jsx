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

  return (
    <div>
      <NavBar />
      <h1 className="text-4xl text-start px-3 py-2 underline">
        Demand Generation Decision
      </h1>
      <div className="grid grid-cols-2 grid-flow-col gap-3  m-1 ">
        <div className="row-span-2 rounded-lg -2xl  flex flex-col justify-center overflow-scroll h-[600px] scroll-pt-96">
          <div className="mt-[720px]"></div>
          <Demand_hype_ch1 setHypeCh1ValuetoParent={setHypeCh1Value} />
          <Demand_hype_ch2 setHypeCh2ValuetoParent={setHypeCh2Value} />
          <Demand_meta_ch1 setMetaCh1ValuetoParent={setMetaCh1Value} />
          <Demand_meta_ch2 setMetaCh2ValuetoParent={setMetaCh2Value} />
        </div>
        <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg />
        </div>

        <DemandDataChart
          metaCh1Value={metaCh1Value}
          metaCh2Value={metaCh2Value}
          hypeCh1Value={hypeCh1Value}
          hypeCh2Value={hypeCh2Value}
        />
      </div>
    </div>
  );
};

export default Demand_generation;
