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
  Spinner,
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
  const [loading, setLoading] = useState(false);
  const [isLoadingLastQuarter, setIsLoadingLastQuarter] = useState(false);
  const [DistributionData, setDistributionData] = useState({});
  const [values, setValues] = useState({
    distribution_center: {},
    rfid: {},
    emergency_carrier: {},
    cross_docking: [],
    fgi_surface_shipping: {},
    sac_surface_shipping: {},
  });
  const toast = useToast();
  const navigate = useNavigate();
  let firm_key_new = "";

  if (selectedSimData[0]?.firm_data.length) {
    let firm_obj = selectedSimData[0]?.firm_data.filter((item) =>
      item.emails.includes(user.email)
    );
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  const availableCarriers = [
    selectedSimData[0]?.renamedMappedData?.distributerMapp["I"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["J"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["K"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["L"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["M"],
    selectedSimData[0]?.renamedMappedData?.distributerMapp["N"],
  ];

  useEffect(() => {
    setLoading(true);
    getDistribution().finally(() => setLoading(false));
  }, [selectedQuarter]);

  useEffect(() => {
    if (DistributionData) {
      setValues({
        distribution_center: DistributionData.distribution_center || {},
        rfid: DistributionData.rfid || {},
        emergency_carrier: DistributionData.emergency_carrier || {},
        cross_docking: DistributionData.cross_docking || [],
        fgi_surface_shipping: DistributionData.fgi_surface_shipping || {},
        sac_surface_shipping: DistributionData.sac_surface_shipping || {},
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
          current_quarter: selectedQuarter,
          firm_key: firm_key_new,
        },
      });
      setDistributionData(response.data);
      localStorage.setItem("DistributionData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error making GET request:", error);
      setDistributionData({});
    }
  };

  const loadPreviousQuarter = async () => {
    if (currentQuarter <= 1) return;

    const previousQuarter = currentQuarter - 1;
    setIsLoadingLastQuarter(true);
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSimData[0].simulation_id,
          admin_id: selectedSimData[0].admin_id,
          current_decision: "Distribution",
          current_quarter: previousQuarter,
          firm_key: firm_key_new,
        },
      });

      const previousData = response.data;
      setDistributionData(previousData); // Set previous quarter's data to current state
      toast({
        title: `Loaded data from Quarter ${previousQuarter}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error loading previous quarter data:", error);
      toast({
        title: "Failed to load previous quarter data",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoadingLastQuarter(false);
    }
  };

  const validateInputs = () => {
    const requiredFields = ["distribution_center", "rfid", "emergency_carrier", "fgi_surface_shipping", "sac_surface_shipping"];
    for (const field of requiredFields) {
      if (!values[field] || Object.keys(values[field]).length === 0) {
        toast({
          title: "Validation Error",
          description: `Please fill all the required fields for ${field}.`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return false;
      }
    }
    return true;
  };

  const submitDistribution = async () => {
    if (!validateInputs()) return;

    setLoading(true);
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
      getDistribution();
      toast({
        title: "Distribution Submitted Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/Transport");
    } catch (error) {
      console.error("Error making POST request: Distribution", error);
      toast({
        title: "Error submitting distribution decision",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
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
  };

  const regions = ["region1", "region2", "region3"];

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
                  {Array.from({ length: currentQuarter }, (_, i) => (
                    <div
                      key={i + 1}
                      onClick={() => setSelectedQuarter(i + 1)}
                      className={`flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-gray-100 text-gray-700 cursor-pointer ${selectedQuarter === i + 1 ? "bg-red-500 border-red-500 text-white" : ""
                        }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <InfoButton decision="Distribution" />
            </div>

            <div
              onClick={loadPreviousQuarter}
              className="font-bold py-2 px-4 text-red-400 cursor-pointer"
              disabled={isLoadingLastQuarter || currentQuarter <= 1}
            >
              <span className="text-black">To load inputs from the previous quarter, </span>
              {isLoadingLastQuarter ? <Spinner size="sm" /> : "Click here!"}
            </div>

            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                <Spinner size="xl" />
              </Box>
            ) : (
              <Box className="ml-4 mr-4">
                <Table variant="simple" bg="white" mt="4" className="rounded-md">
                  <Thead className="bg-gray-100 text-gray-700 font-semibold">
                    <Tr>
                      <Th style={{ color: "#D10000" }}> Distribution </Th>
                      {regions.map((region, idx) => (
                        <Th key={idx}>{selectedSimData[0]?.renamedMappedData?.RegionMapp?.[region]}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Object.keys(values).map((channel) =>
                      channel !== "cross_docking" ? (
                        <Tr key={channel} className="border-t">
                          <Td className="p-3 font-medium text-gray-900">
                            {channel.replace(/_/g, " ").toUpperCase()}
                          </Td>
                          {regions.map((region) => (
                            <Td key={region}>
                              <Select
                                placeholder="Select"
                                value={values[channel][region] || ""}
                                onChange={(e) => handleChange(channel, region, e.target.value)}
                                className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                                fontSize={15}
                                width="100px"
                              >
                                {[0, 1, 2].map((option) => (
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
                              <strong>CROSS DOCKING</strong>
                            </Td>
                          </Tr>
                          {values.cross_docking.map((row, rowIndex) => (
                            <Tr key={rowIndex}>
                              <Td>Carrier {row.carrier}</Td>
                              {regions.map((region) => (
                                <Td key={region}>
                                  <Select
                                    placeholder="Select"
                                    value={row[region] || ""}
                                    onChange={(e) => handleCrossDockingChange(rowIndex, region, e.target.value)}
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
                          <Tr>
                            <Td colSpan={regions.length + 1}>
                              <Select
                                placeholder="Add Carrier"
                                onChange={(e) => addCrossDockingCarrier(e.target.value)}
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
                        </React.Fragment>
                      )
                    )}
                  </Tbody>
                </Table>
              </Box>
            )}

            <div className="flex justify-end mt-4">
              <Button
                onClick={submitDistribution}
                colorScheme="red"
                disabled={loading}
                isLoading={loading}
                loadingText="Submitting"
              >
                Submit Distribution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distribution_Decision;