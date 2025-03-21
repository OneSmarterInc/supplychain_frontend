import React, { useRef, useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  Box,
} from "@chakra-ui/react";

const SupplyChainTable = ({ setUpdatedDCData , data}) => {
  const tableRef = useRef(null);
  const [activeDC, setActiveDC] = useState("DC1");
  const [procurementData, setProcurementData] = useState({});
  const [selectedSim, setSelectedSim] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("procurementData"));
    setProcurementData(data || {});
  }, [data]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedSim"));
    setSelectedSim(data || []);
  }, []);

  const defaultSuppliers = [
    "supplierA",
    "supplierB",
    "supplierC",
    "supplierD",
    // "supplierE",
    // "supplierF",
    // "supplierG",
  ];
  const mediumOptions = ["Air", "Surface"];
  const nameOptions = ["Audio Modal", "Control Interface", "Motherboard"];
  const supplierMappings = {
    "Audio Modal": ["supplierA", "supplierB", "supplierC", "supplierD"],
    "Control Interface": [
      "supplierB",
      "supplierC",
      "supplierD",
      "supplierE",
      "supplierF",
    ],
    Motherboard: ["supplierD", "supplierE", "supplierF", "supplierG"],
  };
  const [dcData, setDcData] = useState({});

  useEffect(() => {
    if (procurementData?.sac_units) {
      setDcData(procurementData?.sac_units);
      console.log("procurementData?.sac_units", procurementData?.sac_units);
    } else {
      const defaultData = {
        DC1: Array(3).fill({ name: "", supplier: "", medium: "", units: "" }),
        DC2: Array(3).fill({ name: "", supplier: "", medium: "", units: "" }),
        DC3: Array(3).fill({ name: "", supplier: "", medium: "", units: "" }),
      };
      setDcData(defaultData);
    }
  }, [procurementData?.sac_units, data]);

  const handleDCClick = (dc) => {
    if (dcData[dc] !== "closed") {
      setActiveDC(dc);
    }
  };

  const handleInputChange = (dc, index, key, value) => {
    const updatedData = JSON.parse(JSON.stringify(dcData));
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
  const onRemoveEntry = (dc) => {
    if (dcData[activeDC]?.length > 3) {
      setDcData((prevData) => ({
        ...prevData,
        [dc]: prevData[dc].slice(0, prevData[dc].length - 1), 
      }));
    }
  };
  
  setUpdatedDCData(dcData);

  return (
    <Box className="overflow-x-auto p-4">
      <Box
        ref={tableRef}
        className="h-30 overflow-y-auto border-2 border-opacity-50 border-gray-300 rounded-lg"
      >
        {["DC1", "DC2", "DC3"].map(
          (dc) =>
            activeDC === dc &&
            dcData[dc] !== "closed" && (
              <Table
                id="procurement-table-supply-chain"
                key={dc}
                className="min-w-full bg-white rounded-md shadow-md"
              >
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
                  {dcData[dc]?.map((entry, index) => (
                    <Tr key={index} className="border-t">
                      <Td className="p-3" textAlign="left">
                        <Select
                          value={
                            selectedSim[0]?.renamedMappedData?.componentMapp?.[
                              entry.name
                            ] || entry.name
                          }
                          onChange={(e) =>
                            handleInputChange(dc, index, "name", e.target.value)
                          }
                          className={`bg-white border text-left text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none w-full ${
                            !entry.name
                              ? "border-red-500 outline-red-500"
                              : "border-green-500 outline-green-500"
                          }`}
                        >
                          {nameOptions.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </Select>
                      </Td>

                      <Td className="p-3">
                        <Select
                          name="supplier"
                          value={entry.supplier}
                          onChange={(e) =>
                            handleInputChange(
                              dc,
                              index,
                              "supplier",
                              e.target.value
                            )
                          }
                          className={`bg-white border text-center text-gray-900 text-sm rounded-lg focus:ring-none focus:border-none w-full ${
                            entry.supplier.trim() === "Select"
                              ? "border-red-500 outline-red-500"
                              : "border-green-500 outline-green-500"
                          }`}
                        >
                          {(
                            supplierMappings[
                              selectedSim[0]?.renamedMappedData
                                ?.componentMapp?.[entry.name]
                            ] ||
                            supplierMappings[entry.name] ||
                            defaultSuppliers
                          ).map((option, i) => (
                            <option key={i} value={option}>
                              {selectedSim[0]?.renamedMappedData
                                ?.suppliarMapp?.[option] || option}
                            </option>
                          ))}
                        </Select>
                      </Td>
                      <Td className="p-3">
                        <Select
                          name="medium"
                          value={entry.medium}
                          onChange={(e) =>
                            handleInputChange(
                              dc,
                              index,
                              "medium",
                              e.target.value
                            )
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
                            handleInputChange(
                              dc,
                              index,
                              "units",
                              e.target.value
                            )
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
            )
        )}
      </Box>

      <Box className="h-16 flex justify-between items-center px-4 mt-4">
        <Box id="procurement-dc-selection" className="flex space-x-4">
          {["DC1", "DC2", "DC3"].map((dc) => (
            <Box
              key={dc}
              onClick={() => handleDCClick(dc)}
              className={`h-10 px-4 text-lg rounded-lg flex justify-center items-center cursor-pointer ${
                dcData[dc] === "closed"
                  ? "bg-gray-400 text-black cursor-not-allowed"
                  : activeDC === dc
                  ? "bg-red-600 text-white"
                  : "bg-gray-400 text-black"
              }`}
              disabled={dcData[dc] === "closed"}
            >
              {dc}
            </Box>
          ))}
        </Box>
        <Box className="flex">
          <Box
            onClick={() => onAddEntry(activeDC)}
            id="procurement-add-row"
            className={`h-10 px-3 bg-gray-600 text-white hover:bg-green-800 text-lg rounded-lg cursor-pointer flex justify-center items-center ${
              dcData[activeDC] === "closed"
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            disabled={dcData[activeDC] === "closed"}
          >
            Add Row
          </Box>
          {dcData[activeDC]?.length > 3 && <Box
            onClick={() => onRemoveEntry(activeDC)}
            id="procurement-remove-row"
            className={`h-10 px-3 bg-red-600 ms-3 text-white hover:bg-red-800 text-lg rounded-lg cursor-pointer flex justify-center items-center ${
              dcData[activeDC]?.length <= 3
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            disabled={dcData[activeDC]?.length <= 2}
          >
            Remove Row
          </Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default SupplyChainTable;
