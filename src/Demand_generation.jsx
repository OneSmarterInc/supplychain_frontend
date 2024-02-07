import React from "react";
import Forecasting_infoimg from "./Components/Forecasting_infoimg";
import Demand_hype_ch1 from "./Components/Demand_hype_ch1";
import Demand_hype_ch2 from "./Components/Demand_hype_ch2";
// import Demand_meta_ch1 from "./Components/Demand_meta_ch1";
// import Demand_meta_ch2 from "./Components/Demand_meta_ch2";
import { HStack, Select } from "@chakra-ui/react";
import NavBar from "./Components/NavBar";

const Demand_generation = () => {
  document.body.style.backgroundColor = "#e0e2e4";

  return (
    <div>
      <NavBar />
      <h1 className="text-4xl text-start px-3 py-2 underline">
        Demand Generation Decision
      </h1>
      <div className="grid grid-cols-2 grid-flow-col gap-3  m-1">
        <div className="row-span-2 rounded-2xl h-full  flex flex-col justify-center">
          <Demand_hype_ch1 />
          <Demand_hype_ch2 />
        </div>
        <div className="rounded-2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <Forecasting_infoimg />
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

export default Demand_generation;
