import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box } from "@chakra-ui/react";

const ForecastingSales2 = ({ setForecastMetawaretopass, forecastData }) => {
  // const forecastData = JSON.parse(localStorage.getItem("ForecastData")) || {};
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim")) || [{}];

  // Initialize ForecastMetaware state with forecastData whenever forecastData changes
  const [ForecastMetaware, setForecastMetaware] = useState({
    channel1: forecastData?.metaware_channel_one || { region1: 0, region2: 0, region3: 0 },
    channel2: forecastData?.metaware_channel_two || { region1: 0, region2: 0, region3: 0 },
  });

  // Sync ForecastMetaware with forecastData whenever forecastData changes
  useEffect(() => {
    setForecastMetaware({
      channel1: forecastData?.metaware_channel_one || { region1: 0, region2: 0, region3: 0 },
      channel2: forecastData?.metaware_channel_two || { region1: 0, region2: 0, region3: 0 },
    });
  }, [forecastData]);

  useEffect(() => {
    setForecastMetawaretopass(ForecastMetaware);
  }, [ForecastMetaware, setForecastMetawaretopass]);

  const handleChange = (channel, region, newValue) => {
    setForecastMetaware((prevForecastMetaware) => ({
      ...prevForecastMetaware,
      [channel]: {
        ...prevForecastMetaware[channel],
        [region]: newValue,
      },
    }));
  };

  return (
    <Box className="overflow-x-auto p-4">
      <Table className="min-w-full bg-white rounded-md shadow-md">
        <Thead className="bg-gray-100 text-gray-700 font-semibold">
          <Tr>
            <Th className="p-3 text-left " style={{ color: "#D10000" }}>
              {selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware || " Smart Thermostat"} &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; 
            </Th>
            <Th className="p-3 text-center" textAlign="center">
              {selectedSim[0]?.renamedMappedData?.RegionMapp?.region1 || "Region 1"}
            </Th>
            <Th className="p-3 text-center" textAlign="center">
              {selectedSim[0]?.renamedMappedData?.RegionMapp?.region2 || "Region 2"}
            </Th>
            <Th className="p-3 text-center" textAlign="center">
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
                  className="border-gray-300 text-center rounded-md focus:ring focus:ring-blue-200"
                />
              </Td>
              <Td className="p-3">
                <Input
                  type="number"
                  value={ForecastMetaware[channel]?.region2 || ""}
                  onChange={(e) => handleChange(channel, "region2", e.target.value)}
                  className="border-gray-300 text-center rounded-md focus:ring focus:ring-blue-200"
                />
              </Td>
              <Td className="p-3">
                <Input
                  type="number"
                  value={ForecastMetaware[channel]?.region3 || ""}
                  onChange={(e) => handleChange(channel, "region3", e.target.value)}
                  className="border-gray-300 text-center rounded-md focus:ring focus:ring-blue-200"
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