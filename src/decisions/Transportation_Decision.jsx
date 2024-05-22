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
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  return (
    <div>
      <NavBar />
      <div style={{ fontFamily: "ABeeZee" }} className=" ">
        <div className="flex justify-between">
          <h1 className="text-2xl text-start pl-6 py-2 ">
            Transportation Decision
          </h1>

          <div className="flex">
            {" "}
            <h1 className="text-xl text-start px-3 py-2 text-blue-500">
              {selectedSim[0].name}
            </h1>{" "}
            <h1 className="text-xl text-start px-1 py-2 text-blue-500">|</h1>{" "}
            <h1 className="text-xl text-start px-3 py-2 text-gray-600 ">
              {user.username}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-col gap-2  m-1">
          <div className="m-3 rounded-2xl  h-screen bg-white p-2  flex flex-col justify-start">
            <Box>
              <Text className="p-5 px-8 py-3 font-semibold pb-0 text-xl">
                DC 2
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
                          size={"sm"}
                          rounded={"lg"}
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
                          size={"sm"}
                          rounded={"lg"}
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
                          size={"sm"}
                          rounded={"lg"}
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
                          size={"sm"}
                          rounded={"lg"}
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
          <div className="rounded-2xl m-3  overflow-hidden    bg-white h-screen p-2">
            <InfoImg />
            <div className="py-10">
              <TransportationDataChart
                submitTransportation={submitTransportation}
                Dc1Data={Dc1Data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transportation_Decision;
