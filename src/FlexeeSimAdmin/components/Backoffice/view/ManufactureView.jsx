import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";

const ManufactureView = ({ data, repo }) => {
  const [manufacturingData, setManufacturingData] = useState({});
  const [activeQuarter, setActiveQuarter] = useState(1);

  // Set manufacturing data from the repo object
  useEffect(() => {
    if (repo) {
      setManufacturingData(repo);
    }
  }, [repo]);

  const handleQuarterChange = (quarter) => {
    setActiveQuarter(quarter);
  };

  return (
    <Box className="overflow-x-auto p-4">
      {/* Manufacturing Data Table */}
      <Box className="overflow-x-auto p-4" style={{ fontFamily: "ABeeZee" }}>
        <Table className="min-w-full bg-white rounded-md shadow-md">
          <Thead className="bg-gray-100 text-gray-700 font-semibold">
            <Tr>
              <Th className="text-left" color={"red"}>
                Production
              </Th>
              <Th className="p-3" textAlign="center">
                Product Zero
              </Th>
              <Th className="p-3" textAlign="center">
              {data?.renamedMappedData?.dataVariabllesMapp?.hyperware || "Smart Home Assistant"}
              </Th>
              <Th className="p-3" textAlign="center">
              {data?.renamedMappedData?.dataVariabllesMapp?.metaware || "Smart Home Assistant"}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr className="border-t">
              <Td className="p-1 font-medium text-gray-900 bg-gray-100 rounded-md">
                Production
              </Td>
              <Td className="p-3">{manufacturingData?.production_zero || "0"}</Td>
              <Td className="p-3">{manufacturingData?.production_hyperware || "0"}</Td>
              <Td className="p-3">{manufacturingData?.production_metaware || "0"}</Td>
            </Tr>
            <Tr className="border-t">
              <Td className="p-3 font-medium text-gray-900 bg-gray-100 rounded-md">
                Emergency Limit
              </Td>
              <Td className="p-3">{manufacturingData?.emergency_limit_zero || "0"}</Td>
              <Td className="p-3">{manufacturingData?.emergency_limit_hyperware || "0"}</Td>
              <Td className="p-3">{manufacturingData?.emergency_limit_metaware || "0"}</Td>
            </Tr>
            <Tr className="border-t">
              <Td className="p-3 font-medium text-gray-900 bg-gray-100 rounded-md">
                Volume Flexibility
              </Td>
              <Td className="p-3">{manufacturingData?.volume_flexibility_zero || "0"}</Td>
              <Td className="p-3">{manufacturingData?.volume_flexibility_hyperware || "0"}</Td>
              <Td className="p-3">{manufacturingData?.volume_flexibility_metaware || "0"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default ManufactureView;