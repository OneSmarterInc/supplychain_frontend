import React, { useContext, useEffect, useState } from "react";
import InfoImg from "../Components/InfoImg";
import IT_suppliers from "../Components/IT_suppliers";
import { HStack, Select, useToast, Text, Box, Spinner } from "@chakra-ui/react";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import InfoButton from "../Components/InfoButton";
import { submitDecisionStatus } from "./DecisionSubmit";
import StatusBar from "./StatusBar";

const IT = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData"));
  const [suppliers, setSuppliers] = useState({});
  const [careers, setCareers] = useState({});
  const [reportDecision, setReportDecision] = useState({
    "Procurement Transactions Report?": "",
    "Product Cost Report?": "",
    "Replacement Parts Demand Report?": "",
    "Retail Pipeline Report?": "",
    "Transportation Cost Report?": "",
    "Transportation Report?": "",
  });
  const [ItData, setItData] = useState({});
  const [simulation, setSimulation] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoadingLastQuarter, setIsLoadingLastQuarter] = useState(false);
  const currentQuarter = selectedSimData[0]?.current_quarter || 1;
  const simulation_id = selectedSimData[0]?.simulation_id;

  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);
  const { api } = useContext(MyContext);
  const toast = useToast();
  const navigate = useNavigate();

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

  useEffect(() => {
    setLoading(true);
    getIt().finally(() => setLoading(false));
  }, [selectedQuarter]);
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
  const getIt = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "It",
          current_quarter: selectedQuarter,
          firm_key: firm_key_new,
        },
      });
      const { careers: careersData, ...itData } = response.data;
      setItData(itData);
      setCareers(careersData || {});
      setReportDecision({
        "Procurement Transactions Report?": itData.ptr ? "Yes" : "No",
        "Product Cost Report?": itData.pcr ? "Yes" : "No",
        "Replacement Parts Demand Report?": itData.rpdr ? "Yes" : "No",
        "Retail Pipeline Report?": itData.rpr ? itData.rpr : "No",
        "Transportation Cost Report?": itData.tcr ? "Yes" : "No",
        "Transportation Report?": itData.tr ? "Yes" : "No",
      });
      localStorage.setItem("ItData", JSON.stringify(itData));
    } catch (error) {
      console.error(
        "Error making GET request:",
        error.response ? error.response.data : error.message
      );
      localStorage.removeItem("ItData");
      setItData({});
      setSuppliers({});
      setCareers({});
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
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "It",
          current_quarter: previousQuarter,
          firm_key: firm_key_new,
        },
      });

      const previousData = response.data;
      setItData(previousData);
      toast({
        title: `Loaded data from Quarter ${previousQuarter}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error loading previous quarter data:", error);
    } finally {
      setIsLoadingLastQuarter(false);
    }
  };

  const validateSuppliers = () => {
    const requiredFields = ["A", "B", "C", "D", "E", "F", "G"];
    for (let field of requiredFields) {
      if (!suppliers[field]) {
        toast({
          title: "Validation Error",
          description: `Please fill all the required fields. Missing value for: ${field}`,
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

  const submitIt = async () => {
    // if (!validateSuppliers()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${api}/decision/it/`, {
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: simulation[0].current_quarter,
        sync_a: suppliers.A,
        sync_b: suppliers.B,
        sync_c: suppliers.C,
        sync_d: suppliers.D,
        sync_e: suppliers.E,
        sync_f: suppliers.F,
        sync_g: suppliers.G,

        sync_i: careers.I,
        sync_j: careers.J,
        sync_k: careers.K,
        sync_l: careers.L,
        sync_m: careers.M,
        sync_n: careers.N,
        // Convert "Yes" to true, otherwise false
        ptr: reportDecision["Procurement Transactions Report?"] === "Yes",
        pcr: reportDecision["Product Cost Report?"] === "Yes",
        rpdr: reportDecision["Replacement Parts Demand Report?"] === "Yes",
        rpr:
          reportDecision["Retail Pipeline Report?"] === "1" ||
          reportDecision["Retail Pipeline Report?"] === "2"
            ? parseInt(reportDecision["Retail Pipeline Report?"], 10) // Convert "1" or "2" to number
            : 0, // Default to 0 if not selected
        tcr: reportDecision["Transportation Cost Report?"] === "Yes",
        tr: reportDecision["Transportation Report?"] === "Yes",
      });

      await submitDecisionStatus(
        api,
        "it",
        selectedSimData,
        firm_key_new,
        simulation[0].current_quarter
      );
      addUserLogger();
      toast({
        title: "IT Submission successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/Forecast");
    } catch (error) {
      console.error("Error making POST request: IT", error);
      toast({
        title: "Error submitting IT decision",
        description:
          error.message ||
          "Something went wrong while submitting the IT decision.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        decision: "It",
        action: "created",
        ip_address: "123.345.1",
        username: user.first_name + " " + user.last_name,
        firm_key: firm_key_new,
        current_quarter: selectedSim[0].current_quarter,
      });
      console.log("addUserLoggerData", response.data);
    } catch (error) {
      console.error("Error making POST request for user logger:", error);
    }
  };

  return (
    <div style={{ fontFamily: "ABeeZee" }}>
      <StatusBar
        simulation_id={simulation_id}
        firm_key={firm_key_new}
        quarter={currentQuarter}
        api={api}
        current={"IT"}
      />

      <div className="sm:grid grid-cols-1 gap-3 m-1">
        <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow">
          <InfoImg decision={"IT"} id="quarter-deadline" id2="course-details" />
          <div className="flex items-center justify-between w-full">
            <div
              className="flex items-center pl-5 pt-2 pb-2"
              id="it-button-load-quarters"
            >
              <Text>Load data Quarterly</Text>
              <div className="pl-4 flex space-x-4">
                {Array.from(
                  { length: simulation[0]?.current_quarter || 0 },
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
              <InfoButton decision="IT" />
            </div>
          </div>
          <div
            id="Load-Previous-Quarter"
            onClick={loadPreviousQuarter}
            className="font-bold py-2 px-4 text-red-400 cursor-pointer"
            disabled={isLoadingLastQuarter || currentQuarter <= 1}
          >
            <span className="text-black">
              To load inputs from the previous quarter,{" "}
            </span>
            {isLoadingLastQuarter ? <Spinner size="sm" /> : "Click here!"}
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
            <>
              <IT_suppliers
                id1="IT-Synchronization-with-Suppliers"
                id2="IT-Synchronization-with-Careers"
                ItData={ItData}
                CareersData={careers}
                setSuppliersFromDecision={setSuppliers}
                setCareersFromDecision={setCareers}
              />
            </>
          )}
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
            <>
              <div className="flex flex-col border border-gray rounded-lg items-center justify-center mt-4">
                <Text className="text-xl font-bold mt-3">Reports</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mt-4 mb-4">
                  {Object.keys(reportDecision).map((report) => (
                    <div key={report} className="flex flex-col items-center">
                      <Text className="text-lg font-bold">{report}</Text>
                      <Select
                        id={report.replace(/\s+/g, "-")}
                        value={reportDecision[report]}
                        onChange={(e) =>
                          setReportDecision({
                            ...reportDecision,
                            [report]: e.target.value,
                          })
                        }
                        className="w-3/4"
                      >
                        <option value="">Select</option>
                        {report === "Retail Pipeline Report?" ? (
                          <>
                            <option value="0">No Report</option>
                            <option value="1">Previous Month (Option 1)</option>
                            <option value="2">Current Month (Option 2)</option>
                          </>
                        ) : (
                          <>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </>
                        )}
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          <div className="flex justify-end mt-4">
            <button
              id="Submit-Service"
              onClick={submitIt}
              className={`${
                selectedQuarter === currentQuarter && !loading
                  ? "bg-red-500 hover:bg-black-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={selectedQuarter !== currentQuarter || loading}
            >
              {loading ? <Spinner size="sm" /> : "Submit IT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IT;
