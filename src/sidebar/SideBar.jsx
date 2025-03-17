import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import ReportModal from "../report/CplReport/ReportModal";
import BalanceSheetModel from "../report/BlanceSheetReport/BalanceSheetModel";
import FGInventoryModal from "../report/FinishedGoodsInventoryReport/FGInventoryModal";
import CashFlowContainer from "../report/CashFlowReport/CashFlowContainer";
import sidebaricon from "../FlexeeSimAdmin/Assets/sidebaricon.png";
import Loader from "./Loader";

const Sidebar = () => {
  const { api } = useContext(MyContext);
  const [simulation, setSimulation] = useState({});
  const [activeParent, setActiveParent] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState("1");
  const [activeReport, setActiveReport] = useState(null);
  const [reportData, setReportData] = useState(null);
  const selectedSimData =
    JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const simulation_id = selectedSimData[0]?.simulation_id;
   const [currentQuarter, setCurrentQuarter] = useState(
      selectedSimData[0]?.current_quarter
    );
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const getSimulation = async () => {
    try {
      const response = await axios.get(`${api}/getsim/${simulation_id}`);
      setSimulation(response.data[0]);
      setCurrentQuarter(response.data[0]?.current_quarter);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };
  useEffect(() => {
    getSimulation();
  }, [simulation_id]);
  let simData = JSON.parse(localStorage.getItem("selectedSim"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const firm_obj =
    selectedSim[0]?.firm_data?.filter((item) =>
      item.emails.includes(user.email)
    ) || [];
  const firm_key = firm_obj.length ? firm_obj[0].firmName : "";

  let totalQuarters = parseInt(currentQuarter) - 1 || 1;

  const parentOptions = [
    {
      name: "Dashboard",
      redirect: "/dashboard",
      id: "sidebar-button-dashboard",
    },
    {
      name: "Reports",
      id: "sidebar-button-reports",
      children: Array.from({ length: totalQuarters }, (_, i) => ({
        name: `${i + 1}`,
        redirect: null,
      })),
    },
    {
      name: "Members and Logs",
      id: "sidebar-button-member-logs",
      redirect: "/members",
    },
    {
      name: "Download Manual",
      id: "sidebar-button-download-manual",
      download: true,
      fileUrl: "/manual.docx",
    },
  ];

  const handleParentClick = (option) => {
    if (option.redirect) {
      navigate(option.redirect);
      clearReportState();
    } else if (option.download) {
      const link = document.createElement("a");
      link.href = option.fileUrl;
      link.download = "manual.docx";
      link.click();
    } else {
      setActiveParent(activeParent === option.name ? null : option.name);
    }
  };

  const handleQuarterClick = (quarter) => {
    setSelectedQuarter(selectedQuarter === quarter.name ? null : quarter.name);
    clearReportState();
  };

  const [loading, setLoading] = useState({
    cpl: false,
    bls: false,
    cash: false,
    inventory: false,
  });

  const handleReportChange = async (reportType) => {
    setLoading((prev) => ({ ...prev, [reportType]: true }));

    const queryParams = new URLSearchParams({
      simulation_id: simData[0]?.simulation_id,
      quarter: selectedQuarter.slice(-1),
      firm: firm_key,
    }).toString();

    const url = `${api}/reports/${reportType}/?${queryParams}`;

    try {
      const response = await axios.get(url);
      localStorage.setItem("reportData", JSON.stringify(response.data));
      setReportData(response.data);
      setActiveReport(reportType);
    } catch (error) {
      console.error("Error making GET request:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [reportType]: false }));
    }
  };

  const clearReportState = () => {
    setActiveReport(null);
    setReportData(null);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed left-0 top-0 bg-white text-gray-800 w-60 pt-4 h-screen border-r-2 border-red-500">
      <div className="flex flex-col items-center justify-center space-y-2">
        <img
          src={sidebaricon}
          className="cursor-pointer"
          onClick={() => {
            navigate("/usersidelive");
          }}
        />
        <span className="text-gray-800 font-bold">DECISIONS</span>
        <div className="border-b border-red-500 w-[40px]"></div>
      </div>

      <ul className="p-4">
        {parentOptions.map((option, index) => (
          <li key={index} className="mb-4">
            <button
              onClick={() => handleParentClick(option)}
              id={option.id}
              className={`w-full text-left p-2 rounded ${
                activeParent === option.name ? "bg-white" : ""
              }`}
            >
              {option.name}
            </button>

            {activeParent === option.name && option.name === "Reports" && (
              <div className="relative">
                <button
                  className="absolute left-0 top-0 h-full hover:scale-105"
                  onClick={scrollLeft}
                >
                  <i class="fa-solid fa-circle-arrow-left"></i>
                </button>
                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto flex space-x-2 scrollbar-hide  w-36 mx-auto justify-between"
                  style={{ maxWidth: "200px" }}
                >
                  {option.children.map((quarter, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuarterClick(quarter)}
                      className={`w-8 h-8 flex ml-2 items-center justify-center rounded-full border border-gray-300 ${
                        selectedQuarter === quarter.name
                          ? "bg-red-500 text-white"
                          : ""
                      }`}
                    >
                      {quarter.name}
                    </button>
                  ))}
                </div>
                <button
                  className="absolute right-0 top-0 h-full hover:scale-105"
                  onClick={scrollRight}
                >
                  <i class="fa-solid fa-circle-arrow-right"></i>
                </button>
              </div>
            )}

            {activeParent === option.name && option.name === "Reports" && (
              <ul className="pl-4 mt-2">
                <li>
                  {loading.cpl ? (
                    <button className="flex bg-blue-gray-600 text-white items-center p-2 w-full space-x-2 justify-between">
                      <p>Corporate P&L Statement</p> <Loader />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReportChange("cpl")}
                      className={`w-full text-left p-2 ${
                        activeReport === "cpl"
                          ? " bg-blue-gray-800 text-white"
                          : ""
                      }`}
                    >
                      Corporate P&L Statement
                    </button>
                  )}
                </li>

                <li>
                  {loading.bls ? (
                    <button className="flex bg-blue-gray-600 text-white items-center p-2 w-full space-x-2 justify-between">
                      <p> Balance Sheet</p> <Loader />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReportChange("bls")}
                      className={`w-full text-left p-2 ${
                        activeReport === "bls"
                          ? " bg-blue-gray-800 text-white"
                          : ""
                      }`}
                    >
                      Balance Sheet
                    </button>
                  )}
                </li>

                {/* <li>
                  {loading.cash ? (
                    <button className="flex bg-blue-gray-600 text-white items-center p-2 w-full space-x-2 justify-between">
                      <p> Cash Flow</p> <Loader />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReportChange("cash")}
                      className={`w-full text-left p-2 ${
                        activeReport === "cash"
                          ? " bg-blue-gray-800 text-white"
                          : ""
                      }`}
                    >
                      Cash Flow
                    </button>
                  )}
                </li> */}

                <li>
                  {loading.inventory ? (
                    <button className="flex bg-blue-gray-600 text-white items-center p-2 w-full space-x-2 justify-between">
                      <p> Finished Goods Inventory Report</p> <Loader />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReportChange("inventory")}
                      className={`w-full text-left p-2 ${
                        activeReport === "inventory"
                          ? " bg-blue-gray-800 text-white"
                          : ""
                      }`}
                    >
                      Finished Goods Inventory Report
                    </button>
                  )}
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>

      {activeReport && reportData && (
        <>
          {activeReport === "cpl" && (
            <ReportModal
              setActiveReport={setActiveReport}
              reportData={reportData}
            />
          )}
          {activeReport === "bls" && (
            <BalanceSheetModel
              setActiveReport={setActiveReport}
              reportData={reportData}
            />
          )}
          {activeReport === "inventory" && (
            <FGInventoryModal
              setActiveReport={setActiveReport}
              reportData={reportData}
            />
          )}
          {activeReport === "cash" && (
            <CashFlowContainer
              setActiveReport={setActiveReport}
              reportData={reportData}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Sidebar;
