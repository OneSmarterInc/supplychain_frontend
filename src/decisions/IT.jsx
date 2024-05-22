import React from "react";
import InfoImg from "../Components/InfoImg";
import IT_suppliers from "../Components/IT_suppliers";
import IT_reports from "../Components/IT_reports";
import { HStack, Select } from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import DataChart from "../Components/DataChart";
const IT = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  return (
    <div>
      <NavBar />
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-start pl-6 py-2 ">
          Information Technology Decision
        </h1>

        <div style={{ fontFamily: "ABeeZee" }} className="flex">
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
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="m-3 rounded-xl  h-screen bg-white p-2  flex flex-col justify-start">
          <IT_suppliers />
          <IT_reports />
        </div>
        <div className="rounded-2xl m-3  overflow-hidden    bg-white h-screen p-2">
          <InfoImg />
          <div className="py-10">
            <DataChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IT;
