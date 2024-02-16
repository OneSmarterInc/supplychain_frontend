import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";

const Forecasting_sales2 = ({ setForecastMetawaretopass }) => {
  const [ForecastMetaware, setForecastMetaware] = useState({
    channel1: { region1: 74000, region2: 74000, region3: 74000 },
    channel2: { region1: 74000, region2: 74000, region3: 7000 },
    // Add more channels and regions as needed
  });

  const handleChange = (channel, region, newValue) => {
    setForecastMetaware((prevForecastMetaware) => ({
      ...prevForecastMetaware,
      [channel]: {
        ...prevForecastMetaware[channel],
        [region]: newValue,
      },
    }));
  };

  setForecastMetawaretopass(ForecastMetaware);

  // console.log("valuesch2", ForecastMetaware);
  return (
    <div>
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
                  value={ForecastMetaware[channel].region1}
                  onChange={(e) =>
                    handleChange(channel, "region1", e.target.value)
                  }
                  border="1px solid black"
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastMetaware[channel].region2}
                  onChange={(e) =>
                    handleChange(channel, "region2", e.target.value)
                  }
                  border="1px solid black"
                />
              </Td>
              <Td>
                <Input
                  type="number"
                  value={ForecastMetaware[channel].region3}
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
