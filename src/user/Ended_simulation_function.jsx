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

const UserSideEndedFunction = ({
  id,
  batch,
  startDate,
  endDate,
  currentQuarter,
}) => {
  let navigate = useNavigate();
  let simData = localStorage.getItem("simData");

  const { api } = useContext(MyContext);
  simData = JSON.parse(simData);

  const filteredSimulation = simData.filter(
    (item) => item.simulation_id === parseInt(id)
  );
  localStorage.setItem("selectedSim", JSON.stringify(filteredSimulation));

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState("1");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");

  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  const [isFirmModalOpen, setIsFirmModalOpen] = useState(false);
  const [selectedFirm, setSelectedFirm] = useState(null);

  const firm_key = Object.keys(filteredSimulation[0]?.firm_data)[0];

  let firm_key_new = "";
  if (filteredSimulation[0]?.firm_data.length) {
    let firm_obj = filteredSimulation[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });

    firm_key_new = firm_obj.firmName;
  }

  const option = [];
  for (let i = 1; i <= filteredSimulation[0]?.current_quarter; i++) {
    option.push(
      <option key={i} value={i}>
        Select Quarter {i}
      </option>
    );
  }
  useEffect(() => {
    setSecondDropdownValue("");
  }, [isReportModalOpen, firstDropdownValue]);
  const toggleModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
  };

  const toggleResultModal = () => {
    setIsResultModalOpen(!isReportModalOpen);
  };

  const handleQuarterSelectChange = (e) => {
    setFirstDropdownValue(e.target.value);
  };

  const handleButtonClick = async (e) => {
    const newDropdownValue = e.target.value;
    setSecondDropdownValue(newDropdownValue);

    // Construct the query parameters
    const queryParams = new URLSearchParams({
      simulation_id: filteredSimulation[0]?.simulation_id,
      quarter: firstDropdownValue,
      firm: Object.keys(simData[0]?.firm_data)[0],
    }).toString();

    // Append the query parameters to the URL
    const url = `${api}/reports/${
      newDropdownValue ? newDropdownValue : "cpl"
    }/?${queryParams}`;

    // Make a GET request with the constructed URL
    try {
      const response = await axios.get(url);
      // console.log("GET /request successful", response.data);
      localStorage.setItem("reportData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const [firms, setFirms] = useState([]);
  const firmsFetch = async () => {
    try {
      const response = await axios.get(`${api}/firmsbyadmin/`, {
        params: {
          admin_id: user.userid,
          simulation_id: filteredSimulation[0]?.simulation_id,
          firm_key: firm_key_new,
          email: user.email,
        },
      });
      // console.log("Firms by admin:", response.data);
      setFirms(response.data);
    } catch (error) {
      console.error("Error adding admin:", error);
    }
  };

  const handleFirmsUsers = (firmdata) => {
    setSelectedFirm(firmdata);
    setIsFirmModalOpen(!isFirmModalOpen);
  };

  return (
    <div className="flex h-80  bg-slate-200 justify-start items-center mx-10 sm:ml-80 rounded-lg border-2 border-neutral-600">
      <div className="info">
        <div className="text-3xl p-2 flex">
          <div className="flex items-center ">
            <h1 className="text-3xl"> {batch} |</h1>
            <span className="text-3xl p-2">
              Current Quarter : {currentQuarter}
            </span>
          </div>
        </div>
        <p className="text-base p-2">
          start Date {startDate} | End Date {endDate}
        </p>

        <div className="relative">
          <div className="flex  items-center space-x-3">
            <button onClick={toggleResultModal} className="">
              <EvaluationReportModal />
            </button>
            <button
              onClick={toggleModal}
              className="w-28 h-10 rounded-lg bg-green-600 text-white text-center p-2 hover:bg-green-700"
            >
              Reports
            </button>
          </div>
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

                  <option value="pcpl">Hyperware P&L Statement</option>

                  <option value="inventory">
                    Finished Goods Inventory Report
                  </option>
                </Select>
              </HStack>
              <div className="mt-4 flex">
                {secondDropdownValue === "cpl" && <ReportModal />}

                {secondDropdownValue === "pcpl" && <ProductReportModal />}

                {secondDropdownValue === "inventory" && <FGInventoryModal />}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserSideEndedFunction;
