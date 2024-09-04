import { Box, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const ServiceView = ({ data, repo }) => {
  const [serviceValue, setServiceValue] = useState({
    service_region_one: "",
    service_region_two: "",
    service_region_three: "",
  });

  // Correct mapping based on the structure of the repo object
  const regions = [
    { key: "service_region_one", label: data?.renamedMappedData?.RegionMapp?.region1 },
    { key: "service_region_two", label: data?.renamedMappedData?.RegionMapp?.region2 },
    { key: "service_region_three", label: data?.renamedMappedData?.RegionMapp?.region3 },
  ];

  // Update serviceValue when repo changes
  useEffect(() => {
    if (repo) {
      setServiceValue(repo);
    }
  }, [repo]);

  return (
    <Box>
      <Table className="min-w-full bg-white rounded-md shadow-sm">
        <Thead className="bg-gray-100">
          <Tr>
            <Th>Service Outsourcing</Th>
            {regions.map((region) => (
              <Th key={region.key}>{region.label}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td className="p-3 font-medium text-gray-900">Service Outsourcing</Td>
            {regions.map((region) => (
              <Td key={region.key}>
                <Text>{serviceValue[region.key]}</Text>
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default ServiceView;