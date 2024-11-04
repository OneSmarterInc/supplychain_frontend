import React, { useContext, useState } from "react";
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
        name: `Quarter ${i + 1}`,
        redirect: null,
      })),
    },
    { name: "Members and Logs", redirect: "/members" },
    { name: "Download Manual", download: true, fileUrl: "/manual.docx" },
    // { name: "FAQ's", redirect: "/faqs" },
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
      setActiveParent(activeParent === option.name ? null : option.name);  // Toggle the display of children
      setSelectedQuarter(null);
      clearReportState();
    }
  };

  const handleQuarterClick = (quarter) => {
    setSelectedQuarter(selectedQuarter === quarter.name ? null : quarter.name);  // Toggle quarter selection
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

      // Reset sidebar to its original state (normal view with no children displayed)
      setActiveParent(null);
      setSelectedQuarter(null);
      setActiveReport(reportType);
    } catch (error) {
      console.error("Error making GET request:", error);
    }
  };

  const clearReportState = () => {
    setActiveReport(null);
    setReportData(null);
  };

  return (
    <div className="fixed left-0 top-0 bg-white text-gray-800 w-60 pt-4 h-screen border-r-2 border-red-500">
      <div className="flex flex-col items-center justify-center space-y-2">
        <img src={sidebaricon} className="cursor-pointer" onClick={() => { navigate('/usersidelive') }} />
        <span className="text-gray-800 font-bold">DECISIONS</span>
        <div className="border-b border-red-500 w-[40px]"></div>
      </div>

      {/* Main Parent Options */}
      <ul className="p-4">
        {parentOptions.map((option, index) => (
          <li key={index} className="mb-4">
            <button
              onClick={() => handleParentClick(option)}
              className={`w-full text-left p-2 rounded ${activeParent === option.name ? "bg-white" : ""}`}
            >
              {option.name}
            </button>

            {/* Show Quarters Below "Reports" */}
            {activeParent === option.name && option.name === "Reports" && (
              <ul className="pl-4">
                {option.children.map((quarter, index) => (
                  <li key={index} className="mb-2">
                    <button
                      onClick={() => handleQuarterClick(quarter)}
                      className={`w-full text-left p-2 rounded ${selectedQuarter === quarter.name ? "bg-gray-200" : ""}`}
                    >
                      {quarter.name}
                    </button>

                    {/* Show Reports Below Selected Quarter */}
                    {selectedQuarter === quarter.name && (
                      <ul className="pl-4">
                        <li className="mb-2">
                          <button onClick={() => handleReportChange("cpl")} className="w-full text-left p-2">
                            Corporate P&L Statement
                          </button>
                        </li>
                        <li className="mb-2">
                          <button onClick={() => handleReportChange("bls")} className="w-full text-left p-2">
                            Balance Sheet
                          </button>
                        </li>
                        <li className="mb-2">
                          <button onClick={() => handleReportChange("cash")} className="w-full text-left p-2">
                            Cash Flow
                          </button>
                        </li>
                        <li className="mb-2">
                          <button onClick={() => handleReportChange("inventory")} className="w-full text-left p-2">
                            Finished Goods Inventory Report
                          </button>
                        </li>
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Display the selected report */}
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