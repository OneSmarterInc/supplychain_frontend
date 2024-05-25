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

const Procurement_Decisions = () => {
  const { api } = useContext(MyContext);
  let [updatedDCData, setUpdatedDCData] = useState();
  let [alpha_quantity, setAlpha_quantity] = useState({});
  let [beta_quantity, setBeta_quantity] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  console.log("selectedSim:==", Object.keys(selectedSim[0].firm_data)[0]);
  const firm_data = Object.keys(selectedSim[0].firm_data)[0];
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
          firm_key: firm_data,
        },
      });
      const data = response.data;
      localStorage.setItem("procurementData", JSON.stringify(data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

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
        firm_key: firm_data,
        quarter: selectedSim[0].current_quarter,
        alpha_quantity: Number(alpha_quantity),
        beta_quantity: Number(beta_quantity),
        sac_units: updatedDCData,
      });
      console.log("POST request successful", response.data);
      toast({
        title: "Entries Saved successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.error("Error making POST request:", error);
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
