import { Select, HStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";
import ReportModal from "../report/CplReport/ReportModal";
import ProductReportModal from "../report/ProductReport/ProductReportModel";
import FGInventoryModal from "../report/FinishedGoodsInventoryReport/FGInventoryModal";
import EvaluationReportModal from "../report/EvaluationReport/EvaluationReportModal";
import UserLoggerApi from "../LoggerApis/UserLoggerApi";
import backgroundImage from "../assets/bg.png";
import BalanceSheetModel from "../report/BlanceSheetReport/BalanceSheetModel";

const PlayComponent = ({
  id,
  batch,
  startDate,
  endDate,
  currentQuarter,
  firm_data,
}) => {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState("1");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");

  let user = JSON.parse(localStorage.getItem("user"));
  const email = user.email;
  let firm_key_map = "";

  if (firm_data?.length) {
    let firm_obj = firm_data.find((item) => item.emails.includes(email));
    if (firm_obj) {
      firm_key_map = firm_obj.firmName;
    }
  }

  const handleSubmit = () => {
    localStorage.setItem("selectedSimulation", JSON.stringify(id));
    navigate("/forecast");
  };

  useEffect(() => {
    setSecondDropdownValue("");
  }, [isReportModalOpen, firstDropdownValue]);

  const toggleModal = () => {
    setIsReportModalOpen(!isReportModalOpen);
    localStorage.setItem("selectedSimulation", JSON.stringify(id));
  };

  const handleQuarterSelectChange = (e) => {
    setFirstDropdownValue(e.target.value);
  };

  const handleButtonClick = async (e) => {
    const newDropdownValue = e.target.value;
    setSecondDropdownValue(newDropdownValue);

    const queryParams = new URLSearchParams({
      simulation_id: id,
      quarter: firstDropdownValue,
      firm: firm_key_map,
    }).toString();

    const url = `${api}/reports/${
      newDropdownValue ? newDropdownValue : ""
    }/?${queryParams}`;

    try {
      const response = await axios.get(url);
      console.log("GET request successful", response.data);
      localStorage.setItem("reportData", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  return (
    <div className="flex mt-4 bg-white justify-around items-center mx-10 rounded-lg border-2 border-neutral-600 shadow-xl">
      <div className="flex w-full">
        <div
          className="flex-1 flex flex-col items-center justify-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="info text-center">
            <h2 className="text-3xl p-2">
              {batch} | <span className="text-3xl p-2">Quarter {currentQuarter}</span>
            </h2>
            <p className="text-base p-2">
              Start Date {startDate} | End Date {endDate}
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
          </div>
        </div>
        <div className="flex-1">
          <div className="logger">
            <UserLoggerApi
              simulation_id={id}
              firm_key={firm_key_map}
              current_quarter={currentQuarter}
            />
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
                  onChange={handleQuarterSelectChange}
                  value={firstDropdownValue}
                >
                  {Array.from({ length: currentQuarter - 1 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Select Quarter {i + 1}
                    </option>
                  ))}
                </Select>
                <Select
                  width="165px"
                  border="1px solid black"
                  onChange={handleButtonClick}
                  value={secondDropdownValue}
                >
                  <option value="">Select</option>
                  <option value="cpl">Corporate P&L Statement</option>
                  <option value="pcpl">Hyperware P&L Statement</option>
                  <option value="inventory">Finished Goods Inventory Report</option>
                  <option value="bl">Balance Sheet</option>
                </Select>
              </HStack>
              <div className="mt-4 flex">
                {secondDropdownValue === "cpl" && <ReportModal />}
                {secondDropdownValue === "pcpl" && <ProductReportModal />}
                {secondDropdownValue === "inventory" && <FGInventoryModal />}
                {secondDropdownValue === "bl" && <BalanceSheetModel />}
                <div className="px-5">
                  <EvaluationReportModal
                    simulation_id={id}
                    firm_key={firm_key_map}
                    selected_quarter={firstDropdownValue}
                  />
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