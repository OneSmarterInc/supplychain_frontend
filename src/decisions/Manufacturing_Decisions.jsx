import React, { useContext, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Text } from "@chakra-ui/react";
import InfoImg from "../Components/InfoImg";
import NavBar from "../Components/NavBar";
import DataChart from "../Components/DataChart";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

const Manufacturing_Decisions = () => {
  const { api } = useContext(MyContext);

  const [values, setValues] = useState({
    Production: { productZero: 74000, hyperware: 74000, metaware: null },
    EmergencyLimit: { productZero: 74000, hyperware: null, metaware: 74000 },
    VolumeFlexibility: {
      productZero: 74000,
      hyperware: 74000,
      metaware: 74000,
    },
    // Add more channels and regions as needed
  });

  // console.log("data", values);

  const submitManufacturing = async () => {
    try {
      const response = await axios.post(`${api}/decision/manufacture/`, {
        firm_key: "123",
        quarter: null,
        production_zero: Number(values.Production.productZero),
        production_hyperware: Number(values.Production.hyperware),
        production_metaware: Number(values.Production.metaware),
        emergency_limit_zero: Number(values.EmergencyLimit.productZero),
        emergency_limit_hyperware: Number(values.EmergencyLimit.hyperware),
        emergency_limit_metaware: Number(values.EmergencyLimit.metaware),
        volume_flexibility_zero: Number(values.VolumeFlexibility.productZero),
        volume_flexibility_hyperware: Number(
          values.VolumeFlexibility.hyperware
        ),
        volume_flexibility_metaware: Number(values.VolumeFlexibility.metaware),
      });
      console.log("POST request successful", response.data);
    } catch (error) {
      console.error("Error making POST request: Manufacturing", error);
    }
  };

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
      <div className=" ">
        <h1 className="text-4xl text-start px-3 py-2 underline">
          Manufacturing Decisions
        </h1>
        <div className="grid grid-cols-2 grid-flow-col gap-3 m-1">
          <div className="row-span-2 rounded-lg -2xl h-full  flex flex-col justify-center">
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
                          placeholder="Enter"
                          onChange={(e) =>
                            handleChange(channel, "productZero", e.target.value)
                          }
                          border={`1px solid ${
                            !values[channel].productZero ? "red" : "green"
                          }`}
                          className={`border placeholder:text-red-400`}
                        />
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          value={values[channel].hyperware}
                          placeholder="Enter"
                          onChange={(e) =>
                            handleChange(channel, "hyperware", e.target.value)
                          }
                          border={`1px solid ${
                            !values[channel].hyperware ? "red" : "green"
                          }`}
                          className={`border placeholder:text-red-400`}
                        />
                      </Td>
                      <Td>
                        <Input
                          type="number"
                          value={values[channel].metaware}
                          placeholder="Enter"
                          onChange={(e) =>
                            handleChange(channel, "metaware", e.target.value)
                          }
                          border={`1px solid ${
                            !values[channel].metaware ? "red" : "green"
                          }`}
                          className={`border placeholder:text-red-400`}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </div>
            <div className="rounded-lg -2xl h-96  flex flex-col justify-start">
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
          <div className="rounded-lg -2xl h-64 bg-cover overflow-hidden bg-no-repeat">
            <InfoImg />
          </div>

          <DataChart
            submitManufacturing={submitManufacturing}
            ManufacturingDataPreview={values}
          />
        </div>
      </div>
    </div>
  );
};

export default Manufacturing_Decisions;
