import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Text } from "@chakra-ui/react";

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
    <div>
      <Text className="p-5 py-3 text-lg">
        <strong>Sales Volume Forecast Product :{selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware}</strong>
      </Text>

      <Table
        variant="striped"
        width={"650px"}
        colorScheme="#C9D5DD"
        borderWidth="1px"
        className="mx-3 bg-slate-200"
      >
        <Thead>
          <Tr>
            <Th fontWeight="bold">
              {selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware}
            </Th>
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
                  {selectedSim[0]?.renamedMappedData?.MetawareChannelMapp
                    ?.channel
                    ? selectedSim[0]?.renamedMappedData?.MetawareChannelMapp
                        ?.channel
                    : channel}
                </strong>
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastMetaware[channel]?.region1 || ""}
                  onChange={(e) =>
                    handleChange(channel, "region1", e.target.value)
                  }
                  border="1px solid black"
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastMetaware[channel]?.region2 || ""}
                  onChange={(e) =>
                    handleChange(channel, "region2", e.target.value)
                  }
                  border="1px solid black"
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastMetaware[channel]?.region3 || ""}
                  onChange={(e) =>
                    handleChange(channel, "region3", e.target.value)
                  }
                  border="1px solid black"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Forecasting_sales2;
