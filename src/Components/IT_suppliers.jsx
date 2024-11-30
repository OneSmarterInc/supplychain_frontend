import { Box, Select, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const IT_suppliers = ({
  setSuppliersFromDecision,
  setCareersFromDecision,
  ItData,
}) => {
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const options = [
    {
      name: selectedSim[0]?.renamedMappedData?.suppliarMapp?.supplierA,
      key: "A",
    },
    {
      name: selectedSim[0]?.renamedMappedData?.suppliarMapp?.supplierB,
      key: "B",
    },
    {
      name: selectedSim[0]?.renamedMappedData?.suppliarMapp?.supplierC,
      key: "C",
    },
    {
      name: selectedSim[0]?.renamedMappedData?.suppliarMapp?.supplierD,
      key: "D",
    },
    {
      name: selectedSim[0]?.renamedMappedData?.suppliarMapp?.supplierE,
      key: "E",
    },
    {
      name: selectedSim[0]?.renamedMappedData?.suppliarMapp?.supplierF,
      key: "F",
    },
    {
      name: selectedSim[0]?.renamedMappedData?.suppliarMapp?.supplierG,
      key: "G",
    },
  ];

  const careeroptions = [
    { name: selectedSim[0]?.renamedMappedData?.distributerMapp?.I, key: "I" },
    { name: selectedSim[0]?.renamedMappedData?.distributerMapp?.J, key: "J" },
    { name: selectedSim[0]?.renamedMappedData?.distributerMapp?.K, key: "K" },
    { name: selectedSim[0]?.renamedMappedData?.distributerMapp?.L, key: "L" },
    { name: selectedSim[0]?.renamedMappedData?.distributerMapp?.M, key: "M" },
    { name: selectedSim[0]?.renamedMappedData?.distributerMapp?.N, key: "N" },
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

  const initialCareers = {
    I: false,
    J: false,
    K: false,
    L: false,
    M: false,
    N: false,
  };

  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [careers, setCareers] = useState(initialCareers);

  console.log("Career", careers);

  useEffect(() => {
    if (ItData) {
      setSuppliers({
        A: ItData.sync_a || false,
        B: ItData.sync_b || false,
        C: ItData.sync_c || false,
        D: ItData.sync_d || false,
        E: ItData.sync_e || false,
        F: ItData.sync_f || false,
        G: ItData.sync_g || false,
      });
      setCareers({
        I: ItData.sync_i || false,
        J: ItData.sync_j || false,
        K: ItData.sync_k || false,
        L: ItData.sync_l || false,
        M: ItData.sync_m || false,
        N: ItData.sync_n || false,
      });
    }
  }, [ItData]);

  const handleChangeSupplier = (event, key) => {
    setSuppliers({
      ...suppliers,
      [key]: event.target.value === "true",
    });
  };

  const handleChangeCareer = (event, key) => {
    setCareers({
      ...careers,
      [key]: event.target.value === "true",
    });
  };

  useEffect(() => {
    setSuppliersFromDecision(suppliers);
    setCareersFromDecision(careers);
  }, [suppliers, careers, setSuppliersFromDecision, setCareersFromDecision]);

  return (
    <Box>
      <Box
        id="IT-Synchronization-with-Suppliers"
        className="border border-gray rounded-lg"
      >
        <Text className="p-5 py-1 text-xl">
          <strong>IT Synchronization with Suppliers</strong>
        </Text>
        <br />
        <div className="grid grid-cols-3 gap-3 pb-3">
          {options.map((option) => (
            <Box key={option.key} className="flex">
              <Text className="pl-6 py-2 text-lg">{option.name}</Text>
              <Select
                placeholder="Select"
                fontSize={15}
                width="73%"
                border="1px solid black"
                className="ml-5"
                value={suppliers[option.key] ? "true" : "false"}
                onChange={(e) => handleChangeSupplier(e, option.key)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </Box>
          ))}
        </div>
      </Box>
      <Box
        id="IT-Synchronization-with-Carreers"
        className="border border-gray rounded-lg"
      >
        <Text className="p-5 py-1 text-xl">
          <strong>IT Synchronization with Careers</strong>
        </Text>
        <br />
        <div className="grid grid-cols-3 gap-3 pb-3">
          {careeroptions.map((option) => (
            <Box key={option.key} className="flex">
              <Text className="pl-6 py-2 text-lg">{option.name}</Text>
              <Select
                placeholder="Select"
                fontSize={15}
                width="73%"
                border="1px solid black"
                className="ml-5"
                value={careers[option.key] ? "true" : "false"}
                onChange={(e) => handleChangeCareer(e, option.key)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </Select>
            </Box>
          ))}
        </div>
      </Box>
    </Box>
  );
};

export default IT_suppliers;
