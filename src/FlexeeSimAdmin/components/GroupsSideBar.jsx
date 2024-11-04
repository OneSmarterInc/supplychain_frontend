import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import Dashboard from "./Dashboard";
import BackOfficeFooter from "./Backoffice/BackOfficeFooter";
import sidebaricon from "../Assets/sidebaricon.png";
import { useNavigate } from "react-router-dom";
import NotesComponent from "./FacultyNotes";
import GroupDashboard from "./GroupDetailedView";

const GroupsLogsSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`fixed bg-white h-[100vh] border-r-2 border-red-500 text-white transition-all duration-300 ease-in-out min-w-[13%]`}
      >
        <div className="flex flex-col items-center pb-4">
          <nav className="space-y-4 text-gray-500 p-4">
            <div className="flex flex-col items-center justify-center space-y-2">
              <img src={sidebaricon} />
              <span className="text-gray-800 font-bold">FACULTY ADMIN</span>
              <div className="border-b border-red-500 w-[40px]"></div>
            </div>
            <p className="text-sm cursor-pointer  hover:text-red-500" onClick={()=>{navigate('/flexeesim/dashboard')}}>COURSES</p>
          <p className="text-sm cursor-pointer  hover:text-red-500" onClick={()=>{navigate('/flexeesim/dashboard/courses')}}>GROUP MANAGEMENT</p>
          <p className="text-sm cursor-pointer text-red-800 border-b border-red-500 hover:text-red-500">LOGS & NOTES</p>
            
            <hr />

            <p
              className="text-sm font-bold cursor-pointer hover:text-red-500"
              onClick={() => {
                navigate("/flexeesim/backoffice/");
              }}
            >
              Control Center
            </p>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 ml-[13%]">
        <div className="bg-white min-h-[100vh] w-[100%]">
          <DashboardNavbar />
        
          <GroupDashboard />
          <NotesComponent />
        </div>

      
      </div>
    </div>
  );
};

export default GroupsLogsSidebar;
