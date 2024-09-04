import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button } from "@chakra-ui/react";

const ProcurementView = ({ data, repo }) => {
  const [procurementData, setProcurementData] = useState({});
  const [dcData, setDcData] = useState({});
  const [activeDC, setActiveDC] = useState("DC1");

  // Set the procurement data from the repo object
  useEffect(() => {
    if (repo) {
      setProcurementData(repo);
      setDcData(repo.sac_units || {});
    }
  }, [repo]);

  const handleDCButtonClick = (dc) => {
    setActiveDC(dc);
  };

  return (
    <Box className="overflow-x-auto p-4">
      {/* Raw Materials Table */}
      <Box className="overflow-x-auto p-4" style={{ fontFamily: "ABeeZee" }}>
        <Table className="min-w-full bg-white rounded-md shadow-md">
          <Thead className="bg-gray-100 text-gray-700 font-semibold">
            <Tr>
              <Th className="text-left" color={"red"}>
                Raw Materials
              </Th>
              <Th className="p-3" textAlign="center">
                Units
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr className="border-t">
              <Td className="p-1 font-medium text-gray-900 bg-gray-100 rounded-md">
                {data?.renamedMappedData?.componentMapp?.alpha || "Alpha"}
              </Td>
              <Td className="p-3">{repo?.alpha_quantity || "N/A"}</Td>
            </Tr>
            <Tr className="border-t">
              <Td className="p-3 font-medium text-gray-900 bg-gray-100 rounded-md">
                {data?.renamedMappedData?.componentMapp?.beta || "Beta"}
              </Td>
              <Td className="p-3">{repo?.beta_quantity || "N/A"}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      {/* Supply Chain Table */}
      <Box className="h-30 overflow-y-auto ml-4 border-2 border-opacity-50 border-gray-300 rounded-lg">
        {activeDC === "DC1" && dcData?.DC1 !== "closed" && (
          <Table className="min-w-full bg-white rounded-md shadow-md">
            <Thead className="bg-gray-100 text-gray-700 font-semibold">
              <Tr>
                <Th className="p-3" color={"red"}>
                  SAC
                </Th>
                <Th className="p-3" textAlign="center">
                  Supplier
                </Th>
                <Th className="p-3" textAlign="center">
                  Medium
                </Th>
                <Th className="p-3" textAlign="center">
                  Units
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {dcData[activeDC]?.map((entry, index) => (
                <Tr key={index} className="border-t">
                  <Td className="p-3" textAlign="left">
                    {data?.renamedMappedData?.componentMapp?.[entry.name] || "N/A"}
                  </Td>
                  <Td className="p-3">{entry.supplier || "N/A"}</Td>
                  <Td className="p-3">{entry.medium || "N/A"}</Td>
                  <Td className="p-3">{entry.units || "N/A"}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {/* DC Buttons */}
      <Box className="h-16 flex justify-end items-end px-4 mt-4">
        <Box className="flex space-x-4">
          <Button
            onClick={() => handleDCButtonClick("DC1")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC1" && "bg-green-700"
            }`}
            disabled={dcData?.DC1 === "closed"}
          >
            DC 1
          </Button>
          <Button
            onClick={() => handleDCButtonClick("DC2")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC2" && "bg-green-700"
            }`}
            disabled={dcData?.DC2 === "closed"}
          >
            DC 2
          </Button>
          <Button
            onClick={() => handleDCButtonClick("DC3")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC3" && "bg-green-700"
            }`}
            disabled={dcData?.DC3 === "closed"}
          >
            DC 3
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProcurementView;