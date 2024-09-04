import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const DemandView = ({ data, repo }) => {
  const regions = ["region1", "region2", "region3"];
  
  // Map of the channels to be displayed
  const channels = [
    { key: "hyperware_channel_one", label: `Channel 1 ${data?.dataVariabllesMapp?.hyperware}` },
    { key: "hyperware_channel_two", label: `Channel 2 ${data?.dataVariabllesMapp?.metaware}` },
    { key: "metaware_channel_one", label:`Channel 1 ${data?.dataVariabllesMapp?.hyperware}` },
    { key: "metaware_channel_two", label: `Channel 2 ${data?.dataVariabllesMapp?.metaware}` },
  ];

  return (
    <Box>
      {channels.map((channel) => (
        <Table key={channel.key} variant="simple" bg="white" mt="4" className="shadow-md rounded-md">
          <Thead className="bg-gray-100 text-gray-700 font-semibold">
            <Tr>
              <Th fontWeight="bold" style={{ color: "#D10000" }}>
                {data?.ChannelMapp?.[channel.label.split(" ")[1].toLowerCase()] || channel.label}
              </Th>
              {regions.map((region, index) => (
                <Th key={index}>
                  {data?.RegionMapp?.[region] || `Region ${index + 1}`}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {/* Active Row */}
            <Tr>
              <Td fontWeight="medium">Active</Td>
              {regions.map((region) => (
                <Td key={region}>{repo[`${channel.key}_active`]?.[region] ? "Yes" : "No"}</Td>
              ))}
            </Tr>

            {/* Price Row */}
            <Tr>
              <Td fontWeight="medium">Price</Td>
              {regions.map((region) => (
                <Td key={region}>
                  {repo[`${channel.key}_price`]?.[region] !== undefined
                    ? `$${repo[`${channel.key}_price`]?.[region]}`
                    : "N/A"}
                </Td>
              ))}
            </Tr>

            {/* Market Spending Row */}
            <Tr>
              <Td fontWeight="medium">Market Spending</Td>
              {regions.map((region) => (
                <Td key={region}>
                  {repo[`${channel.key}_market`]?.[region] !== undefined
                    ? `$${repo[`${channel.key}_market`]?.[region]}`
                    : "N/A"}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      ))}
    </Box>
  );
};

export default DemandView;