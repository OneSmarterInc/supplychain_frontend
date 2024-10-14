import React, { useState, useContext, useEffect, useRef } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import ReportModal from "../report/CplReport/ReportModal";
import BalanceSheetModel from "../report/BlanceSheetReport/BalanceSheetModel";
import FGInventoryModal from "../report/FinishedGoodsInventoryReport/FGInventoryModal";
import CashFlowContainer from "../report/CashFlowReport/CashFlowContainer";

const Sidebar = () => {
  const { api } = useContext(MyContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeParent, setActiveParent] = useState(null);
  const [activeChild, setActiveChild] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [activeReport, setActiveReport] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [type, setType] = useState(null);
  const navigate = useNavigate();

  const sidebarRef = useRef(null);

  let simData = localStorage.getItem("selectedSim");
  simData = JSON.parse(simData);

  const selectedSim = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const firm_obj = selectedSim[0]?.firm_data?.filter(item => item.emails.includes(user.email)) || [];
  const firm_key = firm_obj.length ? firm_obj[0].firmName : "";

  let totalQuarters = parseInt(simData?.[0]?.current_quarter) - 1 || 1;

  const parentOptions = [
    { name: "Home", redirect: "/usersidelive" },
    { name: "Dashboard", redirect: "/dashboard" },
    // {
    //   name: "Decisions",
    //   children: [
    //     { name: "Forecast", redirect: "/forecast" },
    //     { name: "Procurement", redirect: "/procurement" },
    //     { name: "Manufacture", redirect: "/manufacture" },
    //     { name: "Distribution", redirect: "/distribution" },
    //     { name: "Transport", redirect: "/transport" },
    //     { name: "Service", redirect: "/service" },
    //     { name: "Demand", redirect: "/demand" },
    //     { name: "IT", redirect: "/it" },
    //   ],
    // },
    {
      name: "Reports",
      children: Array.from({ length: totalQuarters }, (_, i) => ({
        name: `Quarter ${i + 1}`,
        redirect: null,
      })),
    },
    { name: "Members and Logs", redirect: "/members" },
    // Update the Manual option to trigger a download
    { 
      name: "Download Manual", 
      download: true,
      fileUrl: "/manual.docx"  // Assuming the file is stored in the public directory
    },
    { name: "FAQ's", redirect: "/faqs" },
  ];

  const handleParentClick = (option) => {
    if (option.redirect) {
      navigate(option.redirect);
      clearReportState();
      // Close the sidebar only when navigating to a new route
      setIsSidebarOpen(false);
    } else if (option.download) {
      // If it's a download option, trigger file download
      const link = document.createElement('a');
      link.href = option.fileUrl;
      link.download = 'manual.docx';  // Set the name for the downloaded file
      link.click();
    } else {
      // Open the sidebar and set the active parent when there are children
      setIsSidebarOpen(true);
      setActiveParent(option.name);
      setType(option.name);
      setActiveChild(null);
      setSelectedQuarter(null);
      clearReportState();
    }
  };

  const handleQuarterClick = (quarter) => {
    setActiveChild(quarter.name);

    if (!quarter.name.includes("Quarter")) {
      navigate(`/${quarter.name}`);
      clearReportState();
      setIsSidebarOpen(false); // Close the sidebar when navigating to a new route
    } else {
      setSelectedQuarter(quarter.name);
      setIsSidebarOpen(true); // Keep the sidebar open if it's a quarter selection
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setActiveParent(null);
      setActiveChild(null);
      setType(null);
      setSelectedQuarter(null);
      clearReportState();
    }
  };


  const handleReportChange = async (reportType) => {
    if (type === "Reports") {
      setActiveReport(reportType);

      const queryParams = new URLSearchParams({
        simulation_id: simData[0]?.simulation_id,
        quarter: selectedQuarter.slice(-1),
        firm: firm_key,
      }).toString();

      const url = `${api}/reports/${reportType}/?${queryParams}`;

      try {
        const response = await axios.get(url);
        console.log("GET request successful", response.data);
        localStorage.setItem("reportData", JSON.stringify(response.data));
        setReportData(response.data);
      } catch (error) {
        console.error("Error making GET request:", error);
        setIsSidebarOpen(false);
      }
    }
  };

  const clearReportState = () => {
    setActiveReport(null);
    setReportData(null);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
      setActiveParent(null);
      setActiveChild(null);
      setType(null);
      setSelectedQuarter(null);
      clearReportState();
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);
  return (
    <div className="relative z-50 flex">
      {!isSidebarOpen && (
        <div className="absolute left-0 mt-0 top-1 transform -translate-y-11 bg-black text-gray-300 pl-3 rounded-r cursor-pointer">
          <i class="fa-solid fa-bars text-2xl text-red-500" onClick={toggleSidebar}></i>
        </div>
      )}

      {isSidebarOpen && (
        <div
          ref={sidebarRef}
          className="fixed left-0 top-0 bg-[#0E406A] text-gray-300 w-60 h-screen"
        >
          <div className="flex bg-gray-900 w-full h-12 p-2 justify-between items-center mb-4">
            <h1 className="text-2xl font-bold pl-4 text-white cursor-pointer" onClick={() => { navigate('/usersidelive') }}>FLEXEE</h1>
            <FiArrowLeft
              onClick={toggleSidebar}
              className="cursor-pointer text-red-500"
              size={28}
            />
          </div>
          <ul className="p-4">
            <li className="mb-4">
              <button
                onClick={() => handleParentClick(parentOptions[0])}
                className={`w-full text-left p-2 rounded ${activeParent === parentOptions[0].name ? "bg-gray-700" : ""
                  }`}
              >
                {parentOptions[0].name}
              </button>
            </li>
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Activity</h2>
              <hr className="border-gray-600 mb-2" />
              {parentOptions.slice(1, 5).map((option, index) => (
                <li key={index} className="mb-4">
                  <button
                    onClick={() => handleParentClick(option)}
                    className={`w-full text-left p-2 rounded ${activeParent === option.name ? "bg-gray-700" : ""
                      }`}
                  >
                    {option.name}
                  </button>
                </li>
              ))}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-2">Resources</h2>
              <hr className="border-gray-600 mb-2" />
              {parentOptions.slice(5, 7).map((option, index) => (
                <li key={index} className="mb-4">
                  <button
                    onClick={() => handleParentClick(option)}
                    className={`w-full text-left p-2 rounded ${activeParent === option.name ? "bg-gray-700" : ""
                      }`}
                  >
                    {option.name}
                  </button>
                </li>
              ))}
            </div>
          </ul>
        </div>
      )}

      {isSidebarOpen &&
        activeParent &&
        parentOptions.find((option) => option.name === activeParent)
          ?.children && (
          <div
            ref={sidebarRef}
            className="fixed left-60 top-0 w-48 bg-gray-800 text-white h-screen p-4"
          >
            <ul>
              {parentOptions
                .find((option) => option.name === activeParent)
                .children.map((quarter, index) => (
                  <li key={index} className="mb-4">
                    <button
                      onClick={() => handleQuarterClick(quarter)}
                      className={`w-full text-left p-2 rounded ${activeChild === quarter.name ? "bg-gray-600" : ""
                        }`}
                    >
                      {quarter.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}

      {isSidebarOpen && activeChild && type === "Reports" && (
        <div
          ref={sidebarRef}
          className="fixed left-[15rem] top-0 w-48 bg-gray-700 text-white h-screen p-4"
        >
          <button
            onClick={() => handleReportChange("cpl")}
            className="w-full text-left p-2"
          >
            Corporate P&L Statement
          </button>
          <button
            onClick={() => handleReportChange("bls")}
            className="w-full text-left p-2"
          >
            Balance Sheet
          </button>

          <button
            onClick={() => handleReportChange("cash")}
            className="w-full text-left p-2"
          >
            Cash Flow
          </button>

          <button
            onClick={() => handleReportChange("inventory")}
            className="w-full text-left p-2"
          >
            Finished Goods Inventory Report
          </button>

          {activeReport === "cpl" && reportData && (
            <ReportModal reportData={reportData} />
          )}
          {activeReport === "bls" && reportData && (
            <BalanceSheetModel reportData={reportData} />
          )}
          {activeReport === "inventory" && reportData && (
            <FGInventoryModal reportData={reportData} />
          )}
          
          {activeReport === "cash" && reportData && (
            <CashFlowContainer reportData={reportData} />
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;