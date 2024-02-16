import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Input,
  Text,
} from "@chakra-ui/react";

const Demand_hype_ch1 = () => {
  const regions = ["region1", "region2", "region3"];

  const [demandHypech1, setdemandHypech1] = useState({
    active: { region1: 74000, region2: 74000, region3: 74000 },
    price: { region1: 74000, region2: 74000, region3: 74000 },
    marketspending: { region1: 74000, region2: 74000, region3: 74000 },
  });

  const handleInputChange = (field, region, value) => {
    setdemandHypech1((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [region]: value,
      },
    }));
  };

  console.log("demand ch1", demandHypech1.price);

  return (
    <Box>
      <Text className="p-5 py-3 pb-0 text-2xl">
        <strong>Hyperware Channel 1</strong>
      </Text>
      <br />
      <Table variant="simple" className="bg-slate-200 mx-3" width={"650px"}>
        <Thead>
          <Tr>
            <Th> </Th>
            {regions.map((region) => (
              <Th key={region}>{region}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Active</Td>
            {regions.map((region) => (
              <Td key={region}>
                <Select
                  placeholder="Select"
                  fontSize={15}
                  width="100%"
                  border="1px solid black"
                  onChange={(e) =>
                    handleInputChange("active", region, e.target.value)
                  }
                  value={demandHypech1.active[region]}
                >
                  <option value="1">1</option>
                  {/* Add more options as needed */}
                </Select>
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td>Price</Td>
            {regions.map((region) => (
              <Td key={region}>
                <Input
                  type="number"
                  placeholder="Enter Price"
                  fontSize={15}
                  width="100%"
                  border="1px solid black"
                  onChange={(e) =>
                    handleInputChange("price", region, e.target.value)
                  }
                  value={demandHypech1.price[region]}
                />
              </Td>
            ))}
          </Tr>
          <Tr>
            <Td>Market spending</Td>
            {regions.map((region) => (
              <Td key={region}>
                <Input
                  type="number"
                  placeholder="Enter Spending"
                  fontSize={15}
                  width="100%"
                  border="1px solid black"
                  onChange={(e) =>
                    handleInputChange("marketspending", region, e.target.value)
                  }
                  value={demandHypech1.marketspending[region]}
                />
              </Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default Demand_hype_ch1;
