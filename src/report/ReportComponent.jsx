import React, { useContext, useEffect, useState } from "react";
import { HStack, Select } from "@chakra-ui/react";

import axios from "axios";
import ReportModal from "./CplReport/ReportModal";
import ProductReportModal from "./ProductReport/ProductReportModel";
import FGInventoryModal from "./FinishedGoodsInventoryReport/FGInventoryModal";
import EvaluationReportModal from "./EvaluationReport/EvaluationReportModal";
import MyContext from "../Components/ContextApi/MyContext";
import BalanceSheetModel from "./BlanceSheetReport/BalanceSheetModel";

const ReportComponent = () => {
    const { api } = useContext(MyContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState("1");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");
  const option = [];


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  let simData = localStorage.getItem("selectedSim");
  simData = JSON.parse(simData);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  user = user.email;
  let firm_key_new = "";
  if (simData[0]?.firm_data.length) {
    let firm_obj = simData[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }
  for (let i = 1; i <= simData[0].current_quarter-1; i++) {
    option.push(
      <option key={i} value={i}>
        Select Quarter {i}
      </option>
    );
  }
  const handleQuarterSelectChange = (e) => {
    setFirstDropdownValue(e.target.value);
  };
  // useEffect(() => {
  //   const e = {
  //     target: {
  //       value: "cpl",
  //     },
  //   };
  //   handleButtonClick(e);
  // }, []);
  const handleButtonClick = async (e) => {
    const newDropdownValue = e.target.value;
    setSecondDropdownValue(newDropdownValue);

    // Construct the query parameters
    const queryParams = new URLSearchParams({
      simulation_id: simData[0].simulation_id,
      quarter: firstDropdownValue,
      firm: firm_key_new,
    }).toString();

    // Append the query parameters to the URL
    const url = `${api}/reports/${
      newDropdownValue ? newDropdownValue : ""
    }/?${queryParams}`;

    // Make a GET request with the constructed URL
    try {
      const response = await axios.get(url);
      console.log("GET request successful", response.data);
      localStorage.setItem("reportData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  return (
    <div>
      <HStack spacing={3} ml={9}>
        <Select
          width="165px"
          border="1px solid black"
          onChange={(e) => handleQuarterSelectChange(e)}
        >
          {option}
        </Select>
        <Select
          width="165px"
          border="1px solid black"
          onChange={(e) => handleButtonClick(e)}
        >
          <option value="">Select </option>
          <option value="cpl">Corporate P&L Statement </option>
          {/* <option value="hpl">Historical Corporate P&L Statement</option>
          <option value="pcpl">Hyperware P&L Statement</option>
          <option value="mpls">Metaware P&L Statement</option>
          <option value="bl">Balance Sheet</option> */}
          {/* <option value="cfar">Cash FLow Analysis Report</option> */}
          {/* <option value="inventory">Finished Goods Inventory Report </option> */}
          {/* <option value="pir">PROCUREMENT INVENTORY REPORT</option> */}
          {/* <option value="odvr">OTHER DECISION VARIABLES REPORT</option> */}
          {/* <option value="far">FORECASTING ACCURACY REPORT</option> */}
        </Select>

        {secondDropdownValue === "cpl" ? <ReportModal /> : null}
        {secondDropdownValue === "hpl" ? <ReportModal /> : null}
        {secondDropdownValue === "pcpl" ? <ProductReportModal /> : null}
        {secondDropdownValue === "mpls" ? <ProductReportModal /> : null}
        {secondDropdownValue === "inventory" ? <FGInventoryModal /> : null}
        {secondDropdownValue === "bl" ? <BalanceSheetModel /> : null}
        <EvaluationReportModal simulation_id={simData[0].simulation_id} firm_key={firm_key_new} selected_quarter={simData[0].current_quarter-1} />
      </HStack>
    </div>
  );
};

export default ReportComponent;
