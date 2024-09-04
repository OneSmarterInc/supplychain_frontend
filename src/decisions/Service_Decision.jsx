import React, { useContext, useEffect, useState } from "react";
import {
  Select,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Text,
} from "@chakra-ui/react";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import InfoButton from "../Components/InfoButton"; // Added InfoButton for consistency

const Service_Decision = () => {
  const { api } = useContext(MyContext);
  const regions = ["region1", "region2", "region3"];
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const currentQuarter = selectedSimData[0]?.current_quarter || 1; // Assuming the current quarter is provided in the sim data
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter); // Set the default to the current quarter

  const toast = useToast();
  const navigate = useNavigate();
  const [serviceValue, setServiceValue] = useState({
    region1: "",
    region2: "",
    region3: "",
  });

  const handleChange = (region, value) => {
    setServiceValue({ ...serviceValue, [region]: value });
  };

  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  let firm_key_new = "";

  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item) =>
      item.emails.includes(user.email)
    );
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  const [ServiceData, setServiceData] = useState();

  useEffect(() => {
    getService();
  }, [selectedQuarter]);

  useEffect(() => {
    if (ServiceData) {
      setServiceValue({
        region1: ServiceData.service_region_one,
        region2: ServiceData.service_region_two,
        region3: ServiceData.service_region_three,
      });
    }
  }, [ServiceData]);

  const getService = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Service",
          current_quarter: selectedQuarter,
          firm_key: firm_key_new,
        },
      });
      const data = response.data;
      setServiceData(data);
      localStorage.setItem("ServiceData", JSON.stringify(data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const submitService = async () => {
    try {
        console.log("Submitting service with values:", serviceValue);
        const response = await axios.post(`${api}/decision/service/`, {
            simulation_id: selectedSim[0].simulation_id,
            admin_id: selectedSim[0].admin_id,
            user_id: user.userid,
            firm_key: firm_key_new,
            quarter: selectedSim[0].current_quarter,
            service_region_one: serviceValue.region1,
            service_region_two: serviceValue.region2,
            service_region_three: serviceValue.region3,
        });
        console.log("POST request successful", response.data);
        addUserLogger();
        getService();
        toast({
            title: "Service Submitted successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
        });
        navigate("/Demand");
    } catch (error) {
        console.error("Error making POST request: Service", error.response?.data || error.message);
    }
};

  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        decision: "Service",
        action: "created",
        ip_address: "123.345.1",
        username: user.first_name +" "+ user.last_name,
        firm_key: firm_key_new,
        current_quarter: selectedSim[0].current_quarter,
      });
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  return (
    <div>
      <div style={{ fontFamily: "ABeeZee" }}>
      <div className="sm:grid grid-cols-1 gap-3 m-1">
          <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow px-2">
            <InfoImg decision={"Service"} />
            <div className="flex items-center justify-between w-full">
            <div className="flex items-center pl-5 pt-2 pb-2">
                <Text>Load data Quarterly</Text>
                <div className="pl-4 flex space-x-4">
                  {Array.from(
                    { length: selectedSim[0]?.current_quarter || 0 },
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
              <InfoButton decision="Service" />
            </div>
            <Box>
              <Table className="min-w-full bg-white rounded-md shadow-sm">
                <Thead className="bg-gray-100">
                  <Tr>
                    <Th>Service Outsourcing</Th>
                    <Th>
                      {selectedSim[0]?.renamedMappedData?.RegionMapp?.region1}
                    </Th>
                    <Th>
                      {selectedSim[0]?.renamedMappedData?.RegionMapp?.region2}
                    </Th>
                    <Th>
                      {selectedSim[0]?.renamedMappedData?.RegionMapp?.region3}
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td className="p-3 font-medium text-gray-900">
                      Service Outsourcing
                    </Td>
                    {regions.map((region) => (
                      <Td key={region}>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                          onChange={(e) => handleChange(region, e.target.value)}
                          value={serviceValue[region]}
                          className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                        >
                          <option value="1">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </Select>
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
            </Box>
               {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={submitService}
              className={`${selectedQuarter === currentQuarter
                  ? "bg-red-500 hover:bg-black-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={selectedQuarter !== currentQuarter}
            >
              Submit Service
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Service_Decision;