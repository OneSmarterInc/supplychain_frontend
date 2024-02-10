import React, { useState } from "react";
import RawMaterial from "../Components/RawMaterial";
import SupplyChainTable from "../Components/SupplyChainTable";
import InfoImg from "../Components/InfoImg";
import DataChart from "../Components/DataChart";
import NavBar from "../Components/NavBar";

const Procurement_Decisions = () => {
  let [newData, setNewData] = useState({});

  document.body.style.backgroundColor = "#e0e2e4";
  return (
    <div>
      <NavBar />
      <h1 className="text-4xl text-start px-3 py-2 underline">
        Procurement Decision
      </h1>
      <div className="sm:grid grid-cols-2 gap-3 m-1">
        <div className="rounded-lg -2xl h-full  flex flex-col justify-center">
          <RawMaterial />
        </div>
        <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg />
        </div>
        <div className="rounded-lg -2xl h-96  flex flex-col justify-center">
          <SupplyChainTable setNewData={setNewData} />
        </div>
        <div className="rounded-lg -2xl h-96 ">
          <DataChart newData={newData} />
        </div>
      </div>
    </div>
  );
};

export default Procurement_Decisions;
