import React from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Select, Input, Text } from '@chakra-ui/react';

const Demand_meta_ch1 = () => {
  const regions = ['Region 1', 'Region 2', 'Region 3'];

  return (
      <Box>
        <Text>
          <strong>Metaware Channel 1</strong>
        </Text>
        <br />
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th> </Th>
              {regions.map((region) => (
                <Th key={region}>{region}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Active</Td>
              {regions.map((region) => (
                <Td key={region}>
                  <Select placeholder="Select" fontSize={15} width="100%" border="1px solid black">
                    <option value="1">1</option>
                    {/* Add more options as needed */}
                  </Select>
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td>Price</Td>
              {regions.map((region) => (
                <Td key={region}>
                  <Input
                    type="number"
                    placeholder="Enter Price"
                    defaultValue="74000"
                    fontSize={15}
                    width="100%"
                    border="1px solid black"
                  />
                </Td>
              ))}
            </Tr>
            <Tr>
              <Td>Market spending</Td>
              {regions.map((region) => (
                <Td key={region}>
                  <Input
                    type="number"
                    placeholder="Enter Spending"
                    defaultValue="74000"
                    fontSize={15}
                    width="100%"
                    border="1px solid black"
                  />
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>
  );
};

export default Demand_meta_ch1;
