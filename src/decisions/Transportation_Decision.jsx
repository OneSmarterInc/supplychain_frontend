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
  Spinner, // Import Spinner from Chakra UI
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InfoImg from "../Components/InfoImg";
import InfoButton from "../Components/InfoButton";
import MyContext from "../Components/ContextApi/MyContext";
import { submitDecisionStatus } from "./DecisionSubmit";
import StatusBar from "./StatusBar";
import { use } from "react";

const defaultDc2Data = {
  product0: {
    surface: { I: "", J: "", K: "", L: "", M: "", N: "" },
    air: { I: "", J: "", K: "", L: "", M: "", N: "" },
  },
  product1: {
    surface: { I: "", J: "", K: "", L: "", M: "", N: "" },
    air: { I: "", J: "", K: "", L: "", M: "", N: "" },
  },
  product2: {
    surface: { I: "", J: "", K: "", L: "", M: "", N: "" },
    air: { I: "", J: "", K: "", L: "", M: "", N: "" },
  },
};

const defaultDc3Data = {
  product0: {
    surface: { I: "", J: "", K: "", L: "", M: "", N: "" },
    air: { I: "", J: "", K: "", L: "", M: "", N: "" },
  },
  product1: {
    surface: { I: "", J: "", K: "", L: "", M: "", N: "" },
    air: { I: "", J: "", K: "", L: "", M: "", N: "" },
  },
  product2: {
    surface: { I: "", J: "", K: "", L: "", M: "", N: "" },
    air: { I: "", J: "", K: "", L: "", M: "", N: "" },
  },
};

const Transportation_Decision = () => {
  const { api } = useContext(MyContext);
  const [TransportationData, setTransportationData] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [simulation, setSimulation] = useState({});
  const [Dc2Data, setDc2Data] = useState(defaultDc2Data);
  const [Dc3Data, setDc3Data] = useState(defaultDc3Data);
  const [loading, setLoading] = useState(false); // Add loading state
  const toast = useToast();
  const navigate = useNavigate();

  const selectedSimData =
    JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const currentQuarter = selectedSimData[0]?.current_quarter || 1;
  const simulation_id = selectedSimData[0]?.simulation_id;

  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);

  useEffect(() => {
    setLoading(true); // Start loading before fetching transportation data
    getTransportation().finally(() => setLoading(false)); // Stop loading after data is fetched
  }, [selectedQuarter]);

  useEffect(() => {
    if (TransportationData) {
      if (TransportationData.flag_dc2) {
        setDc2Data(TransportationData.dc_two || defaultDc2Data);
      }
      if (TransportationData.flag_dc3) {
        setDc3Data(TransportationData.dc_three || defaultDc3Data);
      }
    }
  }, [TransportationData]);

  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item) =>
      item.emails.includes(user.email)
    );
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
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

  const getSimulation = async () => {
    try {
      const response = await axios.get(
        `${api}/getsim/${selectedSim[0].simulation_id}`
      );
      setSimulation(response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  useEffect(() => {
    getSimulation();
  }, []);
  const getTransportation = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Transportation",
          current_quarter: selectedQuarter,
          firm_key: firm_key_new,
        },
      });
      setTransportationData(response.data);
      localStorage.setItem("TransportationData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const submitTransportation = async () => {
    setLoading(true); // Start loading on submit
    try {
      const response = await axios.post(`${api}/decision/transportation/`, {
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: simulation[0]?.current_quarter,
        dc_two: Dc2Data,
        dc_three: Dc3Data,
      });

      await submitDecisionStatus(
        api,
        "transport",
        selectedSimData,
        firm_key_new,
        simulation[0]?.current_quarter
      );
      addUserLogger();
      toast({
        title: "Transportation data submitted successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/Demand");
    } catch (error) {
      console.error("Error making POST request: Transportation", error);
    } finally {
      setLoading(false); // Stop loading after submission
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
        username: `${user.first_name} ${user.last_name}`,
        firm_key: firm_key_new,
        current_quarter: selectedSim[0].current_quarter,
      });
      console.log("addUserLoggerData", response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const renderTable = (data, setDataFunc, title) => {
    const productMapping = {
      product0: "Product 0",
      product1:
        selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.hyperware ||
        "Product 1",
      product2:
        selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.metaware ||
        "Product 2",
    };

    return (
      <Box className="overflow-x-auto rounded-l rounded-r">
        <Text className="p-2 font-semibold text-lg bg-gray-300 text-black-500 flex items-center justify-center">
          <span className="flex-grow text-left pl-4">{title}</span>
        </Text>
        <Table className="min-w-full bg-white rounded-md shadow-md">
          <Thead className="bg-gray-100 text-gray-700">
            <Tr>
              <Th className="py-2 px-4">Products</Th>
              {Object.keys(data.product0.surface).map((carrier) => (
                <Th key={carrier} className="py-2 px-4" textAlign="center">
                  Carrier <span className="text-red-500">{carrier}</span>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(data).map(([product, shipmentTypes]) =>
              Object.entries(shipmentTypes).map(([shipmentType, carriers]) => (
                <Tr key={`${product}-${shipmentType}`}>
                  <Td className="py-0 px-0">
                    {productMapping[product]}
                    <br />
                    <span className="text-red-500">
                      {shipmentType.charAt(0).toUpperCase() +
                        shipmentType.slice(1)}
                    </span>
                  </Td>
                  {Object.keys(carriers).map((carrier) => (
                    <Td key={carrier} className="py-0 px-0">
                      <Input
                        className="border-gray-300 text-center rounded-sm focus:ring focus:ring-blue-200 p-0"
                        value={carriers[carrier]}
                        placeholder="Enter Units "
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
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    );
  };

  return (
    <div style={{ fontFamily: "ABeeZee" }}>
      <StatusBar
        simulation_id={simulation_id}
        firm_key={firm_key_new}
        quarter={currentQuarter}
        api={api}
        current={"Transport"}
      />

      <div className="sm:grid grid-cols-1 gap-3 m-1">
        <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow">
          <InfoImg
            decision={"Transport"}
            id="quarter-deadline"
            id2="course-details"
          />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center pl-5 pt-2 pb-2">
              <Text>Load data Quarterly</Text>
              <div className="pl-4 flex space-x-4" id="it-button-load-quarters">
                {Array.from(
                  { length: selectedSimData[0]?.current_quarter || 0 },
                  (_, i) => (
                    <div
                      key={i + 1}
                      onClick={() => setSelectedQuarter(i + 1)}
                      className={`flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-gray-100 text-gray-700 cursor-pointer ${
                        selectedQuarter === i + 1
                          ? "bg-red-500 border-red-500 text-white"
                          : ""
                      }`}
                    >
                      {i + 1}
                    </div>
                  )
                )}
              </div>
            </div>
            <div id="info">
              <InfoButton decision="Transport" />
            </div>
          </div>

          {/* Show Spinner while loading */}
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={4}
            >
              <Spinner size="xl" />
            </Box>
          ) : (
            <div className="flex gap-1 m-1">
              <div className="m-2 min-w-[700px] rounded-2xl bg-white p-2 flex flex-col space-y-4 justify-start">
                {TransportationData?.flag_dc2 &&
                  renderTable(
                    Dc2Data ? Dc2Data : defaultDc2Data,
                    setDc2Data,
                    "DC 2"
                  )}
                {TransportationData?.flag_dc3 &&
                  renderTable(
                    Dc3Data ? Dc3Data : defaultDc3Data,
                    setDc3Data,
                    "DC 3"
                  )}
                {!(
                  TransportationData?.flag_dc3 || TransportationData?.flag_dc2
                ) && (
                  <div
                    style={{
                      padding: "20px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                    }}
                  >
                    <h2
                      style={{
                        color: "#333",
                        fontSize: "24px",
                        fontWeight: "bold",
                        marginBottom: "12px",
                      }}
                    >
                      No Distribution Center Available
                    </h2>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      Since your firm does not own a distribution center in this
                      market region, all orders will be serviced from the
                      distribution center associated with your manufacturing
                      plant in Market Region 1.
                    </p>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      To ensure prompt delivery within the current month, your
                      firm will ship via air, which incurs higher transportation
                      costs.
                    </p>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      Please note that shipping costs are significantly higher
                      when servicing from a distant DC, especially for
                      direct-channel orders (Channel 2), which involve smaller
                      quantities and therefore higher per-unit costs.
                    </p>
                    <p
                      style={{
                        color: "#555",
                        fontSize: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      Consider establishing a local DC in this region in the
                      future to reduce costs and improve service levels.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              id="Submit-Service"
              onClick={submitTransportation}
              className={`${
                selectedSim[0].current_quarter && !loading
                  ? "bg-red-500 hover:bg-black-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={!selectedSim[0].current_quarter || loading}
            >
              {loading ? <Spinner size="sm" /> : "Submit Transportation"}{" "}
              {/* Show Spinner on button */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transportation_Decision;
