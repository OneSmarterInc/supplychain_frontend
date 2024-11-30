import React, { useContext, useEffect, useState } from "react";
import RawMaterial from "../Components/RawMaterial";
import SupplyChainTable from "../Components/SupplyChainTable";
import InfoImg from "../Components/InfoImg";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { Text, useToast, Spinner, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import InfoButton from "../Components/InfoButton";
import StatusBar from "./StatusBar";
import { submitDecisionStatus } from "./DecisionSubmit";


const Procurement_Decisions = () => {
  const { api } = useContext(MyContext);
  const [updatedDCData, setUpdatedDCData] = useState([]);
  const [alpha_quantity, setAlpha_quantity] = useState("");
  const [beta_quantity, setBeta_quantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoadingLastQuarter, setIsLoadingLastQuarter] = useState(false);
  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData")) || [];
  const sel = JSON.parse(localStorage.getItem("selectedSim")) || [];
  const currentQuarter = selectedSimData[0]?.current_quarter || 1;
  const simulation_id = selectedSimData[0]?.simulation_id;

  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const selectedSim = selectedSimData;
  const firm_data = selectedSim[0]?.firm_data ? Object.keys(selectedSim[0].firm_data)[0] : null;

  let firm_key_new = "";
  if (Array.isArray(selectedSim[0]?.firm_data)) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  const toast = useToast();
  const navigate = useNavigate();
  const [data, setData] = useState({});


  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Start loading before fetching procurement data
      await getProcurement(); // Fetch the data
      setLoading(false); // Stop loading after data is fetched
    };

    loadData();
  }, [selectedQuarter]); // Only re-run when `selectedQuarter` changes

  const getProcurement = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0]?.simulation_id || "",
          admin_id: selectedSim[0]?.admin_id || "",
          current_decision: "Procurement",
          current_quarter: selectedQuarter,
          firm_key: firm_key_new,
        },
      });

      console.log("API Response:", response.data);
      localStorage.setItem("procurementData", JSON.stringify(response.data));
      setData(response.data);
    } catch (error) {
      // Clear state and local storage on error
      localStorage.removeItem("procurementData");
      setData({});

      // Reset input fields
      setAlpha_quantity("");
      setBeta_quantity("");
      setUpdatedDCData([]);

      console.error("Error making GET request:", error.response ? error.response.data : error.message);
    }
  };


  const loadPreviousQuarter = async () => {
    if (currentQuarter <= 1) return; // Prevent loading if it's the first quarter

    const previousQuarter = currentQuarter - 1;
    setIsLoadingLastQuarter(true);

    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0]?.simulation_id || "",
          admin_id: selectedSim[0]?.admin_id || "",
          current_decision: "Procurement",
          current_quarter: previousQuarter, // Fetch second-last quarter's data
          firm_key: firm_key_new,
        },
      });

      if (response?.data) {
        // Set data from the second-last quarter to the current quarter
        setSelectedQuarter(currentQuarter); // Set the current quarter
        setData(response.data); // Update the current quarter's data with the second-last quarter's data
        localStorage.setItem("procurementData", JSON.stringify(response.data));


        toast({
          title: `Loaded data from Quarter ${previousQuarter} into Quarter ${currentQuarter}`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
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
      setIsLoadingLastQuarter(false); // Always set loading to false when done
    }
  };



  const submitProcurement = async () => {
    if (!alpha_quantity) {
      alert("Units for Alpha cannot be empty");
      return;
    }
    if (!beta_quantity) {
      alert("Units for Beta cannot be empty");
      return;
    }

    setLoading(true); // Start loading on submit
    try {
      const response = await axios.post(`${api}/decision/procurement/`, {
        simulation_id: selectedSim[0]?.simulation_id || "",
        admin_id: selectedSim[0]?.admin_id || "",
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedQuarter,
        alpha_quantity: Number(alpha_quantity),
        beta_quantity: Number(beta_quantity),
        sac_units: updatedDCData,
      });

      await submitDecisionStatus(
        api,
        "procurement",
        selectedSimData,
        firm_key_new,
        currentQuarter,
      );
      console.log("POST request successful", response.data);
      getProcurement();
      addUserLogger();
      toast({
        title: "Procurement Submitted Successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });

    } catch (error) {
      console.error("Error making POST request:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Stop loading after submission
    }
  };

  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0]?.simulation_id || "",
        admin_id: selectedSim[0]?.admin_id || "",
        decision: "Procurement",
        action: "created",
        ip_address: "123.345.1",
        username: user.first_name + " " + user.last_name,
        firm_key: firm_key_new,
        current_quarter: selectedQuarter,
      });
      console.log("addUserLoggerData", response.data);
    } catch (error) {
      console.error("Error making POST request:", error.response ? error.response.data : error.message);
    }
  };

  document.body.style.backgroundColor = "#e0e2e4";

  return (
    <div style={{ fontFamily: "ABeeZee" }} className="h-full">
      <StatusBar simulation_id={simulation_id} firm_key={firm_key_new} quarter={currentQuarter} api={api} current={"Procurement"} />
      <div className="sm:grid grid-cols-1 gap-3 m-1 ">
        <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow px-2">
          <InfoImg decision={"Procurement"} />
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
                      className={`flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-gray-100 text-gray-700 cursor-pointer ${selectedQuarter === i + 1
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
              className="flex items-center font-bold py-0 px-4 text-red-400 cursor-pointer text-3xl"
              disabled={isLoadingLastQuarter || currentQuarter <= 1}
            >
              {/* Wrapper for the first icon with the hover title */}
              <div
                className="flex items-center"
                title="To load inputs from the previous quarter"
              >
                {isLoadingLastQuarter ? (
                  <Spinner size="sm" />
                ) : (
                  <i
                    className="fa fa-stack-overflow mr-2"
                    onClick={loadPreviousQuarter}
                    aria-hidden="true"
                  ></i>
                )}
              </div>

              {/* Second icon without title */}
              <InfoButton decision="Procurement" />
            </div>

          </div>


          {/* Show Spinner while loading */}
          {loading || isLoadingLastQuarter ? (
            <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
              <Spinner size="xl" />
            </Box>
          ) : (
            <>
              <RawMaterial
                procurementData1={JSON.stringify(data)}
                setAlpha_quantity={setAlpha_quantity}
                setBeta_quantity={setBeta_quantity}
              />
              <div className="rounded-lg -2xl h-100vh flex flex-col justify-center">
                <SupplyChainTable setUpdatedDCData={setUpdatedDCData} />
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={submitProcurement}
              id="procurement-submit"
              className={`${selectedQuarter === currentQuarter && !loading
                ? "bg-red-500 hover:bg-black-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={selectedQuarter !== currentQuarter || loading}
            >
              {loading ? <Spinner size="sm" /> : "Submit Procurement"} {/* Show Spinner on button */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Procurement_Decisions;