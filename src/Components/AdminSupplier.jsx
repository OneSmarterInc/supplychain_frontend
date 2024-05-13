import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';


const DataTable = ({ data }) => {
  // Extract keys from the first object to create table headers
  const headers = Object.keys(data);

  return (
    <Table variant="striped" colorScheme="teal">
      <Thead>
        <Tr>
          {headers.map((header) => (
            <Th key={header}>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          {headers.map((header) => (
            <Td key={header}>{data[header]}</Td>
          ))}
        </Tr>
      </Tbody>
    </Table>
  );
};

export default DataTable;
