import React, { useContext, useState } from "react";
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
  const toast = useToast();

  console.log("Updated DC data", updatedDCData)

  const [getDcData, setGetDcData] = useState({});

  const getDCDATA = async () => {
    try {
      const response = await axios.get(`${api}/decision/procurement/`);
      setGetDcData(response.data);
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
        id: 3,
        simulation_id: 123,
        admin_id: 153,
        user_id: null,
        firm_key: "987",
        quarter: 8,
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
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <NavBar />
      <div className="flex justify-between">
        <h1 className="text-4xl text-start px-3 py-2 ">
          Procurement Decision
        </h1>

        <div className="flex">
          {" "}
          <h1 className="text-2xl text-start px-3 py-2 text-blue-500">
            MBA-JUN-24
          </h1>{" "}
          <h1 className="text-2xl text-start px-3 py-2 text-gray-600 ">
            {user.username}
          </h1>
        </div>
      </div>
      <div className="sm:grid grid-cols-2 gap-3 m-1">
        <div className="rounded-lg -2xl h-full  flex flex-col justify-center">
          <RawMaterial
            setAlpha_quantity={setAlpha_quantity}
            setBeta_quantity={setBeta_quantity}
          />
        </div>
        <div className="rounded-lg -2xl h-full bg-cover overflow-hidden bg-no-repeat">
          <InfoImg />
        </div>
        <div className="rounded-lg -2xl h-96  flex flex-col justify-center">
          <SupplyChainTable
            getDcdata={getDcData}
            setUpdatedDCData={setUpdatedDCData}
          />
        </div>
        <div className="rounded-lg -2xl h-96 ">
          <ProcurementDataChart
            updatedDCData={updatedDCData}
            submitProcurement={submitProcurement}
          />
        </div>
      </div>
    </div>
  );
};

export default Procurement_Decisions;
