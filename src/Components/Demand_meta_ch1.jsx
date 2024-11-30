import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
 
} from "@chakra-ui/react";

const Demand_meta_ch1 = ({ setMetaCh1ValuetoParent }) => {
  const demandData = JSON.parse(localStorage.getItem("demandData"));
  const regions = ["region1", "region2", "region3"];

  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const [metaCh1Value, setMetaCh1Value] = useState({
    Active: { ...demandData?.metaware_channel_one_active },
    Price: { ...demandData?.metaware_channel_one_price },
    MarketSpending: { ...demandData?.metaware_channel_one_market },
  });

  const handleInputChange = (channel, region, value) => {
    setMetaCh1Value((prevState) => ({
      ...prevState,
      [channel]: {
        ...prevState[channel],
        [region]: channel === "Active" ? value : parseInt(value, 10),
      },
    }));
  };

  useEffect(() => {
    setMetaCh1ValuetoParent(metaCh1Value);
  }, [metaCh1Value, setMetaCh1ValuetoParent]);

  return (
    <Box>
     <Table id="demand-Smart-Thermostat-Retail" variant="simple" bg="white" mt="4" className="shadow-md rounded-md">
     <Thead className="bg-gray-100 text-gray-700 font-semibold">
          <Tr>
            <Th fontWeight="bold" style={{ color: "#D10000" }}>
            {selectedSim[0]?.renamedMappedData?.ChannelMapp?.channel1}
            </Th>
            <Th>{selectedSim[0]?.renamedMappedData?.RegionMapp?.region1}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.RegionMapp?.region2}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.RegionMapp?.region3}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(metaCh1Value).map((channel) => (
            <Tr key={channel}>
              <Td fontWeight="medium">{channel}</Td>
              {regions.map((region) => (
                <Td key={region}>
                  {channel === "Active" ? (
                    <Select
                      placeholder="Select"
                      fontSize="sm"
                      value={metaCh1Value[channel][region]}
                      onChange={(e) =>
                        handleInputChange(channel, region, e.target.value)
                      }
                      borderColor="gray.300"
                      rounded="md"
                      focusBorderColor="blue.500"
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Select>
                  ) : (
                    <Input
                      type="number"
                      placeholder={`Enter ${channel} in $`}
                      value={metaCh1Value[channel][region] || ""}
                      fontSize="sm"
                      onChange={(e) =>
                        handleInputChange(channel, region, e.target.value)
                      }
                      borderColor="gray.300"
                      rounded="md"
                      focusBorderColor="blue.500"
                    />
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Demand_meta_ch1;