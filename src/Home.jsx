import React from "react";
import RawMaterial from "./Components/RawMaterial";
import SupplyChainTable from "./Components/SupplyChainTable";
import InfoImg from "./Components/InfoImg";
import DataChart from "./Components/DataChart";

const Home = () => {
  const seriesData = [1,2,3,4,5,6,7,8]
  document.body.style.backgroundColor= "#e0e2e4"
  return (
    <div>
      <h1 className="text-4xl text-center py-1 underline">Procurement Decision</h1>
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="rounded-2xl h-full  flex flex-col justify-center">
          <RawMaterial />
        </div>
        <div className="rounded-2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg />
        </div>
        <div className="rounded-2xl h-96  flex flex-col justify-center">
          <SupplyChainTable />
        </div>
        <div className="rounded-2xl h-96 "> <DataChart series={seriesData}/></div>
      </div>
      
    </div>
  );
};

export default Home;