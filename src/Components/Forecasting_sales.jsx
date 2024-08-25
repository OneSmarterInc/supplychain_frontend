import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box } from "@chakra-ui/react";

const ForecastingSales = ({ setForecastHyperwaretopass }) => {
  const forecastData = JSON.parse(localStorage.getItem("ForecastData")) || {};
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim")) || [{}];

  const initialForecast = {
    channel1: forecastData?.hyperware_channel_one || {
      region1: "",
      region2: "",
      region3: "",
    },
    channel2: forecastData?.hyperware_channel_two || {
      region1: "",
      region2: "",
      region3: "",
    },
    // Add more channels and regions as needed
  };

  const [ForecastHyperware, setForecastHyperware] = useState(initialForecast);

  const handleChange = (channel, region, newValue) => {
    setForecastHyperware((prevForecastHyperware) => ({
      ...prevForecastHyperware,
      [channel]: {
        ...prevForecastHyperware[channel],
        [region]: newValue,
      },
    }));
  };

  useEffect(() => {
    setForecastHyperwaretopass(ForecastHyperware);
  }, [ForecastHyperware, setForecastHyperwaretopass]);

  return (
    <Box className="overflow-x-auto p-4">
      <Table className="min-w-full bg-white rounded-md shadow-md">
        <Thead className="bg-gray-100 text-gray-700 font-semibold">
          <Tr>
            <Th className="p-3 text-left text-green-500" style={{ color: "#D10000" }}>
              {selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.hyperware || "Smart Home Assistant"}
            </Th>
            <Th className="p-3 " textAlign="center">
              {selectedSim[0]?.renamedMappedData?.RegionMapp?.region1 || "Region 1"}
            </Th>
            <Th className="p-3" textAlign="center">
              {selectedSim[0]?.renamedMappedData?.RegionMapp?.region2 || "Region 2"}
            </Th>
            <Th className="p-3" textAlign="center">
              {selectedSim[0]?.renamedMappedData?.RegionMapp?.region3 || "Region 3"}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(ForecastHyperware).map((channel) => (
            <Tr key={channel} className="border-t">
              <Td className="p-3 font-medium text-gray-900">
                {selectedSim[0]?.renamedMappedData?.ChannelMapp?.[channel] || channel}
              </Td>
              <Td className="p-3">
                <Input
                  type="number"
                  value={ForecastHyperware[channel]?.region1 || ""}
                  onChange={(e) => handleChange(channel, "region1", e.target.value)}
                  className="border-gray-300 text-center rounded-md focus:ring focus:ring-blue-200"
                />
              </Td>
              <Td className="p-3">
                <Input
                  type="number"
                  value={ForecastHyperware[channel]?.region2 || ""}
                  onChange={(e) => handleChange(channel, "region2", e.target.value)}
                  className="border-gray-300 text-center rounded-md focus:ring focus:ring-blue-200"
                />
              </Td>
              <Td className="p-3">
                <Input
                  type="number"
                  value={ForecastHyperware[channel]?.region3 || ""}
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

export default ForecastingSales;