import React, { useContext, useState, useEffect } from "react";
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
  useToast,
} from "@chakra-ui/react";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import InfoButton from "../Components/InfoButton";

const Distribution_Decision = () => {
  const { api } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData"));
  const currentQuarter = selectedSimData[0]?.current_quarter || 1;
  const firm_data = Object.keys(selectedSimData[0]?.firm_data)[0];
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);
  let firm_key_new = "";

  if (selectedSimData[0]?.firm_data.length) {
    let firm_obj = selectedSimData[0]?.firm_data.filter((item) =>
      item.emails.includes(user.email)
    );
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  const [DistributionData, setDistributionData] = useState();
  const [values, setValues] = useState({
    distribution_center: {},
    rfid: {},
    emergency_carrier: {},
    cross_docking: [],
    fgi_surface_shipping: {},
    sac_surface_shipping: {},
  });

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
          sim_id: selectedSimData[0].simulation_id,
          admin_id: selectedSimData[0].admin_id,
          current_decision: "Distribution",
          current_quarter: selectedSimData[0].current_quarter,
          firm_key: firm_key_new,
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
    selectedSimData[0]?.renamedMappedData?.distributerMapp["I"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["J"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["K"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["L"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["M"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["N"],
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
    distribution_centerOpt: [0, 1, 2],
    rfidOpt: [0, 1, 2],
    emergency_carrierOpt: [
      selectedSimData[0]?.renamedMappedData?.distributerMapp["I"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["J"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["K"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["L"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["M"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["N"],
    ],
    cross_dockingOpt: [
      selectedSimData[0]?.renamedMappedData?.distributerMapp["I"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["J"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["K"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["L"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["M"],
      selectedSimData[0]?.renamedMappedData?.distributerMapp["N"],
    ],
    fgi_surface_shippingOpt: [0, 1],
    sac_surface_shippingOpt: [0, 1, 2],
  };

  const toast = useToast();
  const navigate = useNavigate();

  const submitDistribution = async () => {
    try {
      const response = await axios.post(`${api}/decision/distribution/`, {
        simulation_id: selectedSimData[0].simulation_id,
        admin_id: selectedSimData[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSimData[0].current_quarter,
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
      toast({
        title: "Distribution Submitted Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/Service");
    } catch (error) {
      console.error("Error making POST request: Manufacturing", error);
    }
  };

  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSimData[0].simulation_id,
        admin_id: selectedSimData[0].admin_id,
        decision: "Distribution",
        action: "created",
        ip_address: "123.345.1",
        username: user.first_name +" "+ user.last_name,
        firm_key: firm_key_new,
        current_quarter: selectedSimData[0].current_quarter,
      });
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const formatKey = (key) => {
    return key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  };

  return (
    <div>
      <div style={{ fontFamily: "ABeeZee" }}>
        <div className="sm:grid grid-cols-1 gap-3 m-1">
          <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow px-2">
            <InfoImg decision={"Distribution"} />
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center pl-5 pt-2 pb-2">
                <Text>Load data Quarterly</Text>
                <div className="pl-4 flex space-x-4">
                  {Array.from(
                    { length: selectedSimData[0]?.current_quarter || 0 },
                    (_, i) => (
                      <div
                        key={i + 1}
                        onClick={() => setSelectedQuarter(i + 1)}
                        className={`flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-gray-100 text-gray-700 cursor-pointer ${
                          selectedQuarter === i + 1
                            ? "bg-red-500 border-red-500 text-white"
                            : ""
                        }`}
                      >
                        {i + 1}
                      </div>
                    )
                  )}
                </div>
              </div>
              <InfoButton />
            </div>
            <Box>
              <Table className="min-w-full bg-white rounded-md shadow-sm">
                <Thead className="bg-gray-100">
                  <Tr>
                    <Th> </Th>
                    <Th>
                      {selectedSimData[0]?.renamedMappedData?.RegionMapp?.region1}
                    </Th>
                    <Th>
                      {selectedSimData[0]?.renamedMappedData?.RegionMapp?.region2}
                    </Th>
                    <Th>
                      {selectedSimData[0]?.renamedMappedData?.RegionMapp?.region3}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(values).map((channel, index) =>
                    channel !== "cross_docking" ? (
                      <Tr key={channel} className="border-t">
                        <Td className="p-3 font-medium text-gray-900">
                          {formatKey(channel)}
                        </Td>
                        {regions.map((region) => (
                          <Td key={region}>
                            <Select
                              disabled={
                                region === "region2" || region === "region3"
                                  ? false
                                  : region === "region1" &&
                                    (channel === "rfid" ||
                                      channel === "sac_surface_shipping")
                                  ? false
                                  : true
                              }
                              placeholder="Select"
                              value={values[channel][region.toLowerCase()]}
                              onChange={(e) =>
                                handleChange(
                                  channel,
                                  region.toLowerCase(),
                                  e.target.value
                                )
                              }
                              className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
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
                            <strong>{formatKey(channel)}</strong>
                          </Td>
                        </Tr>
                        {values.cross_docking.map((row, rowIndex) => (
                          <Tr key={rowIndex}>
                            <Td>Carrier {row.carrier}</Td>
                            {regions.map((region) => (
                              <Td key={region}>
                                <Select
                                  placeholder="Select"
                                  disabled={
                                    region === "region2" || region === "region3"
                                      ? false
                                      : true
                                  }
                                  value={row[region]}
                                  onChange={(e) =>
                                    handleCrossDockingChange(
                                      rowIndex,
                                      region,
                                      e.target.value
                                    )
                                  }
                                  className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
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
                                className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
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
             {/* Submit Button */}
          <div className="flex justify-end mt-4">
            
            <button
              onClick={submitDistribution}
              className={`${selectedQuarter === currentQuarter
                  ? "bg-red-500 hover:bg-black-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={selectedQuarter !== currentQuarter}
            >
              Submit Distribution
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distribution_Decision;