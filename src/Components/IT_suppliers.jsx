import { Box, Select, Text } from '@chakra-ui/react';
import React from 'react';

const IT_suppliers = () => {
  const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  return (
    <Box>
      <Text>
        <strong>IT Synchronization with Suppliers?</strong>
      </Text>
      <br />
      <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4}>
        {options.map((option) => (
          <Box key={option}>
            <Text>{option}</Text>
            <Select placeholder="Select" fontSize={15} width="100%" border="1px solid black">
              <option value="supplier1">Supplier 1</option>
              <option value="supplier2">Supplier 2</option>
              <option value="supplier3">Supplier 3</option>
            </Select>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default IT_suppliers;
