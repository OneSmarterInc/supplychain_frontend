import React, { useContext, useEffect, useState } from "react";
import RawMaterial from "../Components/RawMaterial";
import SupplyChainTable from "../Components/SupplyChainTable";
import InfoImg from "../Components/InfoImg";
// import DataChart from "../Components/DataChart";
import NavBar from "../Components/NavBar";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

import { useToast } from "@chakra-ui/react";
import ProcurementDataChart from "../DataChartsOfDecisions/Procurement/ProcurementDataChart";
import { useNavigate } from "react-router-dom";

const Procurement_Decisions = () => {
  const { api } = useContext(MyContext);
  let [updatedDCData, setUpdatedDCData] = useState();
  let [alpha_quantity, setAlpha_quantity] = useState({});
  let [beta_quantity, setBeta_quantity] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const firm_data = Object.keys(selectedSim[0].firm_data)[0];
  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {

      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }
  console.log("Firm Key demand Live Sim: -------", firm_key_new);
  const toast = useToast();
  useEffect(() => {
    getProcurement();
  }, []);
  const getProcurement = async () => {
    try {
      const response = await axios.get(`${api}/previous/`, {
        params: {
          user_id: user.userid,
          sim_id: selectedSim[0].simulation_id,
          admin_id: selectedSim[0].admin_id,
          current_decision: "Procurement",
          current_quarter: selectedSim[0].current_quarter,
          firm_key: firm_key_new,

        },
      });
      const data = response.data;
      localStorage.setItem("procurementData", JSON.stringify(data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const navigate = useNavigate()

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
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        user_id: user.user_id,
        firm_key: firm_key_new,
        quarter: selectedSim[0].current_quarter,
        alpha_quantity: Number(alpha_quantity),
        beta_quantity: Number(beta_quantity),
        sac_units: updatedDCData,
      });
      console.log("POST request successful", response.data);
      getProcurement()
      addUserLogger()
      toast({
        title: "Procurement Submited Successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/manufacturing")
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  const addUserLogger = async () => {
    try {
      const response = await axios.post(`${api}/adduserlogs/`, {
        email: user.email,
        user_id: user.userid,
        simulation_id: selectedSim[0].simulation_id,
        admin_id: selectedSim[0].admin_id,
        decision: "Procurement",
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

  document.body.style.backgroundColor = "#e0e2e4";

  return (
    <div style={{ fontFamily: "ABeeZee" }}>
      <NavBar />
      <div className="flex justify-between">
        <h1 className="text-2xl text-start pl-6 py-2 ">Procurement Decision</h1>

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
      <div className="sm:grid grid-cols-2 gap-3 m-1">
        <div className="m-3 rounded-2xl  h-screen bg-white p-2  flex flex-col justify-center">
          <div className="rounded-lg -2xl h-full  flex flex-col justify-center">
            <RawMaterial
              setAlpha_quantity={setAlpha_quantity}
              setBeta_quantity={setBeta_quantity}
            />
          </div>
          <div className="rounded-lg -2xl h-96  flex flex-col justify-center">
            <SupplyChainTable setUpdatedDCData={setUpdatedDCData} />
          </div>
        </div>
        <div className="rounded-2xl m-3  overflow-hidden    bg-white h-screen p-2">
          <InfoImg />
          <div className="rounded-lg py-10 ">
            <ProcurementDataChart
              updatedDCData={updatedDCData}
              submitProcurement={submitProcurement}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Procurement_Decisions;
