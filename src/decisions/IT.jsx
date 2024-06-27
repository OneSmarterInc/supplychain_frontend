import React, { useContext, useEffect, useState } from "react";
import InfoImg from "../Components/InfoImg";
import IT_suppliers from "../Components/IT_suppliers";
import IT_reports from "../Components/IT_reports";
import { HStack, Select, useToast } from "@chakra-ui/react";
import NavBar from "../Components/NavBar";
import DataChart from "../Components/DataChart";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import ITDataChart from "../DataChartsOfDecisions/ITDataChart";
import { useNavigate } from "react-router-dom";
const IT = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const [reportValues, setReportValues] = useState();
  const [suppliers, setSuppliers] = useState();
  const { api } = useContext(MyContext);

  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
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

  const [ItData, setItData] = useState();
  console.log("ItData:--", ItData);
  useEffect(() => {
    getIt();
  }, []);

  useEffect(() => {
    if (ItData) {
      // setItValue({
      //   region1: ItData.It_region_one,
      //   region2: ItData.It_region_two,
      //   region3: ItData.It_region_three,
      // });
    }
  }, [ItData]);

  const getIt = async () => {
    try {
      const response = await axios.get(
        `${api}/previous/`,
        {
          params: {
            user_id: user.userid,
            sim_id: selectedSim[0].simulation_id,
            admin_id: selectedSim[0].admin_id,
            current_decision: "It",
            current_quarter: selectedSim[0].current_quarter,
            firm_key: firm_key_new,
          },
        }
      );
      const data = response.data;
      setItData(data);
      localStorage.setItem("ItData", JSON.stringify(data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  const toast = useToast();
  const navigate = useNavigate()
  const submitIt = async () => {
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
        ptc: reportValues.procurement,
        pcr: reportValues.productCost,
        rpdr: reportValues.replacementParts,
        rpr: reportValues.retailPipeline,
        tcr: reportValues.transportationCost,
        tr: reportValues.transportation,
      });
      console.log("POST request successful", response.data);
      getIt();
      addUserLogger()
      toast({
        title: "It Submitted successful",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      navigate("/transportation")
    } catch (error) {
      console.error("Error making POST request: Manufacturing", error);
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
        username: user.username,
        firm_key: firm_key_new

      });
      const data = response.data;
      console.log("addUserLoggerData", data);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-start pl-6 py-2 ">
          Information Technology Decision
        </h1>

        <div style={{ fontFamily: "ABeeZee" }} className="flex">
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
      <div className="sm:grid grid-cols-2  gap-3 m-1">
        <div className="m-3 rounded-xl  h-screen bg-white p-2  flex flex-col justify-start">
          <IT_suppliers
            ItData={ItData}
            setSuppliersFromDecision={setSuppliers}
          />
          <IT_reports
            ItData={ItData}
            setReportValuesFromDecision={setReportValues}
          />
        </div>
        <div className="rounded-2xl m-3  overflow-hidden    bg-white h-screen p-2">
          <InfoImg />
          <div className="py-10">
            <ITDataChart
              submitIt={submitIt}
              reportValues={reportValues}
              suppliers={suppliers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IT;
