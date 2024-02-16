import React, { useContext, useState } from "react";
import RawMaterial from "../Components/RawMaterial";
import SupplyChainTable from "../Components/SupplyChainTable";
import InfoImg from "../Components/InfoImg";
import DataChart from "../Components/DataChart";
import NavBar from "../Components/NavBar";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

const Procurement_Decisions = () => {
  const { api } = useContext(MyContext);
  let [sac_units, setNewsac_units] = useState({});
  let [alpha_quantity, setAlpha_quantity] = useState({});
  let [beta_quantity, setBeta_quantity] = useState({});

  // console.log(
  //   "beta_quantity pro",
  //   typeof Number(alpha_quantity),
  //   "alpa_quantity pro",
  //   alpha_quantity
  // );
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
        sac_units: sac_units,
      });
      console.log("POST request successful", response.data);
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  document.body.style.backgroundColor = "#e0e2e4";
  return (
    <div>
      <NavBar />
      <h1 className="text-4xl text-start px-3 py-2 underline">
        Procurement Decision
      </h1>
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
          <SupplyChainTable setNewsac_units={setNewsac_units} />
        </div>
        <div className="rounded-lg -2xl h-96 ">
          <DataChart
            newsac_units={sac_units}
            submitProcurement={submitProcurement}
          />
        </div>
      </div>
    </div>
  );
};

export default Procurement_Decisions;
