import { Box, Select, Text } from "@chakra-ui/react";
import React from "react";

const IT_suppliers = () => {
  const options = ["A", "B", "C", "D", "E", "F", "G"];

  return (
    <Box>
      <Text className="p-5 py-1 text-xl">
        <strong>IT Synchronization with Suppliers?</strong>
      </Text>
      <br />
      <div className="grid grid-cols-3 gap-3 pb-3">
        {options.map((option) => (
          <Box key={option} className="flex ">
            <Text className="pl-6 py-2 text-lg">{option}</Text>
            <Select
              placeholder="Select"
              fontSize={15}
              width="73%"
              border="1px solid black"
              className="ml-5"
            >
              <option value="supplier1">Supplier 1</option>
              <option value="supplier2">Supplier 2</option>
              <option value="supplier3">Supplier 3</option>
            </Select>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default IT_suppliers;
