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
  Text,
} from "@chakra-ui/react";

const Demand_meta_ch2 = ({ setMetaCh2ValuetoParent }) => {
  const demandData = JSON.parse(localStorage.getItem("demandData"));
  console.log("DEMANDDATA-FROM-METACH2:--", demandData);
  const regions = ["region1", "region2", "region3"];

  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  // Correctly initialize metaCh2Value with nested objects
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

  console.log("Meta ch2:", metaCh2Value);

  return (
    <Box>
      <Text className="p-5 py-3 pb-0 text-xl">
      <strong>{selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware}- {selectedSim[0]?.renamedMappedData?.MetawareChannelMapp?.channel2}  </strong>
      </Text>
      <br />
      <Table variant="simple" className="bg-slate-300 mx-3" width={"650px"}>
        <Thead>
        <Tr>
          <Th fontWeight="bold">{selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.MetawareRegionMapp?.region1}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.MetawareRegionMapp?.region2}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.MetawareRegionMapp?.region3}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(metaCh2Value).map((channel) => (
            <Tr key={channel}>
              <Td>{channel}</Td>
              {regions?.map((region) => (
                <Td key={region}>
                  {channel === "Active" ? (
                    <Select
                      placeholder="Select"
                      fontSize={15}
                      width="100%"
                      border="1px solid black"
                      value={metaCh2Value[channel][region]}
                      onChange={(e) =>
                        handleInputChange(channel, region, e.target.value)
                      }
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Select>
                  ) : (
                    <Input
                      type="number"
                      placeholder={`Enter ${channel}`}
                      value={metaCh2Value[channel][region] || ""}
                      fontSize={15}
                      width="100%"
                      border="1px solid black"
                      onChange={(e) =>
                        handleInputChange(channel, region, e.target.value)
                      }
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
