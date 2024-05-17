import React, { useContext, useState } from "react";
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
// import DataChart from "../Components/DataChart";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import TransportationDataChart from "../DataChartsOfDecisions/Transportation/TransportationDataChart";

const Transportation_Decision = () => {
  const { api } = useContext(MyContext);
  const regions = ["carrier", "medium"];
  const [Dc1Data, setDc1Data] = useState({
    row1: { product: "", carrier: "", medium: "", units: "" },
    row2: { product: "", carrier: "", medium: "", units: "" },
    row3: { product: "", carrier: "", medium: "", units: "" },
    row4: { product: "", carrier: "", medium: "", units: "" },
    row5: { product: "", carrier: "", medium: "", units: "" },
    row6: { product: "", carrier: "", medium: "", units: "" },
  });

  const handleChange = (rowId, field, value) => {
    setDc1Data((prevDc1Data) => ({
      ...prevDc1Data,
      [rowId]: {
        ...prevDc1Data[rowId],
        [field]: value,
      },
    }));
  };
  // console.log("row5", Dc1Data.row5);

  const submitTransportation = async () => {
    try {
      const response = await axios.post(`${api}/decision/transportation/`, {
        firm_key: "123",
        quarter: null,
      });
      console.log("POST request successful", response.data);
    } catch (error) {
      console.error("Error making POST request: Transportation", error);
    }
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <NavBar />
      <div className=" ">
        <div className="flex justify-between">
          <h1 className="text-4xl text-start px-3 py-2 ">
            Transportation Decision
          </h1>

          <div className="flex">
            {" "}
            <h1 className="text-2xl text-start px-3 py-2 text-blue-500">
              MBA-JUN-24
            </h1>{" "}
            <h1 className="text-2xl text-start px-3 py-2 text-gray-600 ">
              {user.username}
            </h1>
          </div>
        </div>
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
                  {Object.entries(Dc1Data).map(([rowId, rowData]) => (
                    <Tr key={rowId}>
                      <Td>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                          value={rowData.product}
                          onChange={(e) =>
                            handleChange(rowId, "product", e.target.value)
                          }
                        >
                          <option value="Product 0">Product 0</option>
                          <option value="Product 1">Product 1</option>
                          <option value="Product 2">Product 2</option>
                        </Select>
                      </Td>

                      <Td>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                          onChange={(e) =>
                            handleChange(rowId, "carrier", e.target.value)
                          }
                          value={rowData.carrier}
                        >
                          <option value="">Select</option>
                          <option value="I">I</option>
                          <option value="J">J</option>
                          <option value="K">K</option>
                          <option value="L">L</option>
                          <option value="K">N</option>
                        </Select>
                      </Td>
                      <Td>
                        <Select
                          placeholder="Select"
                          fontSize={15}
                          width="100%"
                          border="1px solid black"
                          onChange={(e) =>
                            handleChange(rowId, "medium", e.target.value)
                          }
                          value={rowData.medium}
                        >
                          <option value="">Select</option>
                          <option value="Surface">Surface</option>
                          <option value="Air">Air</option>
                        </Select>
                      </Td>
                      <Td>
                        <Input
                          width={"100px"}
                          type="number"
                          value={rowData.units}
                          onChange={(e) =>
                            handleChange(rowId, "units", e.target.value)
                          }
                          border="1px solid black"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </div>
          <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
            <InfoImg />
          </div>

          <TransportationDataChart
            submitTransportation={submitTransportation}
            Dc1Data={Dc1Data}
          />
        </div>
      </div>
    </div>
  );
};

export default Transportation_Decision;
