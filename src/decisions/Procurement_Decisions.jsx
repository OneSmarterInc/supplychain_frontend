import React, { useContext, useEffect, useState } from "react";
import RawMaterial from "../Components/RawMaterial";
import SupplyChainTable from "../Components/SupplyChainTable";
import InfoImg from "../Components/InfoImg";
// import DataChart from "../Components/DataChart";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

import { Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import InfoButton from "../Components/InfoButton";

const Procurement_Decisions = () => {
  const { api } = useContext(MyContext);
  const [updatedDCData, setUpdatedDCData] = useState();
  const [alpha_quantity, setAlpha_quantity] = useState({});
  const [beta_quantity, setBeta_quantity] = useState({});

  
  const selectedSimData = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const currentQuarter = selectedSimData[0]?.current_quarter || 1; // Assuming the current quarter is provided in the sim data
  const [selectedQuarter, setSelectedQuarter] = useState(currentQuarter); // Set the default to the current quarter

  const user = JSON.parse(localStorage.getItem("user")) || {};
  const selectedSim = selectedSimData;
  const firm_data = selectedSim[0]?.firm_data ? Object.keys(selectedSim[0].firm_data)[0] : null;

  let firm_key_new = "";
  if (Array.isArray(selectedSim[0]?.firm_data)) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; // Only one user in one firm, so using firm_obj[0]
    }
  }
  const toast = useToast();

  useEffect(() => {
    getProcurement();
  }, []);




  const [data, setData] = useState({});

  const getProcurement = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0]?.simulation_id || "",
          admin_id: selectedSim[0]?.admin_id || "",
          current_decision: "Procurement",
          current_quarter: selectedSim[0]?.current_quarter || 0,
          firm_key: firm_key_new,
        },
      });

      localStorage.setItem("procurementData", JSON.stringify(response.data));
      setData(response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const navigate = useNavigate();

  const submitProcurement = async () => {
    try {
      if (!alpha_quantity) {
        alert("Units for Alpha cannot be empty");
        return;
      }
      if (!beta_quantity) {
        alert("Units for Beta cannot be empty");
        return;
      }

      const response = await axios.post(`${api}/decision/procurement/`, {
        simulation_id: selectedSim[0]?.simulation_id || "",
        admin_id: selectedSim[0]?.admin_id || "",
        user_id: user.userid,
        firm_key: firm_key_new,
        quarter: selectedSim[0]?.current_quarter || 0,
        alpha_quantity: Number(alpha_quantity),
        beta_quantity: Number(beta_quantity),
        sac_units: updatedDCData,
      });
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
      navigate("/Manufacture");
    } catch (error) {
      console.error("Error making POST request:", error);
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
        username: user.username,
        firm_key: firm_key_new,
        current_quarter: selectedSim[0]?.current_quarter || 0,
      });
      console.log("addUserLoggerData", response.data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  document.body.style.backgroundColor = "#e0e2e4";

  return (
    <div style={{ fontFamily: "ABeeZee", height:'100vh' }}>
     

     <div className="sm:grid grid-cols-1 gap-3 m-1 ">
        <div className="m-3 rounded-2xl bg-white p-2 flex flex-col justify-start custom-shadow px-2">
          <InfoImg decision={"Procurement"} />
          <div className="flex items-center justify-between w-full">
          <div className="flex items-center pl-5 pt-2 pb-2">
              <Text>Load data Quarterly</Text>
              <div className=" pl-4 flex space-x-4">
                {Array.from(
                  { length: selectedSimData[0]?.current_quarter || 0 },
                  (_, i) => (
                    <div
                      key={i + 1}
                      onClick={() => setSelectedQuarter(i + 1)}
                      className={`flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 bg-gray-100 text-gray-700 cursor-pointer ${selectedQuarter === i + 1 ? "bg-red-500 border-red-500 text-white" : ""
                        }`}
                    >
                      {i + 1}
                    </div>
                  )
                )}
              </div>
            </div>
            <InfoButton />
          </div>
          <RawMaterial
              procurementData1={JSON.stringify(data)}
              setAlpha_quantity={setAlpha_quantity}
              setBeta_quantity={setBeta_quantity}
            />
          
          <div className="rounded-lg -2xl h-100vh  flex flex-col justify-center">
            <SupplyChainTable setUpdatedDCData={setUpdatedDCData} />
          </div>
        
          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            
            <button
              onClick={submitProcurement}
              className={`${selectedQuarter === currentQuarter
                  ? "bg-red-500 hover:bg-black-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out`}
              disabled={selectedQuarter !== currentQuarter}
            >
              Submit Procurement
            </button>
          </div>
        </div>
        </div>
      </div>
    
  );
};

export default Procurement_Decisions;