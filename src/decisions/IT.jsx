import React from "react";
import InfoImg from "../Components/InfoImg";
import IT_suppliers from "../Components/IT_suppliers";
import IT_reports from "../Components/IT_reports";
import { HStack, Select } from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import DataChart from "../Components/DataChart";
const IT = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <NavBar />
      <div className="flex justify-between">
        <h1 className="text-4xl text-start px-3 py-2 ">
          Information Technology Decision
        </h1>

        <div className="flex">
          {" "}
          <h1 className="text-2xl text-start px-3 py-2 text-blue-500">
            MBA-JUN-24
          </h1>{" "}
          <h1 className="text-2xl text-start px-3 py-2 text-gray-600 ">
            {user.username}
          </h1>
        </div>
      </div>

      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="rounded-lg -2xl h-full  flex flex-col justify-center">
          <IT_suppliers />
        </div>
        <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg />
        </div>
        <div className="rounded-lg -2xl h-96  flex flex-col justify-center">
          <IT_reports />
        </div>
        <DataChart />
      </div>
    </div>
  );
};

export default IT;
