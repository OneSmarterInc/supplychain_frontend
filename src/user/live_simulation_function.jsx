import { Select, Text, HStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts"; // Ensure you've installed react-apexcharts
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";
import ReportModal from "../report/CplReport/ReportModal";
import ProductReportModal from "../report/ProductReport/ProductReportModel";
import FGInventoryModal from "../report/FinishedGoodsInventoryReport/FGInventoryModal";
import EvaluationReportModal from "../report/EvaluationReport/EvaluationReportModal";
import UserLoggerApi from "../LoggerApis/UserLoggerApi";

const PlayComponent = ({
  id,
  batch,
  startDate,
  endDate,
  currentQuarter,
  firm_data,
}) => {
  let navigate = useNavigate();
  // let simid = localStorage.getItem("selectedSimulation");
  let user = JSON.parse(localStorage.getItem("user"));
  user = user.email;

  let firm_key_map = "";
  if (firm_data?.length) {
    let firm_obj = firm_data.filter((item, index) => {
      return item.emails.includes(user);
    });
    if (firm_obj.length) {
      firm_key_map = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }
  console.log("Firm Key Map Live sim: ", firm_key_map);

  let simData = localStorage.getItem("simData");

  const { api } = useContext(MyContext);
  simData = JSON.parse(simData);

  const filteredSimulation = simData.filter(
    (item) => item.simulation_id === parseInt(id)
  );
  localStorage.setItem("selectedSim", JSON.stringify(filteredSimulation));

  function handleSubmit() {
    // Perform some action
    const saveData = (id) => {
      localStorage.setItem("selectedSim", JSON.stringify(filteredSimulation));
      localStorage.setItem("selectedSimulation", JSON.stringify(id));
    };
    saveData(id);
    navigate("/forecast"); // navigate to a success page
  }

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState("1");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");
  let selectedSim = localStorage.getItem("selectedSim");
  selectedSim = JSON.parse(selectedSim);


  const option = [];
  for (let i = 1; i <= selectedSim[0]?.current_quarter; i++) {
    option.push(
      <option key={i} value={i}>
        Select Quarter {i}
      </option>
    );
  }

  const toggleModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };

  const handleQuarterSelectChange = (e) => {
    setFirstDropdownValue(e.target.value);
  };

  // useEffect(() => {
  //   const e = {
  //     target: {
  //       value: "",
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
      firm: Object.keys(simData[0]?.firm_data)[0],
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
    <div className="flex mt-4 bg-slate-200 justify-around items-center mx-10 rounded-lg border-2 border-neutral-600">
      <div className="info">
        <h2 className="text-3xl p-2 underline underline-offset-1">
          {batch} |
          <span className="text-3xl p-2">
            Current Quarter : {currentQuarter}
          </span>
        </h2>
        <p className="text-base p-2">
          start Date {startDate} | End Date {endDate}
        </p>
        <div className="buttons my-2">
          <button
            className="w-32 h-10 rounded-lg bg-blue-600 text-white text-center p-2 mx-2 hover:bg-sky-950"
            onClick={handleSubmit}
          >
            Enter
          </button>
          <button
            onClick={toggleModal}
            className="w-28 h-10 rounded-lg bg-green-600 text-white text-center p-2 hover:bg-green-700"
          >
            Reports
          </button>
        </div>
        <div className="logger">
          <UserLoggerApi simulation_id={id} firm_key={firm_key_map} />
        </div>
      </div>
      <div className="graph">
        <div className="mixed-chart pt-4">
          {/* <Chart options={options} series={series} type="area" width="450" /> */}
        </div>
      </div>
      {isReportModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleModal}
          ></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-6 w-2/3 max-w-xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Select Reports</h2>
                <button
                  className="text-red-600 font-bold"
                  onClick={toggleModal}
                >
                  X
                </button>
              </div>
              <HStack spacing={3}>
                <Select
                  width="165px"
                  border="1px solid black"
                  onChange={(e) => handleQuarterSelectChange(e)}
                  value={firstDropdownValue}
                >
                  {option}
                </Select>
                <Select
                  width="165px"
                  border="1px solid black"
                  onChange={(e) => handleButtonClick(e)}
                  value={secondDropdownValue}
                >
                  <option value="">Select</option>
                  <option value="cpl">Corporate P&L Statement</option>
                  <option value="hpl">
                    Historical Corporate P&L Statement
                  </option>
                  <option value="pcpl">Hyperware P&L Statement</option>
                  <option value="mpls">Metaware P&L Statement</option>
                  <option value="bl">Balance Sheet</option>
                  <option value="cfar">Cash Flow Analysis Report</option>
                  <option value="inventory">
                    Finished Goods Inventory Report
                  </option>
                  <option value="pir">Procurement Inventory Report</option>
                  <option value="odvr">Other Decision Variables Report</option>
                  <option value="far">Forecasting Accuracy Report</option>
                </Select>
              </HStack>
              <div className="mt-4 flex">
                {secondDropdownValue === "cpl" && <ReportModal />}
                {secondDropdownValue === "hpl" && <ReportModal />}
                {secondDropdownValue === "pcpl" && <ProductReportModal />}
                {secondDropdownValue === "mpls" && <ReportModal />}
                {secondDropdownValue === "bl" && <ReportModal />}
                {secondDropdownValue === "cfar" && <ReportModal />}
                {secondDropdownValue === "inventory" && <FGInventoryModal />}
                {secondDropdownValue === "pir" && <ReportModal />}
                {secondDropdownValue === "odvr" && <ReportModal />}
                {secondDropdownValue === "far" && <ReportModal />}
                <div className="px-5">
                  {" "}
                  <EvaluationReportModal />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayComponent;
