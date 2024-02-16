import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Text } from "@chakra-ui/react";

const Forecasting_sales = ({ setForecastHyperwaretopass }) => {
  const [ForecastHyperware, setForecastHyperware] = useState({
    channel1: { region1: 74000, region2: 74000, region3: 74000 },
    channel2: { region1: 74000, region2: 74000, region3: 74000 },
    // Add more channels and regions as needed
  });

  const handleChange = (channel, region, newValue) => {
    setForecastHyperware((prevForecastHyperware) => ({
      ...prevForecastHyperware,
      [channel]: {
        ...prevForecastHyperware[channel],
        [region]: newValue,
      },
    }));
  };

  setForecastHyperwaretopass(ForecastHyperware);

  // console.log("forecast value", ForecastHyperware);

  return (
    <>
      <Text className="p-5 py-3 text-2xl">
        <strong>Sales Volume Forecast</strong>
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
            <Th fontWeight="bold">Hyperware</Th>
            <Th>Region 1</Th>
            <Th>Region 2</Th>
            <Th>Region 3</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(ForecastHyperware).map((channel) => (
            <Tr key={channel}>
              <Td>
                <strong>{channel}</strong>
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastHyperware[channel].region1}
                  onChange={(e) =>
                    handleChange(channel, "region1", e.target.value)
                  }
                  border="1px solid black"
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastHyperware[channel].region2}
                  onChange={(e) =>
                    handleChange(channel, "region2", e.target.value)
                  }
                  border="1px solid black"
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastHyperware[channel].region3}
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
