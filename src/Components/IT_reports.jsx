import React, { useState, useEffect } from "react";
import { Box, Table, Tbody, Tr, Td, Select, Text } from "@chakra-ui/react";

const IT_reports = ({ setReportValuesFromDecision }) => {
  const [reportValues, setReportValues] = useState({
    procurement: false,
    productCost: false,
    replacementParts: false,
    retailPipeline: false,
    transportationCost: false,
    transportation: false,
  });

  const handleChange = (e, reportType) => {
    setReportValues({
      ...reportValues,
      [reportType]: e.target.value === "true",
    });
  };

  useEffect(() => {
    setReportValuesFromDecision(reportValues);
  }, [reportValues, setReportValuesFromDecision]);

  return (
    <div className="">
      <Text className="p-5 py-4 pt-0 text-xl">
        <strong>Reports</strong>
      </Text>
      <Box className="h-60 overflow-x-hidden overflow-scroll ml-3">
        <Table variant="blue">
          <Tbody>
            <Tr>
              <Td bgColor="#C9D5DD" fontWeight="bold">
                Procurement Transactions Report?
              </Td>
              <Td bgColor="#C9D5DD">
                <Select
                  placeholder="Select"
                  width="100px"
                  border="1px solid black"
                  value={reportValues.procurement ? "true" : "false"}
                  onChange={(e) => handleChange(e, 'procurement')}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
                  value={reportValues.productCost ? "true" : "false"}
                  onChange={(e) => handleChange(e, 'productCost')}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
                  value={reportValues.replacementParts ? "true" : "false"}
                  onChange={(e) => handleChange(e, 'replacementParts')}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
                  value={reportValues.retailPipeline ? "true" : "false"}
                  onChange={(e) => handleChange(e, 'retailPipeline')}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
                  value={reportValues.transportationCost ? "true" : "false"}
                  onChange={(e) => handleChange(e, 'transportationCost')}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
                  value={reportValues.transportation ? "true" : "false"}
                  onChange={(e) => handleChange(e, 'transportation')}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
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
