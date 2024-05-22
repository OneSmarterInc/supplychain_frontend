import React, { useState } from "react";
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

const Demand_meta_ch1 = ({ setMetaCh1ValuetoParent }) => {
  const regions = ["region1", "region2", "region3"];
  const [metaCh1Value, setMetaCh1Value] = useState({
    Active: { region1: 74000, region2: 74000, region3: null },
    Price: { region1: 74000, region2: null, region3: 74000 },
    MarketSpending: { region1: 74000, region2: 74000, region3: 74000 },
    // Add more channels and regions as needed
  });

  // console.log("meta ch1 ", metaCh1Value);

  const handleInputChange = (channel, region, value) => {
    setMetaCh1Value((prevState) => ({
      ...prevState,
      [channel]: {
        ...prevState[channel],
        [region]: value,
      },
    }));
  };

  setMetaCh1ValuetoParent(metaCh1Value);

  return (
    <Box>
      <Text className="p-5 py-3 pb-0 text-xl">
        <strong>Metaware Channel 1</strong>
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
          {Object.keys(metaCh1Value).map((channel) => (
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
                      value={metaCh1Value[channel][region]}
                      onChange={(e) =>
                        handleInputChange(
                          channel,
                          region,
                          parseInt(e.target.value)
                        )
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      {/* Add more options as needed */}
                    </Select>
                  ) : (
                    <Input
                      type="number"
                      placeholder={`Enter ${channel}`}
                      value={metaCh1Value[channel][region] || ""}
                      fontSize={15}
                      width="100%"
                      border="1px solid black"
                      onChange={(e) =>
                        handleInputChange(
                          channel,
                          region,
                          parseInt(e.target.value)
                        )
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

export default Demand_meta_ch1;
