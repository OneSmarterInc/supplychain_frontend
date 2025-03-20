import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Box } from "@chakra-ui/react";

const RawMaterial = ({ setAlpha_quantity, setBeta_quantity, procurementData1 ,data}) => {
  const procurementData = JSON.parse(localStorage.getItem("procurementData"));
  console.log("ProcurementDataRaw-", procurementData);

  const [newData, setNewData] = useState({
    alpha_quantity: "",
    beta_quantity: "",
  });

  // Update newData when procurementData changes, only once (on mount) or when procurementData is updated
  useEffect(() => {
    if (procurementData) {
      setNewData({
        alpha_quantity: procurementData?.alpha_quantity || "",
        beta_quantity: procurementData?.beta_quantity || "",
      });
    }
  }, [data]);

  // Keep the parent component informed of the changes in alpha and beta quantities
  useEffect(() => {
    setAlpha_quantity(newData.alpha_quantity);
    setBeta_quantity(newData.beta_quantity);
  }, [newData, setAlpha_quantity, setBeta_quantity]);

  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow the field to be empty or a valid non-negative number
    if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
      setNewData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  return (
    <Box className="overflow-x-auto p-4" style={{ fontFamily: "ABeeZee" }}>
      <Table id="procurement-table-raw-materials" className="min-w-full bg-white rounded-md shadow-md">
        <Thead className="bg-gray-100 text-gray-700 font-semibold">
          <Tr>
            <Th className="text-left" color={'red'}> Raw Materials</Th>
            <Th className="p-3" textAlign="center">Units</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr className="border-t">
            <Td className="p-1 font-medium text-gray-900 bg-gray-100 rounded-md">
              {selectedSim[0]?.renamedMappedData?.componentMapp?.alpha || "Alpha"}
            </Td>
            <Td className="p-3">
              <Input
                id="alpha-input"
                className={`bg-gray-50 border text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none w-full ${
                  !newData.alpha_quantity
                    ? "border-red-500 outline-red-500"
                    : "border-green-500 outline-green-500"
                }`}
                type="number"
                name="alpha_quantity"
                onChange={handleChange}
                placeholder="Enter Units"
                defaultValue={newData.alpha_quantity}
                required
              />
            </Td>
          </Tr>
          <Tr className="border-t">
            <Td className="p-3 font-medium text-gray-900 bg-gray-100 rounded-md">
              {selectedSim[0]?.renamedMappedData?.componentMapp?.beta || "Beta"}
            </Td>
            <Td className="p-3">
              <Input
                id="beta-input"
                className={`bg-gray-50 border text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none w-full ${
                  !newData.beta_quantity
                    ? "border-red-500 outline-red-500"
                    : "border-green-500 outline-green-500"
                }`}
                type="number"
                name="beta_quantity"
                onChange={handleChange}
                placeholder="Enter Units"
                defaultValue={newData.beta_quantity}
                required
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default RawMaterial;