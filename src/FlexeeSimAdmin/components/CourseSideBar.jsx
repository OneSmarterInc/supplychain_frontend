import React, { useState } from "react";
import DashboardNavbar from "./DashboardNavbar";
import Dashboard from "./Dashboard";
import BackOfficeFooter from "./Backoffice/BackOfficeFooter";
import sidebaricon from "../Assets/sidebaricon.png";
import CourseComponent from "./CourseComponent";
import TeamTableComponent from "./TeamTableComponent";
import GroupsTeamsComponent from "./GroupsTeamsComponent";
import GroupDashboard from "./GroupDetailedView";
import { useNavigate } from "react-router-dom";
import MyContext from "../../Components/ContextApi/MyContext";
import NotesComponent from "./FacultyNotes";
import StudentRequest from "./StudentRequest";
import Footer from "./Footer";


const CourseSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 bg-white h-[100vh] border-r-2 border-red-500 text-white transition-all duration-300 ease-in-out min-w-[13%] flex-shrink-0`}
      style={{ width: '13%' }} // Ensures the sidebar takes up 13% of the width
    >
      <div className="flex flex-col items-center pb-4">
        <nav className="space-y-4 text-gray-500 p-4">
          <div className="flex flex-col items-center justify-center space-y-2">
            <img src={sidebaricon} />
            <span className="text-gray-800 font-bold">FACULTY ADMIN</span>
            <div className="border-b border-red-500 w-[40px]"></div>
          </div>
          <p className="text-sm cursor-pointer  hover:text-red-500" onClick={()=>{navigate('/flexeesim/dashboard')}}>COURSES</p>
          <p className="text-sm cursor-pointer text-red-800 border-b border-red-500 hover:text-red-500" >GROUP MANAGEMENT</p>
          <p className="text-sm cursor-pointer   hover:text-red-500" onClick={()=>{navigate('/flexeesim/grouplogs')}}>LOGS & NOTES</p>

         
          {/* <p className="text-sm cursor-pointer hover:text-red-500">STUDENTS </p> */}
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
    <div className="flex-1 ml-[13%] bg-gray-100">
      <div className="bg-white h-full w-full">
        <DashboardNavbar />
        <CourseComponent />
        <GroupsTeamsComponent />
       <StudentRequest />
       <Footer />
        {/* <GroupDashboard />
        <NotesComponent /> */}
      </div>
    </div>
  </div>
  );
};

export default CourseSideBar;
