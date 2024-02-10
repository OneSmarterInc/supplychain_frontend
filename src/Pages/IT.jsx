import React from "react";
import InfoImg from "../Components/InfoImg";
import IT_suppliers from "../Components/IT_suppliers";
import IT_reports from "../Components/IT_reports";
import { HStack, Select } from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import DataChart from "../Components/DataChart";
const IT = () => {


  return (
    <div >
      <NavBar/>
      <h1 className="text-4xl text-start px-3 py-2 underline">Information Technology Decision</h1>
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="rounded-lg -2xl h-full  flex flex-col justify-center">
          <IT_suppliers />
        </div>
        <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg/>
        </div>
        <div className="rounded-lg -2xl h-96  flex flex-col justify-center">
          <IT_reports />
        </div>
        <DataChart/>
      </div>
      
    </div>
  );
};

export default IT;
