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

const Demand_hype_ch2 = ({ setHypeCh2ValuetoParent }) => {
  const demandData = JSON.parse(localStorage.getItem("demandData"));
  const regions = ["region1", "region2", "region3"];

  const [hypeCh2Value, setHypeCh2Value] = useState({
    Active: { ...demandData?.hyperware_channel_two_active },
    Price: { ...demandData?.hyperware_channel_two_price },
    MarketSpending: { ...demandData?.hyperware_channel_two_market },
  });

  const handleInputChange = (channel, region, value) => {
    setHypeCh2Value((prevState) => ({
      ...prevState,
      [channel]: {
        ...prevState[channel],
        [region]: channel === "Active" ? value : parseInt(value),
      },
    }));
  };

  useEffect(() => {
    setHypeCh2ValuetoParent(hypeCh2Value);
  }, [hypeCh2Value, setHypeCh2ValuetoParent]);

  return (
    <Box>
      <Text className="p-5 py-3 pb-0 text-xl">
        <strong>Hypeware Channel 2</strong>
      </Text>
      <br />
      <Table variant="simple" className="bg-slate-300 mx-3" width={"650px"}>
        <Thead>
          <Tr>
            <Th> </Th>
            {regions.map((region) => (
              <Th key={region}>{region}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(hypeCh2Value).map((channel) => (
            <Tr key={channel}>
              <Td>{channel}</Td>
              {regions.map((region) => (
                <Td key={region}>
                  {channel === "Active" ? (
                    <Select
                      placeholder="Select"
                      fontSize={15}
                      width="100%"
                      border="1px solid black"
                      value={hypeCh2Value[channel][region]}
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
                      value={hypeCh2Value[channel][region] || ""}
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

export default Demand_hype_ch2;
