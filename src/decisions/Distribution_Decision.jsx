import React, { useContext, useState } from "react";
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
  Text,
  Button,
} from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import DistributionDataChart from "../DataChartsOfDecisions/Distribution/DistributionDataChart";
import { useEffect } from "react";

const Distribution_Decision = () => {
  const { api } = useContext(MyContext);

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  const [DistributionData, setDistributionData] = useState();

  const [values, setValues] = useState({
    distribution_center: {},
    rfid: {},
    emergency_carrier: {},
    cross_docking: [],
    fgi_surface_shipping: {},
    sac_surface_shipping: {},
  });
  console.log("Distribution Values:---", values);
  useEffect(() => {
    getDistribution();
  }, []);

  useEffect(() => {
    if (DistributionData) {
      setValues({
        distribution_center: DistributionData.distribution_center,
        rfid: DistributionData.rfid,
        emergency_carrier: DistributionData.emergency_carrier,
        cross_docking: DistributionData.cross_docking,
        fgi_surface_shipping: DistributionData.fgi_surface_shipping,
        sac_surface_shipping: DistributionData.sac_surface_shipping,
      });
    }
  }, [DistributionData]);

  const getDistribution = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Distribution",
          current_quarter: selectedSim[0].current_quarter,
          firm_key: firm_data,
        },
      });
      const data = response.data;
      setDistributionData(data);
      localStorage.setItem("DistributionData", JSON.stringify(data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const [availableCarriers, setAvailableCarriers] = useState([
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
  ]);

  const handleChange = (channel, region, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [channel]: {
        ...prevValues[channel],
        [region]: newValue,
      },
    }));
  };

  const handleCrossDockingChange = (index, region, newValue) => {
    setValues((prevValues) => {
      const newCrossDocking = [...prevValues.cross_docking];
      newCrossDocking[index] = {
        ...newCrossDocking[index],
        [region]: newValue,
      };
      return {
        ...prevValues,
        cross_docking: newCrossDocking,
      };
    });
  };

  const addCrossDockingCarrier = (carrier) => {
    setValues((prevValues) => ({
      ...prevValues,
      cross_docking: [
        ...prevValues.cross_docking,
        { carrier, region1: "", region2: "", region3: "" },
      ],
    }));
    setAvailableCarriers((prevCarriers) =>
      prevCarriers.filter((c) => c !== carrier)
    );
  };

  const regions = ["region1", "region2", "region3"];
  const options = {
    distribution_centerOpt: [0, 1],
    rfidOpt: [0, 1],
    emergency_carrierOpt: ["I", "J", "K", "L", "M", "N"],
    cross_dockingOpt: ["I", "J", "K", "L", "M", "N"],
    fgi_surface_shippingOpt: [0, 1],
    sac_surface_shippingOpt: [0, 1],
  };

  const submitDistribution = async () => {
    try {
      const response = await axios.post(`${api}/decision/distribution/`, {
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_data,
        quarter: selectedSim[0].current_quarter,
        distribution_center: values.distribution_center,
        rfid: values.rfid,
        emergency_carrier: values.emergency_carrier,
        cross_docking: values.cross_docking,
        fgi_surface_shipping: values.fgi_surface_shipping,
        sac_surface_shipping: values.sac_surface_shipping,
      });
      console.log("POST request successful", response.data);
      addUserLogger();
      getDistribution();
    } catch (error) {
      console.error("Error making POST request: Manufacturing", error);
    }
  };

  const addUserLogger = async () => {
    try {
      const response = await axios.post(
        `${api}/adduserlogs/`,

        {
          firm_key: firm_data,
          users: user.email,
        }
      );
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  return (
    <div>
      <div style={{ fontFamily: "ABeeZee" }}>
        <NavBar />
        <div className="flex justify-between">
          <h1
            style={{ fontFamily: "ABeeZee" }}
            className="text-2xl text-start pl-6 py-2 "
          >
            Distribution Decision
          </h1>

          <div className="flex">
            <h1 className="text-xl text-start px-3 py-2 text-blue-500">
              {selectedSim[0].name}
            </h1>
            <h1 className="text-xl text-start px-1 py-2 text-blue-500">|</h1>
            <h1 className="text-xl text-start px-3 py-2 text-gray-600 ">
              {user.username}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-col gap-3  m-1">
          <div className="row-span-2 m-3 rounded-2xl  h-screen bg-white p-2  flex flex-col justify-start">
            <Box>
              <Text className="p-5 py-3 pb-0 text-xl">
                <strong>Distribution</strong>
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
                      <Th key={region}>
                        {region.charAt(0).toUpperCase() + region.slice(1)}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(values).map((channel, index) =>
                    channel !== "cross_docking" ? (
                      <Tr key={channel}>
                        <Td>
                          <strong>{channel}</strong>
                        </Td>
                        {regions.map((region) => (
                          <Td key={region}>
                            <Select
                              placeholder="Select"
                              value={values[channel][region.toLowerCase()]}
                              onChange={(e) =>
                                handleChange(
                                  channel,
                                  region.toLowerCase(),
                                  e.target.value
                                )
                              }
                              border={`1px solid ${
                                !values[channel][region.toLowerCase()]
                                  ? "red"
                                  : "green"
                              }`}
                              className={`border placeholder:text-red-400`}
                              fontSize={15}
                              width="100px"
                            >
                              {options[channel + "Opt"].map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </Select>
                          </Td>
                        ))}
                      </Tr>
                    ) : (
                      <React.Fragment key={channel}>
                        <Tr>
                          <Td colSpan={regions.length + 1}>
                            <strong>{channel}</strong>
                          </Td>
                        </Tr>
                        {values.cross_docking.map((row, rowIndex) => (
                          <Tr key={rowIndex}>
                            <Td>Carrier {row.carrier}</Td>
                            {regions.map((region) => (
                              <Td key={region}>
                                <Select
                                  placeholder="Select"
                                  value={row[region]}
                                  onChange={(e) =>
                                    handleCrossDockingChange(
                                      rowIndex,
                                      region,
                                      e.target.value
                                    )
                                  }
                                  border={`1px solid ${
                                    !row[region] ? "red" : "green"
                                  }`}
                                  className={`border placeholder:text-red-400`}
                                  fontSize={15}
                                  width="100px"
                                >
                                  {[0, 1].map((option) => (
                                    <option key={option} value={option}>
                                      {option}
                                    </option>
                                  ))}
                                </Select>
                              </Td>
                            ))}
                          </Tr>
                        ))}
                        {availableCarriers.length > 0 && (
                          <Tr>
                            <Td colSpan={regions.length + 1}>
                              <Select
                                placeholder="Add Carrier"
                                onChange={(e) =>
                                  addCrossDockingCarrier(e.target.value)
                                }
                                width="150px"
                              >
                                {availableCarriers.map((carrier) => (
                                  <option key={carrier} value={carrier}>
                                    Carrier {carrier}
                                  </option>
                                ))}
                              </Select>
                            </Td>
                          </Tr>
                        )}
                      </React.Fragment>
                    )
                  )}
                </Tbody>
              </Table>
            </Box>
          </div>
          <div className="rounded-2xl m-3  overflow-hidden    bg-white h-screen p-2">
            <InfoImg />
            <div className="py-10">
              {" "}
              <DistributionDataChart
                submitDistribution={submitDistribution}
                DistributionDataPreview={values}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distribution_Decision;
