import React, { useState } from "react";

import {
  HStack,
  Select,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Text,
} from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";

const Transportation_Decision = () => {
  const regions = ["Region 1", "Region 2"];
  let [value, setValue] = useState({});

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div>
      <NavBar/>
      <div className=" ">
        <h1 className="text-4xl text-start px-3 py-2 underline">
          Transportation Decision
        </h1>
        <div className="grid grid-cols-2 grid-flow-col gap-3  m-1">
          <div className="row-span-2 rounded-lg -2xl h-full  flex flex-col justify-center">
            <Box>
              <Text className="p-5 py-3 pb-0 text-2xl">
                <strong>DC 2</strong>
              </Text>
              <br />
              <Table
                variant="simple"
                className="bg-slate-300 mx-3"
                width={"650px"}
              >
                <Thead>
                  <Tr>
                    <Th>Products</Th>
                    <Th>Carrier</Th>
                    <Th>Mediums</Th>
                    <Th>Units</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <Select
                        placeholder="Select"
                        fontSize={15}
                        width="100%"
                        border="1px solid black"
                      >
                        <option value="1">Product 1</option>
                        <option value="1">Product 2</option>
                        <option value="1">Product 3</option>
                        <option value="1">Product 4</option>
                      </Select>
                    </Td>
                    {regions.map((region) => (
                      <Td key={region}>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                        >
                          <option value="1">1</option>
                          <option value="1">2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                        </Select>
                      </Td>
                    ))}
                    <Td>
                      {" "}
                      <Input
                        width={"100px"}
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(e)}
                        border="1px solid black"
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    {" "}
                    <Td>
                      <Select
                        placeholder="Select"
                        fontSize={15}
                        width="100%"
                        border="1px solid black"
                      >
                        <option value="1">Product 1</option>
                        <option value="1">Product 2</option>
                        <option value="1">Product 3</option>
                        <option value="1">Product 4</option>
                      </Select>
                    </Td>
                    {regions.map((region) => (
                      <Td key={region}>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                        >
                          <option value="1">1</option>
                          <option value="1">2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                        </Select>
                      </Td>
                    ))}
                    <Td>
                      {" "}
                      <Input
                        width={"100px"}
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(e)}
                        border="1px solid black"
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    {" "}
                    <Td>
                      <Select
                        placeholder="Select"
                        fontSize={15}
                        width="100%"
                        border="1px solid black"
                      >
                        <option value="1">Product 1</option>
                        <option value="1">Product 2</option>
                        <option value="1">Product 3</option>
                        <option value="1">Product 4</option>
                      </Select>
                    </Td>
                    {regions.map((region) => (
                      <Td key={region}>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                        >
                          <option value="1">1</option>
                          <option value="1">2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                        </Select>
                      </Td>
                    ))}
                    <Td>
                      {" "}
                      <Input
                        width={"100px"}
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(e)}
                        border="1px solid black"
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    {" "}
                    <Td>
                      <Select
                        placeholder="Select"
                        fontSize={15}
                        width="100%"
                        border="1px solid black"
                      >
                        <option value="1">Product 1</option>
                        <option value="1">Product 2</option>
                        <option value="1">Product 3</option>
                        <option value="1">Product 4</option>
                      </Select>
                    </Td>
                    {regions.map((region) => (
                      <Td key={region}>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                        >
                          <option value="1">1</option>
                          <option value="1">2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                        </Select>
                      </Td>
                    ))}
                    <Td>
                      {" "}
                      <Input
                        width={"100px"}
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(e)}
                        border="1px solid black"
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    {" "}
                    <Td>
                      <Select
                        placeholder="Select"
                        fontSize={15}
                        width="100%"
                        border="1px solid black"
                      >
                        <option value="1">Product 1</option>
                        <option value="1">Product 2</option>
                        <option value="1">Product 3</option>
                        <option value="1">Product 4</option>
                      </Select>
                    </Td>
                    {regions.map((region) => (
                      <Td key={region}>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                        >
                          <option value="1">1</option>
                          <option value="1">2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                        </Select>
                      </Td>
                    ))}
                    <Td>
                      {" "}
                      <Input
                        width={"100px"}
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(e)}
                        border="1px solid black"
                      />
                    </Td>
                  </Tr>
                  <Tr>
                    {" "}
                    <Td>
                      <Select
                        placeholder="Select"
                        fontSize={15}
                        width="100%"
                        border="1px solid black"
                      >
                        <option value="1">Product 1</option>
                        <option value="1">Product 2</option>
                        <option value="1">Product 3</option>
                        <option value="1">Product 4</option>
                      </Select>
                    </Td>
                    {regions.map((region) => (
                      <Td key={region}>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                        >
                          <option value="1">1</option>
                          <option value="1">2</option>
                          <option value="1">3</option>
                          <option value="1">4</option>
                        </Select>
                      </Td>
                    ))}
                    <Td>
                      {" "}
                      <Input
                        width={"100px"}
                        type="number"
                        value={value}
                        onChange={(e) => handleChange(e)}
                        border="1px solid black"
                      />
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </div>
          <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
            <InfoImg />
          </div>
       
          <DataChart/>
        </div>
      </div>
    </div>
  );
};

export default Transportation_Decision;
