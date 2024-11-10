import React, { useContext, useState, useRef } from "react";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useNavigate } from "react-router-dom";
import ReportModal from "../report/CplReport/ReportModal";
import BalanceSheetModel from "../report/BlanceSheetReport/BalanceSheetModel";
import FGInventoryModal from "../report/FinishedGoodsInventoryReport/FGInventoryModal";
import CashFlowContainer from "../report/CashFlowReport/CashFlowContainer";
import sidebaricon from '../FlexeeSimAdmin/Assets/sidebaricon.png';

const Sidebar = () => {
  const { api } = useContext(MyContext);
  const [activeParent, setActiveParent] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const [activeReport, setActiveReport] = useState(null);
  const [reportData, setReportData] = useState(null);
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  let simData = JSON.parse(localStorage.getItem("selectedSim"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSimData")) || {};
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const firm_obj = selectedSim[0]?.firm_data?.filter(item => item.emails.includes(user.email)) || [];
  const firm_key = firm_obj.length ? firm_obj[0].firmName : "";

  let totalQuarters = parseInt(simData?.[0]?.current_quarter) - 1 || 1;

  const parentOptions = [
    { name: "Dashboard", redirect: "/dashboard" },
    {
      name: "Reports",
      children: Array.from({ length: totalQuarters }, (_, i) => ({
        name: `${i + 1}`,
        redirect: null,
      })),
    },
    { name: "Members and Logs", redirect: "/members" },
    { name: "Download Manual", download: true, fileUrl: "/manual.docx" },
  ];

  const handleParentClick = (option) => {
    if (option.redirect) {
      navigate(option.redirect);
      clearReportState();
    } else if (option.download) {
      const link = document.createElement('a');
      link.href = option.fileUrl;
      link.download = 'manual.docx';
      link.click();
    } else {
      setActiveParent(activeParent === option.name ? null : option.name);
    }
  };

  const handleQuarterClick = (quarter) => {
    setSelectedQuarter(selectedQuarter === quarter.name ? null : quarter.name);
    clearReportState();
  };

  const handleReportChange = async (reportType) => {
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
    }
  };

  const clearReportState = () => {
    setActiveReport(null);
    setReportData(null);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-0 top-0 bg-white text-gray-800 w-60 pt-4 h-screen border-r-2 border-red-500">
      <div className="flex flex-col items-center justify-center space-y-2">
        <img src={sidebaricon} className="cursor-pointer" onClick={() => { navigate('/usersidelive') }} />
        <span className="text-gray-800 font-bold">DECISIONS</span>
        <div className="border-b border-red-500 w-[40px]"></div>
      </div>

      <ul className="p-4">
        {parentOptions.map((option, index) => (
          <li key={index} className="mb-4">
            <button
              onClick={() => handleParentClick(option)}
              className={`w-full text-left p-2 rounded ${activeParent === option.name ? "bg-white" : ""}`}
            >
              {option.name}
            </button>

            {activeParent === option.name && option.name === "Reports" && (
              <div className="relative">
                <button className="absolute left-0 top-0 h-full bg-gray-200" onClick={scrollLeft}>&lt;</button>
                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto flex space-x-2 scrollbar-hide"
                  style={{ maxWidth: '200px' }}
                >
                  {option.children.map((quarter, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuarterClick(quarter)}
                      className={`w-8 h-8 flex ml-2 items-center justify-center rounded-full border border-gray-300 ${selectedQuarter === quarter.name ? "bg-red-500 text-white" : ""}`}
                    >
                      {quarter.name}
                    </button>
                  ))}
                </div>
                <button className="absolute right-0 top-0 h-full bg-gray-200" onClick={scrollRight}>&gt;</button>
              </div>
            )}

            {selectedQuarter && activeParent === option.name && option.name === "Reports" && (
              <ul className="pl-4 mt-2">
                <li>
                  <button onClick={() => handleReportChange("cpl")} className="w-full text-left p-2">
                    Corporate P&L Statement
                  </button>
                </li>
                <li>
                  <button onClick={() => handleReportChange("bls")} className="w-full text-left p-2">
                    Balance Sheet
                  </button>
                </li>
                <li>
                  <button onClick={() => handleReportChange("cash")} className="w-full text-left p-2">
                    Cash Flow
                  </button>
                </li>
                <li>
                  <button onClick={() => handleReportChange("inventory")} className="w-full text-left p-2">
                    Finished Goods Inventory Report
                  </button>
                </li>
              </ul>
            )}
          </li>
        ))}
      </ul>

      {activeReport && reportData && (
        <>
          {activeReport === "cpl" && <ReportModal reportData={reportData} />}
          {activeReport === "bls" && <BalanceSheetModel reportData={reportData} />}
          {activeReport === "inventory" && <FGInventoryModal reportData={reportData} />}
          {activeReport === "cash" && <CashFlowContainer reportData={reportData} />}
        </>
      )}
    </div>
  );
};

export default Sidebar;
