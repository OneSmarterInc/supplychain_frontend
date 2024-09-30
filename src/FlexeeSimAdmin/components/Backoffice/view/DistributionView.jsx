import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";

const DistributionView = ({ data, repo }) => {
  const [values, setValues] = useState({});
  console.log(values);
  
  useEffect(() => {
    if (repo) {
      setValues(repo);
    }
  }, [repo]); // Add data as a dependency to re-run the effect if data changes

  return (
    <Box className="overflow-x-auto p-4" style={{ fontFamily: "ABeeZee" }}>
      <Box className="ml-4 mr-4">
        <Table variant="simple" bg="white" mt="4" className="rounded-md">
          <Thead className="bg-gray-100 text-gray-700 font-semibold">
            <Tr>
              <Th style={{ color: "#D10000" }}> Distribution </Th>
              {["region1", "region2", "region3"].map((region, idx) => (
                <Th key={idx}>{region}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {/* Distribution Center Row */}
            <Tr>
              <Th>
                Distribution Center{" "}
                {`{0=none | 1=outsourced | 2=owned}`}
              </Th>
              {["region1", "region2", "region3"].map((region) => (
                <Td key={region}>
                  {region === "region1" ? (
                    // Render a blank space for region1
                    <span>&nbsp;</span>
                  ) : (
                    values.distribution_center?.[region] || "-"
                  )}
                </Td>
              ))}
            </Tr>

            {/* RFID Application Row */}
            <Tr>
              <Th>RFID Application {`{0=outsourced | 1=insourced}`}</Th>
              {["region1", "region2", "region3"].map((region) => (
                <Td key={region}>
                  {values.rfid?.[region] || "-"}
                </Td>
              ))}
            </Tr>

            {/* Emergency Carrier Row */}
            <Tr>
              <Th>Emergency Carrier {`{I|J|K|L|M|N}`}</Th>
              {["region1", "region2", "region3"].map((region) => (
                <Td key={region}>
                  {region === "region1" ? (
                    // Render a blank space for region1
                    <span>&nbsp;</span>
                  ) : (
                    values.emergency_carrier?.[region] || "-"
                  )}
                </Td>
              ))}
            </Tr>

            {/* Cross-Docking Rows */}
            {["carrier_k", "carrier_l", "carrier_m", "carrier_n"].map(
              (carrier) => (
                <Tr key={carrier}>
                  <Th>
                    Cross-Docking,{" "}
                    {carrier.toUpperCase().replace("_", " ")}{" "}
                  </Th>
                  {["region1", "region2", "region3"].map((region) => (
                    <Td key={region}>
                      {region === "region1" ? (
                        <span>&nbsp;</span>
                      ) : (
                        values.cross_docking?.[carrier]?.[region] || "-"
                      )}
                    </Td>
                  ))}
                </Tr>
              )
            )}

            {/* FGI Surface Shipping Row */}
            <Tr>
              <Th>
                FGI Surface Shipping{" "}
                {`{1=Economy | 2=Standard | 3=Expedited}`}
              </Th>
              {["region1", "region2", "region3"].map((region) => (
                <Td key={region}>
                  {region === "region1" ? (
                    <span>&nbsp;</span>
                  ) : (
                    values.fgi_surface_shipping?.[region] || "-"
                  )}
                </Td>
              ))}
            </Tr>

            {/* SAC Surface Shipping Row */}
            <Tr>
              <Th>
                SAC Surface Shipping{" "}
                {`{1=Economy | 2=Standard | 3=Expedited}`}
              </Th>
              {["region1", "region2", "region3"].map((region) => (
                <Td key={region}>
                  {values.sac_surface_shipping?.[region] || "-"}
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default DistributionView;