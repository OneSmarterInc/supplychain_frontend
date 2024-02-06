import React from "react";
import Forecasting_infoimg from "./Components/Forecasting_infoimg";
import Demand_hype_ch1 from "./Components/Demand_hype_ch1";
import Demand_hype_ch2 from "./Components/Demand_hype_ch2";
import Demand_meta_ch1 from "./Components/Demand_meta_ch1";
import Demand_meta_ch2 from "./Components/Demand_meta_ch2";
import { Button, HStack, Select } from "@chakra-ui/react";

const Demand_generation = () => {
  document.body.style.backgroundColor= "#e0e2e4"

  return (
    <div>
      <h1 className="text-4xl text-center py-1 underline">Demand Generation Decision</h1>
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="rounded-2xl h-full  flex flex-col justify-center">
          <Demand_hype_ch1 />
        </div>
        <div className="rounded-2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <Forecasting_infoimg />
        </div>
        <div className="rounded-2xl h-96  flex flex-col justify-center">
          <Demand_hype_ch2 />
        </div>
        <div className="rounded-2xl h-96 "> 
        <HStack spacing={6} mt={10} ml={10}>
            <Select width='150px' border='1px solid black'>
                <option value="">Select Quarter</option>
            </Select>
            <Select width='150px' border='1px solid black'>
                <option value="">Select Report</option>
            </Select>
            <Button bgColor='gray' color='white'>View</Button>
            
            </HStack>

            <HStack mt={40} ml={450}>
            <Button bgColor='gray' color='white'>Preview</Button>
            <Button bgColor='#84EB81' color='white'>Submit</Button>
            </HStack>
        </div>
        <div className="rounded-2xl h-96  flex flex-col justify-center">
          <Demand_meta_ch1 />
        </div>
        <div className="rounded-2xl h-96  flex flex-col justify-center">
          <Demand_meta_ch2 />
        </div>
      </div>
      
    </div>
  );
};

export default Demand_generation;
