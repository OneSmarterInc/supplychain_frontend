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

const Demand_hype_ch1 = ({ setHypeCh1ValuetoParent }) => {
  const regions = ["region1", "region2", "region3"];
  const [hypeCh1Value, setHypeCh1Value] = useState({
    Active: { region1: "false", region2: "false", region3: "false" },
    Price: { region1: 74000, region2: null, region3: 74000 },
    MarketSpending: { region1: 74000, region2: 74000, region3: 74000 },
    // Add more channels and regions as needed
  });

  const handleInputChange = (channel, region, value) => {
    setHypeCh1Value((prevState) => ({
      ...prevState,
      [channel]: {
        ...prevState[channel],
        [region]: channel === "Active" ? value : parseInt(value),
      },
    }));
  };

  useEffect(() => {
    setHypeCh1ValuetoParent(hypeCh1Value);
  }, [hypeCh1Value, setHypeCh1ValuetoParent]);

  return (
    <Box>
      <Text className="p-5 py-3 pb-0 text-xl">
        <strong>Hypeware Channel 1</strong>
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
          {Object.keys(hypeCh1Value).map((channel) => (
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
                      value={hypeCh1Value[channel][region]}
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
                      value={hypeCh1Value[channel][region] || ""}
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

export default Demand_hype_ch1;
