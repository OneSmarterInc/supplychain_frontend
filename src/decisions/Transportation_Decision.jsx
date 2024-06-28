import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import TransportationDataChart from "../DataChartsOfDecisions/Transportation/TransportationDataChart";
import { useNavigate } from "react-router-dom";

const Transportation_Decision = () => {
  const { api } = useContext(MyContext);
  const [TransportationData, setTransportationData] = useState(null);
  useEffect(() => {
    getTransportation();
  }, []);

  const defaultDc2Data = {
    product0: {
      surface: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
      air: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
    },
    product1: {
      surface: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
      air: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
    },
    product2: {
      surface: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
      air: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
    },
  };

  const [Dc2Data, setDc2Data] = useState(defaultDc2Data);

  const defaultDc3Data = {
    product0: {
      surface: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
      air: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
    },
    product1: {
      surface: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
      air: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
    },
    product2: {
      surface: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
      air: {
        carrierI: "",
        carrierJ: "",
        carrierK: "",
        carrierL: "",
        carrierM: "",
        carrierN: "",
      },
    },
  };

  const [Dc3Data, setDc3Data] = useState(defaultDc3Data);

  useEffect(() => {
    if (TransportationData) {
      if (TransportationData.flag_dc2) {
        if (Object.keys(TransportationData.dc_two).length === 0) {
          setDc2Data(defaultDc2Data);
        } else {
          setDc2Data(TransportationData.dc_two);
        }
      }
      if (TransportationData.flag_dc3) {
        if (Object.keys(TransportationData.dc_three).length === 0) {
          setDc3Data(defaultDc3Data);
        } else {
          setDc3Data(TransportationData.dc_three);
        }
      }
    }
  }, [TransportationData]);

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }

  const handleChange = (setDataFunc, product, shipmentType, carrier, value) => {
    setDataFunc((prevData) => ({
      ...prevData,
      [product]: {
        ...prevData[product],
        [shipmentType]: {
          ...prevData[product][shipmentType],
          [carrier]: value,
        },
      },
    }));
  };

  const getTransportation = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Transportation",
          current_quarter: selectedSim[0].current_quarter,
          firm_key: firm_key_new,
        },
      });
      const data = response.data;
      setTransportationData(data);
      localStorage.setItem("TransportationData", JSON.stringify(data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const toast = useToast();
  const navigate = useNavigate();

  const submitTransportation = async () => {
    try {
      const response = await axios.post(`${api}/decision/transportation/`, {
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSim[0].current_quarter,
        dc_two: Dc2Data,
        dc_three: Dc3Data,
      });
      getTransportation();
      addUserLogger();
      toast({
        title: "Transportation data submitted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/usersidelive");
    } catch (error) {
      console.error("Error making POST request: Transportation", error);
    }
  };

  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        decision: "Transportation",
        action: "created",
        ip_address: "123.345.1",
        username: user.username,
        firm_key: firm_key_new,
        current_quarter:selectedSim[0].current_quarter,

      });
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const renderTable = (data, setDataFunc, title) => (
    <Box>
      <Text className="p-5 px-8 py-1 font-semibold  text-xl bg-blue-gray-600 text-white">
        {title}
      </Text>
      <Table size="sm" variant="striped" className="bg-slate-300 ">
        <Thead>
          <Tr>
            <Th>Products</Th>
            <Th>
              Carrier {selectedSim[0]?.renamedMappedData?.distributerMapp?.I}
            </Th>
            <Th>
              Carrier {selectedSim[0]?.renamedMappedData?.distributerMapp?.J}
            </Th>
            <Th>
              Carrier {selectedSim[0]?.renamedMappedData?.distributerMapp?.K}
            </Th>
            <Th>
              Carrier {selectedSim[0]?.renamedMappedData?.distributerMapp?.L}
            </Th>
            <Th>
              Carrier {selectedSim[0]?.renamedMappedData?.distributerMapp?.M}
            </Th>
            <Th>
              Carrier {selectedSim[0]?.renamedMappedData?.distributerMapp?.N}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.entries(data).map(([product, shipmentTypes]) =>
            Object.entries(shipmentTypes).map(
              ([shipmentType, carriers], index) => (
                <Tr key={`${product}-${shipmentType}`}>
                  <Td>{`Product ${product.replace("product", "")}, ${
                    shipmentType.charAt(0).toUpperCase() + shipmentType.slice(1)
                  }`}</Td>
                  {Object.keys(carriers).map((carrier) => (
                    <Td key={carrier}>
                      <Input
                        width={"70px"}
                        margin={0}
                        padding={0}
                        type="number"
                        size={"sm"}
                        rounded={"lg"}
                        value={carriers[carrier]}
                        onChange={(e) =>
                          handleChange(
                            setDataFunc,
                            product,
                            shipmentType,
                            carrier,
                            e.target.value
                          )
                        }
                        border="1px solid black"
                      />
                    </Td>
                  ))}
                </Tr>
              )
            )
          )}
        </Tbody>
      </Table>
    </Box>
  );

  return (
    <div>
      <NavBar />
      <div style={{ fontFamily: "ABeeZee" }}>
        <div className="flex justify-between">
          <h1 className="text-2xl text-start pl-6 py-2 ">
            Transportation Decision
          </h1>
          <div className="flex">
            <h1 className="text-xl text-start px-3 py-2 text-blue-500">
              {selectedSim[0].name}
            </h1>
            <h1 className="text-xl text-start px-1 py-2 text-blue-500">|</h1>
            <h1 className="text-xl text-start px-3 py-2 text-gray-600 ">
              {user.username}
            </h1>
          </div>
        </div>
        <div className="flex  gap-1 m-1">
          <div className="m-2 min-w-[700px]  rounded-2xl  bg-white p-2 flex flex-col space-y-4 justify-start">
            {TransportationData?.flag_dc2 &&
              renderTable(Dc2Data, setDc2Data, "DC 2")}
            {TransportationData?.flag_dc3 &&
              renderTable(Dc3Data, setDc3Data, "DC 3")}
            {!(
              TransportationData?.flag_dc3 || TransportationData?.flag_dc2
            ) && (
              <div>
                <h1 className="text-red-500 text-3xl">
                  {" "}
                  You do not own any Distribution channel in other region
                </h1>
              </div>
            )}
          </div>
          <div className="rounded-2xl m-2 overflow-hidden bg-white  p-2">
            <InfoImg />
            <div className="py-10">
              <TransportationDataChart
                submitTransportation={submitTransportation}
                Dc2Data={Dc2Data}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transportation_Decision;
