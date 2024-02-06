import React from "react";
import Forecasting_infoimg from "./Components/Forecasting_infoimg";
import Forecasting_sales from "./Components/Forecasting_sales";
import Forecasting_sales2 from "./Components/Forecasting_sales2";
import { Button, HStack, Select } from "@chakra-ui/react";
const Forecast = () => {
  document.body.style.backgroundColor= "#e0e2e4"

  return (
    <div>
      <h1 className="text-4xl text-center py-1 underline">Forecasting Decision</h1>
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="rounded-2xl h-full  flex flex-col justify-center">
          <Forecasting_sales />
        </div>
        <div className="rounded-2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <Forecasting_infoimg />
        </div>
        <div className="rounded-2xl h-96  flex flex-col justify-center">
          <Forecasting_sales2 />
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
      </div>
      
    </div>
  );
};

export default Forecast;
