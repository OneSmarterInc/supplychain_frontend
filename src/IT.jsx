import React from "react";
import InfoImg from "./Components/InfoImg";
import IT_suppliers from "./Components/IT_suppliers";
import IT_reports from "./Components/IT_reports";
import { Button, HStack, Select } from "@chakra-ui/react";
const IT = () => {
  document.body.style.backgroundColor= "#e0e2e4"

  return (
    <div>
      <h1 className="text-4xl text-center py-1 underline">Information Technology Decision</h1>
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="rounded-2xl h-full  flex flex-col justify-center">
          <IT_suppliers />
        </div>
        <div className="rounded-2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg />
        </div>
        <div className="rounded-2xl h-96  flex flex-col justify-center">
          <IT_reports />
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

export default IT;
