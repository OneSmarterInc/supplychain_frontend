import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box, Button, Text } from "@chakra-ui/react";

const TransportView = ({ repo }) => {
  const [dc2Data, setDc2Data] = useState({});
  const [dc3Data, setDc3Data] = useState({});
  const [activeDC, setActiveDC] = useState("DC2");
  const [flagDc2, setFlagDc2] = useState(false);
  const [flagDc3, setFlagDc3] = useState(false);

  // Fetch transportation data from the repo
  useEffect(() => {
    if (repo) {
      setDc2Data(repo?.dc_two || {});
      setDc3Data(repo?.dc_three || {});
      setFlagDc2(repo?.flag_dc2 || false);
      setFlagDc3(repo?.flag_dc3 || false);
    }
  }, [repo]);

  const handleDCButtonClick = (dc) => {
    setActiveDC(dc);
  };

  const renderTable = (data, title) => {
    const productMapping = {
      product0: "Product 0",
      product1: "Product 1 (Hyperware)",
      product2: "Product 2 (Metaware)",
    };

    if (Object.keys(data).length === 0) {
      return (
        <Box className="p-4 bg-yellow-100 text-yellow-600 rounded-md mt-4">
          No data available for {title}.
        </Box>
      );
    }

    return (
      <Box className="overflow-x-auto rounded-l rounded-r">
        <Text className="p-2 font-semibold text-lg bg-gray-300 text-black-500 flex items-center justify-center">
          <span className="flex-grow text-left pl-4">{title}</span>
        </Text>
        <Table className="min-w-full bg-white rounded-md shadow-md">
          <Thead className="bg-gray-100 text-gray-700">
            <Tr>
              <Th className="py-2 px-4">Products</Th>
              {Object.keys(data.product0?.surface || {}).map((carrier) => (
                <Th key={carrier} className="py-2 px-4" textAlign="center">
                  Carrier <span className="text-red-500">{carrier}</span>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(data).map(([product, shipmentTypes]) =>
              Object.entries(shipmentTypes).map(([shipmentType, carriers]) => (
                <Tr key={`${product}-${shipmentType}`}>
                  <Td className="py-0 px-0">
                    {productMapping[product]}
                    <br />
                    <span className="text-red-500">
                      {shipmentType.charAt(0).toUpperCase() + shipmentType.slice(1)}
                    </span>
                  </Td>
                  {Object.keys(carriers).map((carrier) => (
                    <Td key={carrier} className="py-0 px-0">
                      {carriers[carrier] || "N/A"}
                    </Td>
                  ))}
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    );
  };

  return (
    <Box className="overflow-x-auto p-4">
      {/* DC Buttons */}
      
      <Box className="h-16 flex justify-end items-center px-4 mt-4">
        <Box className="flex space-x-4">
          <Button
            onClick={() => handleDCButtonClick("DC2")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC2" && "bg-green-700"
            }`}
          >
            DC 2
          </Button>
          <Button
            onClick={() => handleDCButtonClick("DC3")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC3" && "bg-green-700"
            }`}
          >
            DC 3
          </Button>
        </Box>
      </Box>

      {/* Transportation Tables or Messages */}
      {activeDC === "DC2" && flagDc2 ? (
        renderTable(dc2Data, "DC 2")
      ) : (
        <Box className="p-4 bg-red-100 text-red-500 rounded-md mt-4">
          No transportation data available for DC 2.
        </Box>
      )}

      {activeDC === "DC3" && flagDc3 ? (
        renderTable(dc3Data, "DC 3")
      ) : (
        <Box className="p-4 bg-red-100 text-red-500 rounded-md mt-4">
          No transportation data available for DC 3.
        </Box>
      )}
    </Box>
  );
};

export default TransportView;