import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import SuperRoute from "./SuperRoute";
// Import your components
import Demand_generation from "../decisions/Demand_generation";
import Distribution_Decision from "../decisions/Distribution_Decision";
import Forecast from "../decisions/Forecast";
import IT from "../decisions/IT";
import Manufacturing_Decisions from "../decisions/Manufacturing_Decisions";
import Procurement_Decisions from "../decisions/Procurement_Decisions";
import Service_Decision from "../decisions/Service_Decision";
import Transportation_Decision from "../decisions/Transportation_Decision";
import Admin from "../Components/Admin";
import Signin from "../Components/Signin";
import Signup from "../Components/Signup";
import AdminSideLive from "../admin/AdminSideLive";
import AdminSideEnded from "../admin/AdminSideEnded";
import UserSideLive from "../user/UserSideLive";
import UserSideEnded from "../user/UserSideEnded";
import Steps from "../createSimulation/Steps";
import AdminNavBar from "../Components/AdminNavBar";
import Inventory from "../Components/Inventory";
import JoinNow from "../Components/JoinNow";
import Analytics from "../analytics/main";

// Flexeesim routes
import FlexeeAboutUs from "../FlexeeSimAdmin/components/AboutUs";
import FlexeeDecisionPreview from "../FlexeeSimAdmin/components/DecisionsPreview";
import FlexeeFeatures from "../FlexeeSimAdmin/components/Features";
import FlexeeFlexeeOverview from "../FlexeeSimAdmin/components/FlexeeOverview";
import FlexeeFooter from "../FlexeeSimAdmin/components/Footer";
import FlexeeHome from "../FlexeeSimAdmin/components/Home";
import FlexeeTestimonials from "../FlexeeSimAdmin/components/Testimonials";
import FlexeeValues from "../FlexeeSimAdmin/components/Values";
import FlexeeNavbar from "../FlexeeSimAdmin/components/Navbar";
import FlexeeDashboard from "../FlexeeSimAdmin/components/Dashboard";
import FlexeeCourseComponent from "../FlexeeSimAdmin/components/CourseComponent";
import FlexeeGroupsTeamsComponent from "../FlexeeSimAdmin/components/GroupsTeamsComponent";
import FlexeeDashboardNavbar from "../FlexeeSimAdmin/components/DashboardNavbar";
import FlexeeRegister from "../FlexeeSimAdmin/components/Register";
import FlexeeBackOfficeUser from "../FlexeeSimAdmin/components/Backoffice/BackOfficeUser";
import FlexeeBackOfficeConnecting from "../FlexeeSimAdmin/components/Backoffice/BackOfficeConnecting";
import FlexeeBackOfficeNavbar from "../FlexeeSimAdmin/components/Backoffice/BackOfficeNavbar";
import FlexeeBackOfficeSidebar from "../FlexeeSimAdmin/components/Backoffice/BackOfficeSidebar";
import FlexeeBackOfficeFooter from "../FlexeeSimAdmin/components/Backoffice/BackOfficeFooter";
import FlexeeBackOfficeRankings from "../FlexeeSimAdmin/components/Backoffice/BackOfficeRankings";
import FlexeeBackOfficeReports from "../FlexeeSimAdmin/components/Backoffice/BackOfficeReports";
import FlexeeBackOfficeFAQS from "../FlexeeSimAdmin/components/Backoffice/BackOfficeFAQS";
import FlexeeHomeFeatures from "../FlexeeSimAdmin/components/HomeFeatures";
import FlexeeSlider from "../FlexeeSimAdmin/components/Slider";
import Sidebar from "../sidebar/SideBar";
import FlexeeOverview from "../FlexeeSimAdmin/components/FlexeeOverview";
import BackOfficeNavbar from "../decisions/NewNavbar";
import CNavbar from "../decisions/CnewNavbar";
import { PrivateRoute } from "./PrivateRoutes";
import BackOfficeFooter from "../FlexeeSimAdmin/components/Backoffice/BackOfficeFooter";
import Members from "../Components/Members";
import ForgotPassword from "../Components/ForgotPassword";
import BackOfficeDecision from "../FlexeeSimAdmin/components/Backoffice/BackOfficeDecision";
import Manual from "../Components/Manual";
import Financial from "../analytics/Financial";
import Operational from "../analytics/Operational";
import Customer from "../analytics/Customer";
import Footer from "../FlexeeSimAdmin/components/Footer";
import SimRoute from "./SimRoute";
import LayoutWithSidebar from "../FlexeeSimAdmin/components/DashBoardSideBar";
import CourseSideBar from "../FlexeeSimAdmin/components/CourseSideBar";
import GroupsLogsSidebar from "../FlexeeSimAdmin/components/GroupsSideBar";
import UserSideView from "../user/UserSIdeView";

const MainRoutes = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [noOfQuarters, setNoOfQuarters] = useState();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        exact
        path="/"
        element={
          <div className="home h-full bg-white">
            <FlexeeNavbar />
            <FlexeeHome />
            <FlexeeOverview />
            <FlexeeHomeFeatures />
            {/* <FlexeeSlider /> */}
            {/* <FlexeeTestimonials /> */}
            <FlexeeValues />
            {/* <FlexeeDecisionPreview /> */}
            <FlexeeFooter />
          </div>
        }
      />
      <Route exact path="/forgot-password" element={<ForgotPassword />} />

      {/* Protected Routes */}

      <Route
        exact
        path="/dashboard"
        element={
          <div className="dashboard h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 overflow-x-hidden flex flex-col">
                <FlexeeDashboardNavbar />

                <Analytics />
                <BackOfficeFooter />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/financial"
        element={
          <div className="dashboard h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 flex flex-col">
                <FlexeeDashboardNavbar />

                <Financial />
                <BackOfficeFooter />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/operational"
        element={
          <div className="dashboard h-full grid grid-cols-6">
          <PrivateRoute>
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-5 flex flex-col">
              <FlexeeDashboardNavbar />

              <Operational />
              <BackOfficeFooter />
            </div>
          </PrivateRoute>
        </div>
        }
      />

      <Route
        exact
        path="/customer"
        element={
          <div className="dashboard h-full grid grid-cols-6">
          <PrivateRoute>
            <div className="col-span-1">
              <Sidebar />
            </div>
            <div className="col-span-5 flex flex-col">
              <FlexeeDashboardNavbar />

              <Customer />
              <BackOfficeFooter />
            </div>
          </PrivateRoute>
        </div>
        }
      />

      <Route
        exact
        path="/members"
        element={
          <div className="dashboard h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 flex flex-col h-[100vh]">
                <FlexeeDashboardNavbar />
                <Members />
                <BackOfficeFooter />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/joinnow"
        element={
          <div className="procurement h-full">
            <PrivateRoute>
              <JoinNow />
            </PrivateRoute>
          </div>
        }
      />
      <Route
        exact
        path="/procurement"
        element={
          <div className="procurement h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 flex flex-col">
                <FlexeeDashboardNavbar />

                <Procurement_Decisions />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/manufacture"
        element={
          <div className="manufacturing h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 flex flex-col">
                <FlexeeDashboardNavbar />

                <Manufacturing_Decisions />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/distribution"
        element={
          <div className="distribution h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 flex flex-col">
                <FlexeeDashboardNavbar />

                <Distribution_Decision />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/transport"
        element={
          <div className="transport h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 flex flex-col">
                <FlexeeDashboardNavbar />

                <Transportation_Decision />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/service"
        element={
          <div className="service h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 flex flex-col">
                <FlexeeDashboardNavbar />

                <Service_Decision />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/demand"
        element={
          <div className="demand h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 flex flex-col">
                <FlexeeDashboardNavbar />

                <Demand_generation />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/forecast"
        element={
          <div className="forecast h-full grid grid-cols-1 md:grid-cols-6">
            <PrivateRoute>
              {/* Sidebar: Hidden on smaller screens, spans 1 column on medium+ screens */}
              <div className="hidden md:block md:col-span-1">
                <Sidebar />
              </div>
              {/* Main Content: Takes full width on small screens, spans 5 columns on medium+ screens */}
              <div className="col-span-1 md:col-span-5 flex flex-col">
                <FlexeeDashboardNavbar />
                <Forecast />
              </div>
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/it"
        element={
          <div className="it h-full grid grid-cols-6">
            <PrivateRoute>
              <div className="col-span-1">
                <Sidebar />
              </div>
              <div className="col-span-5 flex flex-col">
                <FlexeeDashboardNavbar />

                <IT />
              </div>
            </PrivateRoute>
          </div>
        }
      />
      <Route
        exact
        path="/admin"
        element={
          <div className="admin h-full">
            <Admin />
          </div>
        }
      />

      <Route
        exact
        path="/student/signin"
        element={
          <div className="signin h-full">
            <Signin />
          </div>
        }
      />
      <Route
        exact
        path="/signin"
        element={
          <div className="signin h-full">
            <Signin />
          </div>
        }
      />
      <Route
        exact
        path="/faculty/signin"
        element={
          <div className="signin h-full">
            <Signin />
          </div>
        }
      />
      <Route
        exact
        path="/signup"
        element={
          <div className="signup h-full">
            <Signup />
          </div>
        }
      />

      <Route
        exact
        path="/usersidelive"
        element={
          <PrivateRoute>
            <SimRoute>
              <div className="" style={{ minHeight: "100vh" }}>
                <FlexeeDashboardNavbar />
                <UserSideLive />
              </div>
              <BackOfficeFooter />
            </SimRoute>
          </PrivateRoute>
        }
      />

      <Route
        exact
        path="/usersidelive/joined"
        element={
          <PrivateRoute>
            <SimRoute>
              <div className="h-[96vh]">
                <FlexeeDashboardNavbar />
                <UserSideView />
              </div>
              <BackOfficeFooter />
            </SimRoute>
          </PrivateRoute>
        }
      />

      <Route
        exact
        path="/manual"
        element={
          <div className="signup h-full">
            <PrivateRoute>
              <CNavbar />
              <Manual />
              <BackOfficeFooter />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/usersideended"
        element={
          <div className="signup h-full">
            <PrivateRoute>
              <UserSideEnded />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/inventory"
        element={
          <div className="signup h-full">
            <PrivateRoute>
              <Inventory />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/createsim"
        element={
          <div className="createsim h-full">
            <div className="navbar pb-4">
              <PrivateRoute>
                <ProtectedRoute>
                  <BackOfficeNavbar />
                </ProtectedRoute>

              </PrivateRoute>
            </div>
            <Steps
              setNoOfQuarters={setNoOfQuarters}
              noOfQuarters={noOfQuarters}
            />
          </div>
        }
      />

      <Route
        exact
        path="/flexee/admin-center/super/admin-list"
        element={
          <div className="createsim h-full">
            <div className="navbar pb-4">
              <PrivateRoute>
                <AdminSideLive />
              </PrivateRoute>
            </div>
            <Steps
              setNoOfQuarters={setNoOfQuarters}
              noOfQuarters={noOfQuarters}
            />
          </div>
        }
      />

      {/* FlexeeSim Protected Routes */}
      <Route
        exact
        path="/flexeesim/"
        element={
          <ProtectedRoute>
            <div className="pt-20">
              <FlexeeNavbar />
              <FlexeeHome />
              <FlexeeFlexeeOverview />
              <FlexeeHomeFeatures />
              <FlexeeSlider />
              <FlexeeTestimonials />
              <FlexeeValues />
              <FlexeeDecisionPreview />
              <FlexeeFooter />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/aboutus"
        element={
          <ProtectedRoute>
            <div className="pt-20">
              <FlexeeNavbar />
              <FlexeeAboutUs />
              <FlexeeFooter />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/features"
        element={
          <ProtectedRoute>
            <div className="pt-20">
              <FlexeeNavbar />
              <FlexeeFeatures />
              <FlexeeFooter />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/preview"
        element={
          <ProtectedRoute>
            <div className="pt-20">
              <FlexeeNavbar />
              <FlexeeDecisionPreview />
              <FlexeeFooter />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/dashboard"
        element={
          <ProtectedRoute>
            <LayoutWithSidebar />
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/grouplogs"
        element={
          <ProtectedRoute>
            <GroupsLogsSidebar />
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/backoffice"
        element={
          <ProtectedRoute>
            <div className="">
              <FlexeeBackOfficeConnecting />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/backoffice/user"
        element={
          <ProtectedRoute>
            <div className="flex justify-start items-start">
              <div className={`w-full`}>
                <div className="pb-0" style={{ minHeight: "96vh" }}>
                  <FlexeeBackOfficeNavbar />
                  <FlexeeBackOfficeSidebar />
                  <FlexeeBackOfficeUser />
                </div>
              </div>
            </div>
            <div>
              <FlexeeBackOfficeFooter />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/backoffice/rankings"
        element={
          <ProtectedRoute>
            <div className="flex justify-start items-start">
              {isSideBarOpen && <FlexeeBackOfficeSidebar />}
              <div className={`w-full ${isSideBarOpen ? "ml-60" : "ml-0"}`}>
                <div className="pb-10">
                  <FlexeeBackOfficeNavbar
                    setIsSideBarOpen={setIsSideBarOpen}
                    isSideBarOpen={isSideBarOpen}
                  />
                </div>
                <div className="pb-20">
                  <FlexeeBackOfficeRankings />
                </div>
              </div>
            </div>

            <FlexeeBackOfficeFooter />
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/backoffice/reports"
        element={
          <ProtectedRoute>
            <div
              className="flex justify-start items-start"
              style={{ minHeight: "96vh" }}
            >
              {isSideBarOpen && <FlexeeBackOfficeSidebar />}
              <div className={`w-full`}>
                <div className="">
                  <FlexeeBackOfficeNavbar
                    setIsSideBarOpen={setIsSideBarOpen}
                    isSideBarOpen={isSideBarOpen}
                  />
                </div>
                <FlexeeBackOfficeSidebar />
                <div className="pb-20">
                  <FlexeeBackOfficeReports />
                </div>
              </div>
            </div>

            <FlexeeBackOfficeFooter />
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/backoffice/decisions"
        element={
          <ProtectedRoute>
            <div className="flex justify-start items-start">
              {isSideBarOpen && <FlexeeBackOfficeSidebar />}
              <div className={`w-full`}>
                <div className="">
                  <FlexeeBackOfficeNavbar
                    setIsSideBarOpen={setIsSideBarOpen}
                    isSideBarOpen={isSideBarOpen}
                  />
                </div>
                <FlexeeBackOfficeSidebar />
                <div className="pb-20">
                  <BackOfficeDecision />
                </div>
              </div>
            </div>

            <BackOfficeFooter />
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/dashboard/courses"
        element={
          <ProtectedRoute>
            <div className="min-h-full">
              <CourseSideBar />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/register"
        element={
          <ProtectedRoute>
            <div className="">
              <FlexeeRegister />
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
