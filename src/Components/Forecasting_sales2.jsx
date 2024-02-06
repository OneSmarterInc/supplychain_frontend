import React, { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react';

const Forecasting_sales2 = () => {
  const [values, setValues] = useState({
    channel1: { region1: 74000, region2: 74000, region3: 74000 },
    channel2: { region1: 74000, region2: 74000, region3: 74000 },
    // Add more channels and regions as needed
  });

  const handleChange = (channel, region, newValue) => {
    setValues((prevValues) => ({
      ...prevValues,
      [channel]: {
        ...prevValues[channel],
        [region]: newValue,
      },
    }));
  };

  return (
    <Table variant="striped" colorScheme="#C9D5DD" borderWidth="1px">
      <Thead>
        <Tr>
          <Th>Metaware</Th>
          <Th>Region 1</Th>
          <Th>Region 2</Th>
          <Th>Region 3</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.keys(values).map((channel) => (
          <Tr key={channel}>
            <Td><strong>{channel}</strong></Td>
            <Td>
              <Input
                type="number"
                value={values[channel].region1}
                onChange={(e) => handleChange(channel, 'region1', e.target.value)}
                border='1px solid black'
              />
            </Td>
            <Td>
              <Input
                type="number"
                value={values[channel].region2}
                onChange={(e) => handleChange(channel, 'region2', e.target.value)}
                border='1px solid black'
              />
            </Td>
            <Td>
              <Input
                type="number"
                value={values[channel].region3}
                onChange={(e) => handleChange(channel, 'region3', e.target.value)}
                border='1px solid black'
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Forecasting_sales2;
