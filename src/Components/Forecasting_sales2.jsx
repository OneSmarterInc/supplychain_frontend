import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Text, Box } from "@chakra-ui/react";

const Forecasting_sales2 = ({ setForecastMetawaretopass }) => {
  const forecastData = JSON.parse(localStorage.getItem("ForecastData"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  console.log("ForecastData:==", forecastData);

  const initialForecast = {
    channel1: forecastData?.metaware_channel_one || {
      region1: 0,
      region2: 0,
      region3: 0,
    },
    channel2: forecastData?.metaware_channel_two || {
      region1: 0,
      region2: 0,
      region3: 0,
    },
    // Add more channels and regions as needed
  };

  const [ForecastMetaware, setForecastMetaware] = useState(initialForecast);

  const handleChange = (channel, region, newValue) => {
    setForecastMetaware((prevForecastMetaware) => ({
      ...prevForecastMetaware,
      [channel]: {
        ...prevForecastMetaware[channel],
        [region]: newValue,
      },
    }));
  };

  useEffect(() => {
    setForecastMetawaretopass(ForecastMetaware);
  }, [ForecastMetaware, setForecastMetawaretopass]);

  return (
    <>
      <Text className="p-5 py-3 text-lg" textAlign="center">
        <strong>
          Sales Volume Forecast Product:{" "}
          {selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware}
        </strong>
      </Text>
      <Box overflowX="auto" p={4}>
        <Table
          variant="striped"
          colorScheme="white"
          borderWidth="1px"
          borderRadius="md"
          width="full"
        >
          <Thead fontWeight="bold">
            <Tr>
              <Th>{selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware}</Th>
              <Th>{selectedSim[0]?.renamedMappedData?.RegionMapp?.region1}</Th>
              <Th>{selectedSim[0]?.renamedMappedData?.RegionMapp?.region2}</Th>
              <Th>{selectedSim[0]?.renamedMappedData?.RegionMapp?.region3}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(ForecastMetaware).map((channel) => (
              <Tr key={channel}>
                <Td>
                  <strong>
                    {selectedSim[0]?.renamedMappedData?.ChannelMapp?.[channel] || channel}
                  </strong>
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={ForecastMetaware[channel]?.region1 || ""}
                    onChange={(e) => handleChange(channel, "region1", e.target.value)}
                    border="1px solid"
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={ForecastMetaware[channel]?.region2 || ""}
                    onChange={(e) => handleChange(channel, "region2", e.target.value)}
                    border="1px solid"
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={ForecastMetaware[channel]?.region3 || ""}
                    onChange={(e) => handleChange(channel, "region3", e.target.value)}
                    border="1px solid"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default Forecasting_sales2;
