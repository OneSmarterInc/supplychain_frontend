import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import InfoImg from "../Components/InfoImg";
import NavBar from "../Components/NavBar";
// import DataChart from "../Components/DataChart";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import ManufacturingDataChart from "../DataChartsOfDecisions/Manufacturing/ManufacturingDataChart";
import { useNavigate } from "react-router-dom";

const Manufacturing_Decisions = () => {
  const { api } = useContext(MyContext);
  const [ManufacturingData, setManufacturingData] = useState();
  const [values, setValues] = useState({
    Production: {
      productZero: 0,
      hyperware: 0,
      metaware: 0,
    },
    EmergencyLimit: {
      productZero: 0,
      hyperware: 0,
      metaware: 0,
    },
    VolumeFlexibility: {
      productZero: 0,
      hyperware: 0,
      metaware: 0,
    },
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }
  console.log("Firm Key demand Live Sim: -------", firm_key_new);

  useEffect(() => {
    getManufacturing();
  }, []);

  useEffect(() => {
    if (ManufacturingData) {
      setValues({
        Production: {
          productZero: ManufacturingData.production_zero,
          hyperware: ManufacturingData.production_hyperware,
          metaware: ManufacturingData.production_metaware,
        },
        EmergencyLimit: {
          productZero: ManufacturingData.emergency_limit_zero,
          hyperware: ManufacturingData.emergency_limit_hyperware,
          metaware: ManufacturingData.emergency_limit_metaware,
        },
        VolumeFlexibility: {
          productZero: ManufacturingData.volume_flexibility_zero,
          hyperware: ManufacturingData.volume_flexibility_hyperware,
          metaware: ManufacturingData.volume_flexibility_metaware,
        },
      });
    }
  }, [ManufacturingData]);

  const getManufacturing = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Manufacture",
          current_quarter: selectedSim[0].current_quarter,
          firm_key: firm_key_new,
        },
      });
      const data = response.data;
      setManufacturingData(data);
      localStorage.setItem("ManufacturingData", JSON.stringify(data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  const toast = useToast();
  const navigate = useNavigate();
  const submitManufacturing = async () => {
    try {
      const response = await axios.post(`${api}/decision/manufacture/`, {
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSim[0].current_quarter,
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
      getManufacturing();
      addUserLogger();
      toast({
        title: "Manufacturing Submitted Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/distribution");
    } catch (error) {
      console.error("Error making POST request: Manufacturing", error);
    }
  };
  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        decision: "Manufacturing",
        action: "created",
        ip_address: "123.345.1",
        username: user.username,
        firm_key: firm_key_new,
        current_quarter:selectedSim[0].current_quarter,

      });
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
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
      <div style={{ fontFamily: "ABeeZee" }} className=" ">
        <div className="flex justify-between">
          <h1
            style={{ fontFamily: "ABeeZee" }}
            className="text-2xl text-start pl-6 py-2 "
          >
            Manufacturing Decision
          </h1>

          <div className="flex">
            <h1 className="text-xl text-start px-3 py-2 text-blue-500">
              {selectedSim[0].name}
            </h1>
            <h1 className="text-xl text-start px-1 py-2 text-blue-500">|</h1>
            <h1 className="text-xl text-start px-3 py-2 text-gray-600">
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

                    <Th>
                      {
                        selectedSim[0]?.renamedMappedData?.dataVariabllesMapp
                          ?.hyperware
                      }
                    </Th>
                    <Th>
                      {
                        selectedSim[0]?.renamedMappedData?.dataVariabllesMapp
                          ?.metaware
                      }
                    </Th>
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
            <div className="rounded-lg -2xl h-96  flex flex-col justify-start"></div>
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
