import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box } from "@chakra-ui/react";

const ForecastingSales2 = ({ setForecastMetawaretopass }) => {
  const forecastData = JSON.parse(localStorage.getItem("ForecastData")) || {};
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim")) || [{}];

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
    <Box className="overflow-x-auto p-4">
      <Table className="min-w-full bg-white rounded-md shadow-md">
        <Thead className="bg-gray-100 text-gray-700 font-semibold">
          <Tr>
            <Th className="p-3 text-left" style={{ color: "#D10000" }}>
              {selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware || " Smart Thermostat"}
            </Th>
            <Th className="p-3 text-left">
              {selectedSim[0]?.renamedMappedData?.RegionMapp?.region1 || "Region 1"}
            </Th>
            <Th className="p-3 text-left">
              {selectedSim[0]?.renamedMappedData?.RegionMapp?.region2 || "Region 2"}
            </Th>
            <Th className="p-3 text-left">
              {selectedSim[0]?.renamedMappedData?.RegionMapp?.region3 || "Region 3"}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(ForecastMetaware).map((channel) => (
            <Tr key={channel} className="border-t">
              <Td className="p-3 font-medium text-gray-900">
                {selectedSim[0]?.renamedMappedData?.ChannelMapp?.[channel] || channel}
              </Td>
              <Td className="p-3">
                <Input
                  type="number"
                  value={ForecastMetaware[channel]?.region1 || ""}
                  onChange={(e) => handleChange(channel, "region1", e.target.value)}
                  className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
              </Td>
              <Td className="p-3">
                <Input
                  type="number"
                  value={ForecastMetaware[channel]?.region2 || ""}
                  onChange={(e) => handleChange(channel, "region2", e.target.value)}
                  className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
              </Td>
              <Td className="p-3">
                <Input
                  type="number"
                  value={ForecastMetaware[channel]?.region3 || ""}
                  onChange={(e) => handleChange(channel, "region3", e.target.value)}
                  className="border-gray-300 rounded-md focus:ring focus:ring-blue-200"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ForecastingSales2;