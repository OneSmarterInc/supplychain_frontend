import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Text } from "@chakra-ui/react";

const Forecasting_sales = ({ setForecastHyperwaretopass }) => {
  const forecastData = JSON.parse(localStorage.getItem("ForecastData"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  console.log("ForecastData:==", forecastData);

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
console.log("Renamed:-", selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.hyperware)
  return (
    <>
      <Text className="p-5 py-3 text-lg">
        <strong>Sales Volume Forecast Product : Hyperware</strong>
      </Text>
      <Table
        variant="striped"
        width={"650px"}
        colorScheme="#C9D5DD"
        borderWidth="0.5px"
        className="mx-3 bg-slate-200"
      >
        <Thead fontWeight="bold">
          <Tr>
            <Th fontWeight="bold">{selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.hyperware}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.HyperwareRegionMapp?.region1}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.HyperwareRegionMapp?.region2}</Th>
            <Th>{selectedSim[0]?.renamedMappedData?.HyperwareRegionMapp?.region3}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(ForecastHyperware).map((channel, index) => (
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
                  value={ForecastHyperware[channel]?.region1 || ""}
                  onChange={(e) =>
                    handleChange(channel, "region1", e.target.value)
                  }
                  border="1px solid black"
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastHyperware[channel]?.region2 || ""}
                  onChange={(e) =>
                    handleChange(channel, "region2", e.target.value)
                  }
                  border="1px solid black"
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastHyperware[channel]?.region3 || ""}
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
    </>
  );
};

export default Forecasting_sales;
