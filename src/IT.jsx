import React from "react";
import InfoImg from "./Components/InfoImg";
import IT_suppliers from "./Components/IT_suppliers";
import IT_reports from "./Components/IT_reports";
import { HStack, Select } from "@chakra-ui/react";
import NavBar from "./Components/NavBar";
const IT = () => {
  document.body.style.backgroundColor= "#e0e2e4"

  return (
    <div >
      <NavBar/>
      <h1 className="text-4xl text-start px-3 py-2 underline">Information Technology Decision</h1>
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="rounded-2xl h-full  flex flex-col justify-center">
          <IT_suppliers />
        </div>
        <div className="rounded-2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg/>
        </div>
        <div className="rounded-2xl h-96  flex flex-col justify-center">
          <IT_reports />
        </div>
        <div className="rounded-2xl h-96 relative">
          <HStack spacing={6} mt={10} ml={10}>
            <Select width="170px" border="1px solid black">
              <option value="">Select Quarter 1</option>
              <option value="">Select Quarter 2</option>
              <option value="">Select Quarter 3</option>
            </Select>
            <Select width="170px" border="1px solid black">
              <option value="">Select Report 1</option>
              <option value="">Select Report 2</option>
              <option value="">Select Report 3</option>
            </Select>
            <button className="bg-slate-400 rounded mx-2 p-2 w-28 hover:scale-105">
              View
            </button>
          </HStack>

          <div className="absolute bottom-24 right-8">
            <button className="bg-red-400 rounded mx-2 p-2 w-28 hover:scale-105">
              Preview
            </button>
            <button className="bg-green-500 rounded mx-2 p-2 w-28 hover:scale-105">
              Submit
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default IT;
