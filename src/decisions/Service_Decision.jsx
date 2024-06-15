import React, { useContext, useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
// import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import ServiceDataChart from "../DataChartsOfDecisions/Service/ServiceDataChart";

const Service_Decision = () => {
  const { api } = useContext(MyContext);
  const regions = ["region1", "region2", "region3"];
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  const [serviceValue, setServiceValue] = useState({
    region1: "",
    region2: "",
    region3: "",
  });

  const handleChange = (region, value) => {
    setServiceValue({ ...serviceValue, [region]: value });
  };

  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  const [ServiceData, setServiceData] = useState();
  console.log("ServiceData:--", ServiceData);
  useEffect(() => {
    getService();
  }, []);

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
          current_quarter: selectedSim[0].current_quarter,
          firm_key: firm_data,
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
      const response = await axios.post(`${api}/decision/service/`, {
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_data,
        quarter: selectedSim[0].current_quarter,
        service_region_one: serviceValue.region1,
        service_region_two: serviceValue.region2,
        service_region_three: serviceValue.region3,
      });
      addUserLogger()
      getService();
      console.log("POST request successful", response.data);
    } catch (error) {
      console.error("Error making POST request: Service", error);
    }
  };

  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        decision: "Forecast",
        action: "created",
        ip_address: "123.345.1",
        username: user.username
      });
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  console.log("servicevalue", serviceValue);

  return (
    <div>
      <NavBar />
      <div style={{ fontFamily: "ABeeZee" }}>
        <div className="flex justify-between">
          <h1 className="text-2xl text-start pl-6 py-2 ">Service Decision</h1>

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
        <div className="grid grid-cols-2 grid-flow-col gap-3  m-1">
          <div className="m-3 rounded-2xl  h-screen bg-white p-2  flex flex-col justify-start">
            <Box>
              <Text className="p-5 font-semibold py-3 pb-0 text-xl">
                Service
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
                          onChange={(e) => handleChange(region, e.target.value)}
                          value={serviceValue[region]}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                        </Select>
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </div>
          <div className="rounded-2xl m-3  overflow-hidden    bg-white h-screen p-2">
            <InfoImg />
            <div className="py-10">
              <ServiceDataChart
                submitService={submitService}
                serviceDataPreview={serviceValue}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service_Decision;
