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
import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

const Distribution_Decision = () => {
  const { api } = useContext(MyContext);
  const [values, setValues] = useState({
    distribution_center: {},
    rfid: {},
    emergency_carrier: {},
    cross_docking: {},
    fgi_surface_shipping: {},
    sac_surface_shipping: {},
  });

  // console.log("values", values);

  const handleChange = (channel, region, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [channel]: {
        ...prevValues[channel],
        [region]: newValue,
      },
    }));
  };

  const regions = ["Region1", "Region2", "Region3"];
  const options = {
    distribution_centerOpt: [0, 1, 2],
    rfidOpt: [0, 1],
    emergency_carrierOpt: ["I", "J", "K", "L", "M", "N"],
    cross_dockingOpt: [0, 1],
    fgi_surface_shippingOpt: [1, 2, 3],
    sac_surface_shippingOpt: [1, 2, 3],
  };

  const submitDistribution = async () => {
    try {
      const response = await axios.post(`${api}/decision/distribution/`, {
        firm_key: "123",
        distribution_center: values.distribution_center,
        rfid: values.rfid,
        emergency_carrier: values.emergency_carrier,
        cross_docking: values.cross_docking,
        fgi_surface_shipping: values.fgi_surface_shipping,
        sac_surface_shipping: values.sac_surface_shipping,
      });
      console.log("POST request successful", response.data);
    } catch (error) {
      console.error("Error making POST request: Manufacturing", error);
    }
  };

  return (
    <div>
      <div>
        <NavBar />
        <h1 className="text-4xl text-start px-3 py-2  underline">
          Distribution Decision
        </h1>
        <div className="grid grid-cols-2 grid-flow-col gap-3  m-1">
          <div className="row-span-2 rounded-lg -2xl h-full  flex flex-col justify-center">
            <Box>
              <Text className="p-5 py-3 pb-0 text-2xl">
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
                      <Th key={region}>{region}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(values).map((channel, index) => (
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
                            {/* 
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option> */}
                          </Select>
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </div>
          <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
            <InfoImg />
          </div>
          <DataChart
            submitDistribution={submitDistribution}
            DistributionDataPreview={values}
          />
        </div>
      </div>
    </div>
  );
};

export default Distribution_Decision;
