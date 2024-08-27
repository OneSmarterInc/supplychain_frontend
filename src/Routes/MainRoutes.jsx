import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";  // Import the ProtectedRoute component
// Import your components
import Demand_generation from "../decisions/Demand_generation";
import Distribution_Decision from "../decisions/Distribution_Decision";
import Forecast from "../decisions/Forecast";
import Home from "../Pages/Home";
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
import LandingPage from "../Components/LandingPage/LandingPage";
import Analytics from "../analytics/main";
import FlexeeSimRoutes from "../FlexeeSimAdmin/FlexeeSimRoutes";

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
import FlexeeExploreSim from "../FlexeeSimAdmin/components/ExploreSim";
import FlexeeCourseComponent from "../FlexeeSimAdmin/components/CourseComponent";
import FlexeeGroupsTeamsComponent from "../FlexeeSimAdmin/components/GroupsTeamsComponent";
import FlexeeStudentRequest from "../FlexeeSimAdmin/components/StudentRequest";
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
import BackOfficeSidebar from "../decisions/NewSidebar";
import NewFooter from "../decisions/NewFooter";
import CNavbar from "../decisions/CnewNavbar";
import { PrivateRoute } from "./PrivateRoutes";
import BackOfficeFooter from "../FlexeeSimAdmin/components/Backoffice/BackOfficeFooter";
import Footer from "../FlexeeSimAdmin/components/Footer";
import Members from "../Components/Members";
import ForgotPassword from "../Components/ForgotPassword";

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
          <div className="home h-screen bg-white">
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
      <Route
        exact
        path="/forgot-password"
        element={
          <ForgotPassword />
        }
        />

      {/* Protected Routes */}
      <Route
        exact
        path="/procurement"
        element={
          <div className="procurement h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <Procurement_Decisions />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/dashboard"
        element={
          <div className="procurement h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <Analytics />
            </PrivateRoute>
          </div>
        }
      />


      <Route
        exact
        path="/members"
        element={
          <div className="procurement h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <Members />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/joinnow"
        element={
          <div className="procurement h-screen">
            <PrivateRoute>
              <JoinNow />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/manufacture"
        element={
          <div className="manufacturing h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <Manufacturing_Decisions />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/landingpage"
        element={
          <div className="manufacturing h-screen">
            <LandingPage />
          </div>
        }
      />

      <Route
        exact
        path="/distribution"
        element={
          <div className="distribution h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <Distribution_Decision />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/transport"
        element={
          <div className="transportation h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <Transportation_Decision />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/service"
        element={
          <div className="service h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <Service_Decision />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/demand"
        element={
          <div className="demand h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <Demand_generation />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/forecast"
        element={
          <div className="forecast h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <Forecast />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/it"
        element={
          <div className="it h-screen">
            <PrivateRoute>
              <BackOfficeNavbar />
              <Sidebar />
              <IT />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/admin"
        element={
          <div className="admin h-screen">
            <Admin />
          </div>
        }
      />

      <Route
        exact
        path="/signin"
        element={
          <div className="signin h-screen">
            <Signin />
          </div>
        }
      />

      <Route
        exact
        path="/signup"
        element={
          <div className="signup h-screen">
            <Signup />
          </div>
        }
      />

      <Route
        exact
        path="/usersidelive"
        element={
          <div className="signup h-screen">
            <PrivateRoute>
              <CNavbar />
              <UserSideLive />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/usersideended"
        element={
          <div className="signup h-screen">
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
          <div className="signup h-screen">
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
          <div className="createsim h-screen">
            <div className="navbar pb-4">
              <PrivateRoute>
                <AdminNavBar />
              </PrivateRoute>
            </div>
            <Steps setNoOfQuarters={setNoOfQuarters} noOfQuarters={noOfQuarters} />
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
            <div className="bg-white" style={{marginTop:'6rem', paddingTop:"1rem"}}>
              <FlexeeDashboardNavbar />
              <FlexeeDashboard />
              {/* <FlexeeExploreSim /> */}
              <BackOfficeFooter />
            </div>
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
              {isSideBarOpen && <FlexeeBackOfficeSidebar />}
              <div className={`w-full ${isSideBarOpen ? "ml-60" : "ml-0"}`}>
                <div className="pb-10">
                  <FlexeeBackOfficeNavbar
                    setIsSideBarOpen={setIsSideBarOpen}
                    isSideBarOpen={isSideBarOpen}
                  />
                </div>
                <div className="pb-20">
                  <FlexeeBackOfficeUser />
                </div>
              </div>
            </div>
            <div className={`w-full ${isSideBarOpen ? "ml-60" : "ml-0"}`}>
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
            <div className={`w-full ${isSideBarOpen ? "ml-60" : "ml-0"}`}>
              <FlexeeBackOfficeFooter />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/backoffice/reports"
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
                  <FlexeeBackOfficeReports />
                </div>
              </div>
            </div>
            <div className={`w-full ${isSideBarOpen ? "ml-60" : "ml-0"}`}>
              <FlexeeBackOfficeFooter />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/backoffice/faqs"
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
                  <FlexeeBackOfficeFAQS />
                </div>
              </div>
            </div>
            <div className={`w-full ${isSideBarOpen ? "ml-60" : "ml-0"}`}>
              <FlexeeBackOfficeFooter />
            </div>
          </ProtectedRoute>
        }
      />

      <Route
        exact
        path="/flexeesim/dashboard/courses"
        element={
          <ProtectedRoute>
            <div className="" style={{marginTop:'7.5rem'}}>
              <FlexeeDashboardNavbar />
              <FlexeeCourseComponent />
              <FlexeeGroupsTeamsComponent />
              <BackOfficeFooter />
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