import React, { useEffect, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

export const ForecastingSalesView = ({ data, repo }) => {
  const [forecastHyperware, setForecastHyperware] = useState({
    channel1: {
      region1: "",
      region2: "",
      region3: ""
    },
    channel2: {
      region1: "",
      region2: "",
      region3: ""
    }
  });

  useEffect(() => {
    if (repo) {
      setForecastHyperware({
        channel1: repo?.hyperware_channel_one || {
          region1: "",
          region2: "",
          region3: "",
        },
        channel2: repo?.hyperware_channel_two || {
          region1: "",
          region2: "",
          region3: "",
        },
      });
    }
  }, [repo]); // Dependencies array ensures the effect runs when `repo` changes.

  return (
    <Box className="overflow-x-auto p-4">
      <Table className="min-w-full bg-white rounded-md shadow-md">
        <Thead className="bg-gray-100 text-gray-700 font-semibold">
          <Tr>
            <Th className="p-3 text-left" style={{ color: "#D10000" }}>
              {data?.renamedMappedData?.dataVariabllesMapp?.hyperware || "Smart Home Assistant"}
            </Th>
            <Th className="p-3 text-left" >
              {data?.renamedMappedData?.RegionMapp?.region1 || "Region 1"}
            </Th>
            <Th className="p-3 text-left" >
              {data?.renamedMappedData?.RegionMapp?.region2 || "Region 2"}
            </Th>
            <Th className="p-3 text-left" >
              {data?.renamedMappedData?.RegionMapp?.region3 || "Region 3"}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(forecastHyperware).map((channel) => (
            <Tr key={channel} className="border-t">
              <Td className="p-3 font-medium text-gray-900">
                {data?.renamedMappedData?.ChannelMapp?.[channel] || channel}
              </Td>
              <Td className="p-3 text-center">{forecastHyperware[channel]?.region1 || ""}</Td>
              <Td className="p-3 text-center">{forecastHyperware[channel]?.region2 || ""}</Td>
              <Td className="p-3 text-center">{forecastHyperware[channel]?.region3 || ""}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export const ForecastingSales2View = ({ data, repo }) => {
  const [forecastMetaware, setForecastMetaware] = useState({
    channel1: {
      region1: 0,
      region2: 0,
      region3: 0
    },
    channel2: {
      region1: 0,
      region2: 0,
      region3: 0
    }
  });

  useEffect(() => {
    if (repo) {
      setForecastMetaware({
        channel1: repo?.metaware_channel_one || {
          region1: 0,
          region2: 0,
          region3: 0,
        },
        channel2: repo?.metaware_channel_two || {
          region1: 0,
          region2: 0,
          region3: 0,
        },
      });
    }
  }, [repo]); // Re-run effect when `repo` changes.

  return (
    <Box className="overflow-x-auto p-4 rounded-lg">
      <Table className="min-w-full bg-white rounded-md shadow-md ">
        <Thead className="bg-gray-100 text-gray-700 font-semibold">
          <Tr>
            <Th className="p-3 text-left" style={{ color: "#D10000" }}>
              {data?.renamedMappedData?.dataVariabllesMapp?.metaware || "Smart Thermostat"}
            </Th>
            <Th className="p-3 text-left">
              {data?.renamedMappedData?.RegionMapp?.region1 || "Region 1"}
            </Th>
            <Th className="p-3 text-left">
              {data?.renamedMappedData?.RegionMapp?.region2 || "Region 2"}
            </Th>
            <Th className="p-3 text-left">
              {data?.renamedMappedData?.RegionMapp?.region3 || "Region 3"}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(forecastMetaware).map((channel) => (
            <Tr key={channel} className="border-t">
              <Td className="p-3 font-medium text-gray-900">
                {data?.renamedMappedData?.ChannelMapp?.[channel] || channel}
              </Td>
              <Td className="p-3 text-center">{forecastMetaware[channel]?.region1 || ""}</Td>
              <Td className="p-3 text-center">{forecastMetaware[channel]?.region2 || ""}</Td>
              <Td className="p-3 text-center">{forecastMetaware[channel]?.region3 || ""}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};