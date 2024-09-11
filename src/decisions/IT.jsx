import React, { useContext, useEffect, useState } from "react";
import InfoImg from "../Components/InfoImg";
import IT_suppliers from "../Components/IT_suppliers";
import { HStack, Select, useToast, Text, Box, Spinner } from "@chakra-ui/react";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import InfoButton from "../Components/InfoButton";

const IT = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData"));
  const [reportValues, setReportValues] = useState();
  const [suppliers, setSuppliers] = useState({});
  const [ItData, setItData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoadingLastQuarter, setIsLoadingLastQuarter] = useState(false); // New state for previous quarter loading
  const currentQuarter = selectedSimData[0]?.current_quarter || 1;
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);
  const { api } = useContext(MyContext);
  const toast = useToast();
  const navigate = useNavigate();

  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item) => item.emails.includes(user.email));
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  useEffect(() => {
    setLoading(true);
    getIt().finally(() => setLoading(false));
  }, [selectedQuarter]);

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
      setItData(response.data);
      localStorage.setItem("ItData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error making GET request:", error);
      // toast({
      //   title: "Error fetching IT data",
      //   description: error.message || "Something went wrong while fetching IT data.",
      //   status: "error",
      //   duration: 9000,
      //   isClosable: true,
      //   position: "top",
      // });
    }
  };

  // Load previous quarter data
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
      setItData(previousData); // Set previous quarter's data
      toast({
        title: `Loaded data from Quarter ${previousQuarter}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error loading previous quarter data:", error);
      // toast({
      //   title: "Failed to load previous quarter data",
      //   status: "error",
      //   duration: 3000,
      //   isClosable: true,
      //   position: "top",
      // });
    } finally {
      setIsLoadingLastQuarter(false);
    }
  };

  // Validate suppliers input before submission
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
    if (!validateSuppliers()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${api}/decision/it/`, {
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSim[0].current_quarter,
        sync_a: suppliers.A,
        sync_b: suppliers.B,
        sync_c: suppliers.C,
        sync_d: suppliers.D,
        sync_e: suppliers.E,
        sync_f: suppliers.F,
        sync_g: suppliers.G,
      });
      getIt();
      addUserLogger();
      toast({
        title: "IT Submission successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/usersidelive");
    } catch (error) {
      console.error("Error making POST request: IT", error);
      toast({
        title: "Error submitting IT decision",
        description: error.message || "Something went wrong while submitting the IT decision.",
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
      <div className="sm:grid grid-cols-1 gap-3 m-1">
        <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow">
          <InfoImg decision={"IT"} />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center pl-5 pt-2 pb-2">
              <Text>Load data Quarterly</Text>
              <div className="pl-4 flex space-x-4">
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
            <InfoButton decision="IT" />
          </div>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <IT_suppliers ItData={ItData} setSuppliersFromDecision={setSuppliers} />
            </>
          )}

          <div className="flex justify-between mt-4">
            <div
              onClick={loadPreviousQuarter}
              className="font-bold py-2 px-4 text-red-400 cursor-pointer"
              disabled={isLoadingLastQuarter || currentQuarter <= 1}
            >
              <span className="text-black">To load inputs from the previous quarter, </span>
              {isLoadingLastQuarter ? <Spinner size="sm" /> : "Click here!"}
            </div>
            <button
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