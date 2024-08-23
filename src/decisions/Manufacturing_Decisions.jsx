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
  Box,
  Flex,
} from "@chakra-ui/react";
import InfoImg from "../Components/InfoImg";
import NavBar from "../Components/NavBar";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import ManufacturingDataChart from "../DataChartsOfDecisions/Manufacturing/ManufacturingDataChart";
import { useNavigate } from "react-router-dom";
import InfoButton from "../Components/InfoButton";

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

  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const currentQuarter = selectedSimData[0]?.current_quarter || 1;
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const selectedSim = selectedSimData;
  const firm_data = selectedSim[0]?.firm_data ? Object.keys(selectedSim[0].firm_data)[0] : null;

  let firm_key_new = "";
  if (Array.isArray(selectedSim[0]?.firm_data)) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item) => item.emails.includes(user.email));
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

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
        volume_flexibility_hyperware: Number(values.VolumeFlexibility.hyperware),
        volume_flexibility_metaware: Number(values.VolumeFlexibility.metaware),
      });
      console.log("POST request successful", response.data);
      getManufacturing();
      addUserLogger();
      toast({
        title: "Manufacturing Submitted Successfully",
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
        current_quarter: selectedSim[0].current_quarter,
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
    <Box className="overflow-x-auto p-4">
      <Box className="m-3 rounded-2xl bg-white p-6 shadow-md">
        <InfoImg decision={"Forecast"} />
        <Flex justify="space-between" align="center" mb="4">
          <Text className="text-lg font-semibold">Load data Quarterly</Text>
          <Flex space-x-4>
            {Array.from({ length: selectedSimData[0]?.current_quarter || 0 }, (_, i) => (
              <Box
                key={i + 1}
                onClick={() => setSelectedQuarter(i + 1)}
                className={`w-8 h-8 rounded-full border cursor-pointer flex items-center justify-center text-sm font-bold ${
                  selectedQuarter === i + 1
                    ? "bg-red-500 border-red-500 text-white"
                    : "bg-gray-100 border-gray-300 text-gray-700"
                }`}
              >
                {i + 1}
              </Box>
            ))}
          </Flex>
          <InfoButton />
        </Flex>
        <Table className="min-w-full bg-white rounded-md shadow-sm">
          <Thead className="bg-gray-100">
            <Tr>
              <Th className="text-left"></Th>
              <Th className="text-left">Product Zero</Th>
              <Th className="text-left">
                {selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.hyperware}
              </Th>
              <Th className="text-left">
                {selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(values).map((channel) => (
              <Tr key={channel} className="border-t">
                <Td className="p-3 font-medium text-gray-900">{channel}</Td>
                <Td className="p-3">
                  <Input
                    type="number"
                    value={values[channel].productZero}
                    placeholder="Enter"
                    onChange={(e) => handleChange(channel, "productZero", e.target.value)}
                    className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                </Td>
                <Td className="p-3">
                  <Input
                    type="number"
                    value={values[channel].hyperware}
                    placeholder="Enter"
                    onChange={(e) => handleChange(channel, "hyperware", e.target.value)}
                    className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                </Td>
                <Td className="p-3">
                  <Input
                    type="number"
                    value={values[channel].metaware}
                    placeholder="Enter"
                    onChange={(e) => handleChange(channel, "metaware", e.target.value)}
                    className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Manufacturing_Decisions;