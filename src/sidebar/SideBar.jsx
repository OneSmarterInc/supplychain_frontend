import React, { useState, useContext, useEffect, useRef } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import MyContext from '../Components/ContextApi/MyContext';
import { useNavigate } from 'react-router-dom';
import ReportModal from '../report/CplReport/ReportModal';

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

    let totalQuarters = parseInt(simData[0].current_quarter) - 1 || 1;

    const parentOptions = [
        { name: 'Dashboard', redirect: '/dashboard' },
        {
            name: 'Decisions',
            children: [
                { name: 'Forecast', redirect: '/forecast' },
                { name: 'Procurement', redirect: '/procurement' },
                { name: 'Manufacturing', redirect: '/manufacturing' },
                { name: 'Distribution', redirect: '/distribution' },
                { name: 'Transport', redirect: '/transport' },
                { name: 'Service', redirect: '/service' },
                { name: 'Demand', redirect: '/demand' },
                { name: 'IT', redirect: '/it' }
            ]
        },
        {
            name: 'Reports',
            children: Array.from({ length: totalQuarters }, (_, i) => ({ name: `Quarter ${i + 1}`, redirect: null }))
        },
        { name: 'Members', redirect: '/members' },
        { name: 'FAQ\'s', redirect: '/faqs' },
        { name: 'Manual' },
    ];

    const handleParentClick = (option) => {
        if (option.redirect) {
            navigate(option.redirect);
            clearReportState();
        } else {
            setActiveParent(option.name);
            setType(option.name);
            setActiveChild(null);
            setSelectedQuarter(null);
            clearReportState();
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

    const handleQuarterClick = (quarter) => {
        setActiveChild(quarter.name);

        if (!(quarter.name).includes('Quarter')) {
            navigate(`/${quarter.name}`);
            clearReportState();
        } else {
            setSelectedQuarter(quarter.name);
        }
    };

    const handleReportChange = async (reportType) => {
        if (type === "Reports") {
            setActiveReport(reportType);

            const queryParams = new URLSearchParams({
                simulation_id: simData[0].simulation_id,
                quarter: selectedQuarter.slice(-1),
                firm: 'Firm1',
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
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    return (
        <div className="relative z-50 flex">
            {!isSidebarOpen && (
                <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r cursor-pointer">
                    <FiArrowRight onClick={toggleSidebar} size={20} />
                </div>
            )}

            {isSidebarOpen && (
                <div ref={sidebarRef} className="fixed left-0 top-0 w-48 bg-gray-800 text-white h-screen p-4">
                    <div className="flex justify-between items-center mb-4">
                        <span>Menu</span>
                        <FiArrowLeft onClick={toggleSidebar} className="cursor-pointer" size={20} />
                    </div>
                    <ul>
                        {parentOptions.map((option, index) => (
                            <li key={index} className="mb-4">
                                <button
                                    onClick={() => handleParentClick(option)}
                                    className={`w-full text-left p-2 rounded ${activeParent === option.name ? 'bg-gray-600' : ''}`}
                                >
                                    {option.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isSidebarOpen && activeParent && parentOptions.find(option => option.name === activeParent)?.children && (
                <div ref={sidebarRef} className="fixed left-48 top-0 w-48 bg-gray-700 text-white h-screen p-4">
                    <ul>
                        {parentOptions
                            .find(option => option.name === activeParent)
                            .children.map((quarter, index) => (
                                <li key={index} className="mb-4">
                                    <button
                                        onClick={() => handleQuarterClick(quarter)}
                                        className={`w-full text-left p-2 rounded ${activeChild === quarter.name ? 'bg-gray-500' : ''}`}
                                    >
                                        {quarter.name}
                                    </button>
                                </li>
                            ))}
                    </ul>
                </div>
            )}

            {isSidebarOpen && activeChild && type === "Reports" && (
                <div ref={sidebarRef} className="fixed left-96 top-0 w-48 bg-gray-600 text-white h-screen p-4">
                    <button onClick={() => handleReportChange("cpl")} className="w-full text-left p-2">Corporate P&L Statement</button>
                    <button onClick={() => handleReportChange("pcpl")} className="w-full text-left p-2">Hyperware P&L Statement</button>
                    <button onClick={() => handleReportChange("mpls")} className="w-full text-left p-2">Metaware P&L Statement</button>
                    <button onClick={() => handleReportChange("bl")} className="w-full text-left p-2">Balance Sheet</button>
                    <button onClick={() => handleReportChange("inventory")} className="w-full text-left p-2">Finished Goods Inventory Report</button>
                    
                    {activeReport === "cpl" && reportData && <ReportModal reportData={reportData} />}
                </div>
            )}
        </div>
    );
};

export default Sidebar;