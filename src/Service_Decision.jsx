import React from "react";
import Forecasting_infoimg from "./Components/Forecasting_infoimg";
import {
  HStack,
  Select,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Text,
} from "@chakra-ui/react";
import NavBar from "./Components/NavBar";

const Service_Decision = () => {
  const regions = ["Region 1", "Region 2", "Region 3"];
  return (
    <div>
      <NavBar/>
      <div>
        <h1 className="text-4xl text-start px-3 py-2  underline">
          Service Decision
        </h1>
        <div className="grid grid-cols-2 grid-flow-col gap-3  m-1">
          <div className="row-span-2 rounded-2xl h-full  flex flex-col justify-center">
            {/* <Demand_hype_ch1 />
             */}
            <Box>
              <Text className="p-5 py-3 pb-0 text-2xl">
                <strong>Service</strong>
              </Text>
              <br />
              <Table
                variant="simple"
                className="bg-slate-300 mx-3"
                width={"650px"}
              >
                <Thead>
                  <Tr>
                    <Th> </Th>
                    {regions.map((region) => (
                      <Th key={region}>{region}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Service Outsourcing</Td>
                    {regions.map((region) => (
                      <Td key={region}>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                        >
                          <option value="1">1</option>
                          <option value="1">2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                        </Select>
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
            </Box>
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
    </div>
  );
};

export default Service_Decision;
