import React, { useContext, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Text } from "@chakra-ui/react";
import InfoImg from "../Components/InfoImg";
import NavBar from "../Components/NavBar";
// import DataChart from "../Components/DataChart";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import ManufacturingDataChart from "../DataChartsOfDecisions/Manufacturing/ManufacturingDataChart";

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

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  return (
    <div>
      <NavBar />
      <div style={{ fontFamily: "ABeeZee" }} className=" ">
        <div className="flex justify-between">
          <h1
            style={{ fontFamily: "ABeeZee" }}
            className="text-2xl text-start pl-6 py-2 "
          >
            Manufacturing Decision
          </h1>

          <div className="flex">
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
        <div className="grid grid-cols-2 grid-flow-col gap-3 m-1">
          <div className="m-3 rounded-2xl  h-screen bg-white p-2  flex flex-col justify-center">
            <div className="">
              <Text className="p-5 py-3 text-xl">
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
              <Text className="p-5 pb-2 pt-6 text-xl">
                <strong>Sales Volume Forecast:</strong>
              </Text>
              <Text className="p-5 py-1  pl-8 text-2xl ">
                <strong className="text-green-600">Hyperware: </strong>
                <span>179000</span>
              </Text>
              <Text className="p-5 py-1 pl-8 text-2xl ">
                <strong className="text-green-600">Metaware: </strong>
                <span>171000</span>
              </Text>
            </div>
          </div>
          <div className="rounded-2xl m-3  overflow-hidden    bg-white h-screen p-2">
            <InfoImg />
            <div className="py-10">
              <ManufacturingDataChart
                submitManufacturing={submitManufacturing}
                ManufacturingDataPreview={values}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manufacturing_Decisions;
