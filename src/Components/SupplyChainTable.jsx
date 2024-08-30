import React, { useRef, useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Input, Select, Box, Button } from "@chakra-ui/react";

const SupplyChainTable = ({ setUpdatedDCData }) => {
  const tableRef = useRef(null);
  const [activeDC, setActiveDC] = useState("DC1");
  const [procurementData, setProcurementData] = useState({});
  const [selectedSim, setSelectedSim] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("procurementData"));
    setProcurementData(data || {});
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedSim"));
    setSelectedSim(data || []);
  }, []);

  const supplierOptions = [
    "Select",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.A || "Supplier A",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.B || "Supplier B",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.C || "Supplier C",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.D || "Supplier D",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.E || "Supplier E",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.F || "Supplier F",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.G || "Supplier G",
  ];

  const mediumOptions = ["Select", "Air", "Surface"];

  const [dcData, setDcData] = useState({});

  useEffect(() => {
    if (procurementData?.sac_units) {
      setDcData(procurementData?.sac_units);
    }
  }, [procurementData?.sac_units]);

  const handleDCButtonClick = (dc) => {
    setActiveDC(dc);
  };

  const handleInputChange = (dc, index, key, value) => {
    const updatedData = { ...dcData };
    updatedData[dc][index][key] = value;
    setDcData(updatedData);
  };

  const onAddEntry = (dc) => {
    const newEntry = {
      name: "",
      supplier: "",
      medium: "",
      units: "",
    };
    setDcData((prevData) => ({
      ...prevData,
      [dc]: [...prevData[dc], newEntry],
    }));
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  };

  setUpdatedDCData(dcData);

  return (
    <Box className="overflow-x-auto p-4">
     
        <Box ref={tableRef} className="h-30 overflow-y-auto ml-4 border-2 border-opacity-50 border-gray-300 rounded-lg">
          {activeDC === "DC1" && dcData?.DC1 !== "closed" && (
            <Table className="min-w-full bg-white rounded-md shadow-md">
              <Thead className="bg-gray-100 text-gray-700 font-semibold">
                <Tr>
                  <Th className="p-3" color={'red'}>SAC</Th>
                  <Th className="p-3" textAlign="center">Supplier</Th>
                  <Th className="p-3" textAlign="center">Medium</Th>
                  <Th className="p-3" textAlign="center">Units</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dcData[activeDC]?.map((entry, index) => (
                  <Tr key={index} className="border-t">
                    <Td className="p-3" textAlign="left">
                      <Input
                        type="text"
                        value={selectedSim[0]?.renamedMappedData?.componentMapp[entry.name]}
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "name", e.target.value)
                        }
                        className={`bg-white border text-left text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none w-full ${
                          !entry.name
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                      />
                    </Td>
                    <Td className="p-3">
                      <Select
                        name="supplier"
                        value={entry.supplier}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "supplier", e.target.value)
                        }
                        className={`bg-white border text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none w-full ${
                          entry.supplier.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                      >
                        {supplierOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td className="p-3">
                      <Select
                        name="medium"
                        value={entry.medium}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "medium", e.target.value)
                        }
                        className={`bg-white border text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none w-full ${
                          entry.medium.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                      >
                        {mediumOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    </Td>
                    <Td className="p-3">
                      <Input
                        type="text"
                        value={entry.units}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "units", e.target.value)
                        }
                        className={`bg-white border text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none w-full ${
                          !entry.units
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
          {/* Repeat for DC2 and DC3 as in the original code */}
        </Box>
      

      <Box className="h-16 flex justify-between items-center px-4 mt-4">
        <Box className="flex space-x-4">
          <Button
            onClick={() => handleDCButtonClick("DC1")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC1" && "bg-green-700"
            } disabled:bg-gray-400 disabled:cursor-default`}
            disabled={dcData?.DC1 === "closed"}
          >
            DC 1
          </Button>
          <Button
            onClick={() => handleDCButtonClick("DC2")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC2" && "bg-green-700"
            } disabled:bg-gray-400 disabled:cursor-default`}
            disabled={dcData?.DC2 === "closed"}
          >
            DC 2
          </Button>
          <Button
            onClick={() => handleDCButtonClick("DC3")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC3" && "bg-green-700"
            } disabled:bg-gray-400 disabled:cursor-default`}
            disabled={dcData?.DC3 === "closed"}
          >
            DC 3
          </Button>
        </Box>
        <Box className="flex">
          <Button
            onClick={() => onAddEntry(activeDC)}
            className="h-10 px-6 bg-green-600 text-white hover:bg-green-800 text-lg rounded-lg"
          >
            Add New
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SupplyChainTable;