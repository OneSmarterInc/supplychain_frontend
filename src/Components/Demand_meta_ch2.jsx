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

const Demand_meta_ch2 = ({ setMetaCh2ValuetoParent }) => {
  const demandData = JSON.parse(localStorage.getItem("demandData"));
  const regions = ["region1", "region2", "region3"];

  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const [metaCh2Value, setMetaCh2Value] = useState({
    Active: { ...demandData?.metaware_channel_two_active },
    Price: { ...demandData?.metaware_channel_two_price },
    MarketSpending: { ...demandData?.metaware_channel_two_market },
  });

  const handleInputChange = (channel, region, value) => {
    setMetaCh2Value((prevState) => ({
      ...prevState,
      [channel]: {
        ...prevState[channel],
        [region]: channel === "Active" ? value : parseInt(value, 10),
      },
    }));
  };

  useEffect(() => {
    setMetaCh2ValuetoParent(metaCh2Value);
  }, [metaCh2Value, setMetaCh2ValuetoParent]);

  return (
    <Box>
      <Table variant="simple" bg="white" mt="4" className="shadow-md rounded-md">
      <Thead className="bg-gray-100 text-gray-700 font-semibold">
          <Tr>
            <Th fontWeight="bold" style={{ color: "#D10000" }}>
            {selectedSim[0]?.renamedMappedData?.ChannelMapp?.channel2}
            </Th>
            <Th>{selectedSim[0]?.renamedMappedData?.RegionMapp?.region1}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.RegionMapp?.region2}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.RegionMapp?.region3}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(metaCh2Value).map((channel) => (
            <Tr key={channel}>
              <Td fontWeight="medium">{channel}</Td>
              {regions.map((region) => (
                <Td key={region}>
                  {channel === "Active" ? (
                    <Select
                      placeholder="Select"
                      fontSize="sm"
                      value={metaCh2Value[channel][region]}
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
                      value={metaCh2Value[channel][region] || ""}
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

export default Demand_meta_ch2;