// YourComponent.js
import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Text,
} from "@chakra-ui/react";

const IT_reports = () => {
  return (
    <div className="">
      <Text className="p-5 py-4 pt-0 text-xl">
        <strong>Reports</strong>
      </Text>
      <Box className="h-60 overflow-x-hidden overflow-scroll ml-3 ">
        <Table variant="blue">
          <Tbody className=" ">
            <Tr>
              <Td bgColor="#C9D5DD" fontWeight="bold">
                Procurement Transactions Report?
              </Td>
              <Td bgColor="#C9D5DD">
                <Select
                  placeholder="Select"
                  width="100px"
                  border="1px solid black"
                >
                  <option value=""></option>
                </Select>
              </Td>
            </Tr>

            <Tr>
              <Td fontWeight="bold">Product Cost Report?</Td>
              <Td>
                <Select
                  placeholder="Select"
                  width="100px"
                  border="1px solid black"
                >
                  <option value=""></option>
                </Select>
              </Td>
            </Tr>

            <Tr>
              <Td bgColor="#C9D5DD" fontWeight="bold">
                Replacement Parts Demand Report?
              </Td>
              <Td bgColor="#C9D5DD">
                <Select
                  placeholder="Select"
                  width="100px"
                  border="1px solid black"
                >
                  <option value=""></option>
                </Select>
              </Td>
            </Tr>

            <Tr>
              <Td fontWeight="bold">Retail Pipeline Report?</Td>
              <Td>
                <Select
                  placeholder="Select"
                  width="100px"
                  border="1px solid black"
                >
                  <option value=""></option>
                </Select>
              </Td>
            </Tr>

            <Tr>
              <Td bgColor="#C9D5DD" fontWeight="bold">
                Transportation Cost Report?
              </Td>
              <Td bgColor="#C9D5DD">
                <Select
                  placeholder="Select"
                  width="100px"
                  border="1px solid black"
                >
                  <option value=""></option>
                </Select>
              </Td>
            </Tr>

            <Tr>
              <Td fontWeight="bold">Transportation Report?</Td>
              <Td>
                <Select
                  placeholder="Select"
                  width="100px"
                  border="1px solid black"
                >
                  <option value=""></option>
                </Select>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default IT_reports;
