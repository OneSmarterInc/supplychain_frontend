import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Text } from "@chakra-ui/react";

const Forecasting_sales2 = ({ setForecastMetawaretopass }) => {
  const forecastData = JSON.parse(localStorage.getItem("ForecastData"));
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
        <strong>Sales Volume Forecast Product : Metaware</strong>
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
            <Th>Metaware</Th>
            <Th>Region 1</Th>
            <Th>Region 2</Th>
            <Th>Region 3</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(ForecastMetaware).map((channel) => (
            <Tr key={channel}>
              <Td>
                <strong>{channel}</strong>
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
