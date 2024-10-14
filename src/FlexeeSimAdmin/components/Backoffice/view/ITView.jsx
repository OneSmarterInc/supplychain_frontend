import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ITView = ({ data, repo }) => {
  const options = [
    data.renamedMappedData?.suppliarMapp?.supplierA,
    data.renamedMappedData?.suppliarMapp?.supplierB,
    data.renamedMappedData?.suppliarMapp?.supplierC,
    data.renamedMappedData?.suppliarMapp?.supplierD,
    data.renamedMappedData?.suppliarMapp?.supplierE,
    data.renamedMappedData?.suppliarMapp?.supplierF,
    data.renamedMappedData?.suppliarMapp?.supplierG,
  ];

  const suppliers = {
    A: repo?.sync_a,
    B: repo?.sync_b,
    C: repo?.sync_c,
    D: repo?.sync_d,
    E: repo?.sync_e,
    F: repo?.sync_f,
    G: repo?.sync_g,
  };

  return (
    <Box>
      <Text className="p-5 py-1 text-xl">
        <strong>IT Synchronization with Suppliers</strong>
      </Text>
      <br />
      <div className="grid grid-cols-3 gap-3 pb-3">
        {options.map((option, index) => (
          <Box key={index} className="flex">
            <Text className="pl-6 py-2 text-lg">Supplier {option} -</Text>
            <Text className="ml-5 py-2 text-lg">
              {suppliers[String.fromCharCode(65 + index)] ? "Yes" : "No"}
            </Text>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default ITView;