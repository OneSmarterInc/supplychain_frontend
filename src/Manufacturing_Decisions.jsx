import React, { useState } from "react";
import {
  HStack,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Text,
} from "@chakra-ui/react";
import InfoImg from "./Components/InfoImg";
import NavBar from "./Components/NavBar";
const Manufacturing_Decisions = () => {
  const [values, setValues] = useState({
    Production: { productZero: 74000, hyperware: 74000, metaware: 74000 },
    EmergencyLimit: { productZero: 74000, hyperware: 74000, metaware: 74000 },
    VolumeFlexibility: {
      productZero: 74000,
      hyperware: 74000,
      metaware: 74000,
    },
    // Add more channels and regions as needed
  });

  const handleChange = (channel, region, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [channel]: {
        ...prevValues[channel],
        [region]: newValue,
      },
    }));
  };
  return (
    <div>
      <NavBar />
      <div className=" bg-slate-300">
        <h1 className="text-4xl text-start px-3 py-2 underline">
          Manufacturing Decisions
        </h1>
        <div className="grid grid-cols-2 grid-flow-col gap-3 m-1">
          <div className="row-span-2 rounded-2xl h-full  flex flex-col justify-center">
            <div className="">
              <Text className="p-5 py-3 text-2xl">
                <strong>Report</strong>
              </Text>
              <Table
                variant="striped"
                width={"650px"}
                colorScheme="#C9D5DD"
                borderWidth="0.5px"
                className="mx-3 bg-slate-200"
              >
                <Thead fontWeight="bold">
                  <Tr>
                    <Th fontWeight="bold"></Th>
                    <Th>Product Zero</Th>
                    <Th>Hyperware</Th>
                    <Th>Metaware</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(values).map((channel) => (
                    <Tr key={channel}>
                      <Td>
                        <strong>{channel}</strong>
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          value={values[channel].productZero}
                          onChange={(e) =>
                            handleChange(channel, "region1", e.target.value)
                          }
                          border="1px solid black"
                        />
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          value={values[channel].hyperware}
                          onChange={(e) =>
                            handleChange(channel, "region2", e.target.value)
                          }
                          border="1px solid black"
                        />
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          value={values[channel].metaware}
                          onChange={(e) =>
                            handleChange(channel, "region3", e.target.value)
                          }
                          border="1px solid black"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
            <div className="rounded-2xl h-96  flex flex-col justify-start">
              <Text className="p-5 pb-2 pt-6 text-2xl">
                <strong>Sales Volume Forecast:</strong>
              </Text>
              <Text className="p-5 py-1  pl-8 text-3xl ">
                <strong className="text-green-600">Hyperware: </strong>
                <span>179000</span>
              </Text>
              <Text className="p-5 py-1 pl-8 text-3xl ">
                <strong className="text-green-600">Metaware: </strong>
                <span>171000</span>
              </Text>
            </div>
          </div>
          <div className="rounded-2xl h-64 bg-cover overflow-hidden bg-no-repeat">
            <InfoImg />
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

export default Manufacturing_Decisions;
