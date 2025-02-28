import React, { useContext, useState, useEffect } from "react";
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
  Text,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import InfoButton from "../Components/InfoButton";
import StatusBar from "./StatusBar";
import { submitDecisionStatus } from "./DecisionSubmit";

const Distribution_Decision = () => {
  const { api } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSimData =
    JSON.parse(localStorage.getItem("selectedSimData")) || [];
  const currentQuarter = selectedSimData[0]?.current_quarter || 1;
  const simulation_id = selectedSimData[0]?.simulation_id;

  const firm_data = Object.keys(selectedSimData[0]?.firm_data || {})[0] || "";
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);
  const [isLoadingLastQuarter, setIsLoadingLastQuarter] = useState(false);
  const [DistributionData, setDistributionData] = useState({});
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    distribution_center: { region1: "", region2: "0", region3: "0" },
    rfid: { region1: "0", region2: "0", region3: "0" },
    emergency_carrier: { region1: "I", region2: "I", region3: "I" },
    cross_docking: {
      carrier_k: { region1: "0", region2: "0", region3: "0" },
      carrier_l: { region1: "0", region2: "0", region3: "0" },
      carrier_m: { region1: "0", region2: "0", region3: "0" },
      carrier_n: { region1: "0", region2: "0", region3: "0" },
    },
    fgi_surface_shipping: { region1: "1", region2: "1", region3: "1" },
    sac_surface_shipping: { region1: "2", region2: "2", region3: "2" },
  });

  const handleInputChange = (category, region, value, carrier = null) => {
    setValues((prevValues) => {
      if (carrier) {
        return {
          ...prevValues,
          [category]: {
            ...prevValues[category],
            [carrier]: {
              ...prevValues[category][carrier],
              [region]: value,
            },
          },
        };
      } else {
        return {
          ...prevValues,
          [category]: {
            ...prevValues[category],
            [region]: value,
          },
        };
      }
    });
  };

  const toast = useToast();
  const navigate = useNavigate();
  let firm_key_new = "";

  if (selectedSimData.length && selectedSimData[0]?.firm_data?.length) {
    const firm_obj = selectedSimData[0].firm_data.filter((item) =>
      item.emails.includes(user.email)
    );
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  useEffect(() => {
    if (selectedQuarter) {
      setLoading(true);
      getDistribution().finally(() => setLoading(false));
    }
  }, [selectedQuarter]);

  useEffect(() => {
    if (DistributionData && Object.keys(DistributionData).length) {
      setValues({
        distribution_center: DistributionData.distribution_center || {},
        rfid: DistributionData.rfid || {},
        emergency_carrier: DistributionData.emergency_carrier || {},
        cross_docking: DistributionData.cross_docking || {},
        fgi_surface_shipping: DistributionData.fgi_surface_shipping || {},
        sac_surface_shipping: DistributionData.sac_surface_shipping || {},
      });
    }
  }, [DistributionData]);

  const getDistribution = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSimData[0].simulation_id,
          admin_id: selectedSimData[0].admin_id,
          current_decision: "Distribution",
          current_quarter: selectedQuarter,
          firm_key: firm_key_new,
        },
      });
      setDistributionData(response.data || {});
      localStorage.setItem("DistributionData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error making GET request:", error);
      setDistributionData({});
    }
  };

  const loadPreviousQuarter = async () => {
    if (currentQuarter <= 1) return;

    const previousQuarter = currentQuarter - 1;
    setIsLoadingLastQuarter(true);
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSimData[0].simulation_id,
          admin_id: selectedSimData[0].admin_id,
          current_decision: "Distribution",
          current_quarter: previousQuarter,
          firm_key: firm_key_new,
        },
      });

      const previousData = response.data;
      setDistributionData(previousData);
      toast({
        title: `Loaded data from Quarter ${previousQuarter}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error loading previous quarter data:", error);
      toast({
        title: "Failed to load previous quarter data",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setIsLoadingLastQuarter(false);
    }
  };

  const validateInputs = () => {
    const requiredFields = [
      "distribution_center",
      "rfid",
      "emergency_carrier",
      "fgi_surface_shipping",
      "sac_surface_shipping",
    ];
    for (const field of requiredFields) {
      if (!values[field] || Object.keys(values[field]).length === 0) {
        toast({
          title: "Validation Error",
          description: `Please fill all the required fields for ${field}.`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return false;
      }
    }
    return true;
  };

  const submitDistribution = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${api}/decision/distribution/`, {
        simulation_id: selectedSimData[0].simulation_id,
        admin_id: selectedSimData[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSimData[0].current_quarter,
        distribution_center: values.distribution_center,
        rfid: values.rfid,
        emergency_carrier: values.emergency_carrier,
        cross_docking: values.cross_docking,
        fgi_surface_shipping: values.fgi_surface_shipping,
        sac_surface_shipping: values.sac_surface_shipping,
      });

      await submitDecisionStatus(
        api,
        "distribution",
        selectedSimData,
        firm_key_new,
        currentQuarter
      );
      console.log("POST request successful", response.data);
      getDistribution();
      toast({
        title: "Distribution Submitted Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error making POST request: Distribution", error);
      toast({
        title: "Error submitting distribution decision",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ fontFamily: "ABeeZee" }}>
        <StatusBar
          simulation_id={simulation_id}
          firm_key={firm_key_new}
          quarter={currentQuarter}
          api={api}
          current={"Distribution"}
        />

        <div className="sm:grid grid-cols-1 gap-3 m-1">
          <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow px-2">
            <InfoImg decision={"Distribution"} />
            <div className="flex items-center justify-between w-full ">
              <div className="flex items-center pl-5 pt-2 pb-2 ">
                <Text>Load data Quarterly</Text>
                <div className="pl-4 flex space-x-4 ">
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

              <div
                className="font-bold py-0 px-4 text-red-400 cursor-pointer text-3xl"
                disabled={isLoadingLastQuarter || currentQuarter <= 1}
                title="To load inputs from the previous quarter"
              >
                {isLoadingLastQuarter ? (
                  <Spinner size="sm" />
                ) : (
                  <i
                    class="fa fa-stack-overflow mr-2 "
                    onClick={loadPreviousQuarter}
                    aria-hidden="true"
                  ></i>
                )}
                <InfoButton decision="Distribution" />
              </div>
            </div>

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
              <Box className="ml-4 mr-4">
                <Table
                  id="Distribution-production-table"
                  variant="simple"
                  bg="white"
                  mt="4"
                  className="rounded-md"
                >
                  <Thead className="bg-gray-100 text-gray-700 font-semibold">
                    <Tr>
                      <Th style={{ color: "#D10000" }}> Distribution </Th>
                      {["region1", "region2", "region3"].map((region, idx) => (
                        <Th key={idx}>
                          {
                            selectedSimData[0]?.renamedMappedData?.RegionMapp?.[
                              region
                            ]
                          }
                        </Th>
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
                            <Select
                              value={values.distribution_center?.[region] || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "distribution_center",
                                  region,
                                  e.target.value
                                )
                              }
                            >
                              <option value="0">None (0)</option>
                              <option value="1">Outsourced (1)</option>
                              <option value="2">Owned (2)</option>
                            </Select>
                          )}
                        </Td>
                      ))}
                    </Tr>

                    {/* RFID Application Row */}
                    <Tr>
                      <Th>RFID Application {`{0=outsourced | 1=insourced}`}</Th>
                      {["region1", "region2", "region3"].map((region) => (
                        <Td key={region}>
                          <Select
                            value={values.rfid?.[region] || ""}
                            onChange={(e) =>
                              handleInputChange("rfid", region, e.target.value)
                            }
                          >
                            <option value="0">Outsourced (0)</option>
                            <option value="1">Insourced (1)</option>
                          </Select>
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
                            <Select
                              value={values.emergency_carrier?.[region] || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  "emergency_carrier",
                                  region,
                                  e.target.value
                                )
                              }
                            >
                              <option value="I">Carrier I</option>
                              <option value="J">Carrier J</option>
                              <option value="K">Carrier K</option>
                              <option value="L">Carrier L</option>
                              <option value="M">Carrier M</option>
                              <option value="N">Carrier N</option>
                            </Select>
                          )}
                        </Td>
                      ))}
                    </Tr>
                    {/* Cross-Docking Rows */}
                    {["carrier_k", "carrier_l", "carrier_m", "carrier_n"].map(
                      (carrier, idx) => (
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
                                <Select
                                  value={
                                    values.cross_docking?.[carrier]?.[region] ||
                                    ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      "cross_docking",
                                      region,
                                      e.target.value,
                                      carrier
                                    )
                                  }
                                >
                                  <option value="0">No (0)</option>
                                  <option value="1">Yes (1)</option>
                                </Select>
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
                            // Render a blank space for region1
                            <span>&nbsp;</span>
                          ) : (
                            <Select
                              value={
                                values.fgi_surface_shipping?.[region] || ""
                              }
                              onChange={(e) =>
                                handleInputChange(
                                  "fgi_surface_shipping",
                                  region,
                                  e.target.value
                                )
                              }
                            >
                              <option value="1">Economy (1)</option>
                              <option value="2">Standard (2)</option>
                              <option value="3">Expedited (3)</option>
                            </Select>
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
                          <Select
                            value={values.sac_surface_shipping?.[region] || ""}
                            onChange={(e) =>
                              handleInputChange(
                                "sac_surface_shipping",
                                region,
                                e.target.value
                              )
                            }
                          >
                            <option value="1">Economy (1)</option>
                            <option value="2">Standard (2)</option>
                            <option value="3">Expedited (3)</option>
                          </Select>
                        </Td>
                      ))}
                    </Tr>
                  </Tbody>
                </Table>
              </Box>
            )}

            <div className="flex justify-end mt-4">
              <Button
                id="Distribution-submit-button"
                onClick={submitDistribution}
                colorScheme="red"
                disabled={loading}
                isLoading={loading}
                loadingText="Submitting"
              >
                Submit Distribution
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distribution_Decision;
