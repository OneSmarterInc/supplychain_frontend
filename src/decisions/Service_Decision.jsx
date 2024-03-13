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
} from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
// import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import ServiceDataChart from "../DataChartsOfDecisions/Service/ServiceDataChart";
const Service_Decision = () => {
  const regions = ["region1", "region2", "region3"];

  const [serviceValue, setServiceValue] = useState({
    region1: "",
    region2: "",
    region3: "",
  });

  const handleChange = (region, value) => {
    setServiceValue({ ...serviceValue, [region]: value });
  };

  const { api } = useContext(MyContext);
  const submitService = async () => {
    try {
      const response = await axios.post(`${api}/decision/service/`, {
        firm_key: "123",
        service_region_one: serviceValue.region1,
        service_region_two: serviceValue.region2,
        service_region_three: serviceValue.region3,
      });
      console.log("POST request successful", response.data);
    } catch (error) {
      console.error("Error making POST request: Service", error);
    }
  };

  console.log("servicevalue", serviceValue);

  return (
    <div>
      <NavBar />
      <div>
        <h1 className="text-4xl text-start px-3 py-2  underline">
          Service Decision
        </h1>
        <div className="grid grid-cols-2 grid-flow-col gap-3  m-1">
          <div className="row-span-2 rounded-lg -2xl h-full  flex flex-col justify-start">
            <Box>
              <Text className="p-5 py-3 pb-0 text-2xl">
                <strong>Service</strong>
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
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </Select>
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </div>
          <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
            <InfoImg />
          </div>

          <ServiceDataChart
            submitService={submitService}
            serviceDataPreview={serviceValue}
          />
        </div>
      </div>
    </div>
  );
};

export default Service_Decision;
