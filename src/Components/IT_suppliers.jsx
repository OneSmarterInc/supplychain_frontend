import { Box, Select, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const IT_suppliers = ({ setSuppliersFromDecision, ItData }) => {
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const options = [
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.A,
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.B,
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.C,
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.D,
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.E,
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.F,
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.G,
  ];

  const initialSuppliers = {
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
  };
  useEffect(() => {
    if (ItData) {
      setSuppliers({
        A: ItData.sync_a,
        B: ItData.sync_b,
        C: ItData.sync_c,
        D: ItData.sync_d,
        E: ItData.sync_e,
        F: ItData.sync_f,
        G: ItData.sync_g,
      });
    }
  }, [ItData]);

  const [suppliers, setSuppliers] = useState(initialSuppliers);

  const handleChange = (event, option) => {
    setSuppliers({
      ...suppliers,
      [option]: event.target.value === "true",
    });
  };

  useEffect(() => {
    setSuppliersFromDecision(suppliers);
  }, [suppliers, setSuppliersFromDecision]);

  return (
    <Box className="border boder-gray rounded-lg">
      <Text className="p-5 py-1 text-xl">
        <strong>IT Synchronization with Suppliers</strong>
      </Text>
      <br />
      <div className="grid grid-cols-3 gap-3 pb-3">
        {options.map((option) => (
          <Box key={option} className="flex">
            <Text className="pl-6 py-2 text-lg">{option}</Text>
            <Select
              placeholder="Select"
              fontSize={15}
              width="73%"
              border="1px solid black"
              className="ml-5"
              value={suppliers[option] ? "true" : "false"}
              onChange={(e) => handleChange(e, option)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default IT_suppliers;
