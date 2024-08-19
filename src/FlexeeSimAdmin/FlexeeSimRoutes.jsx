import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import DecisionPreview from "./components/DecisionsPreview";
import Features from "./components/Features";
import FlexeeOverview from "./components/FlexeeOverview";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Testimonials from "./components/Testimonials";
import Values from "./components/Values";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ExploreSim from "./components/ExploreSim";
import CourseComponent from "./components/CourseComponent";
import GroupsTeamsComponent from "./components/GroupsTeamsComponent";
import StudentRequest from "./components/StudentRequest";
import DashboardNavbar from "./components/DashboardNavbar";
import Register from "./components/Register";
import BackOfficeUser from "./components/Backoffice/BackOfficeUser";
import BackOfficeConnecting from "./components/Backoffice/BackOfficeConnecting";
import BackOfficeNavbar from "./components/Backoffice/BackOfficeNavbar";
import BackOfficeSidebar from "./components/Backoffice/BackOfficeSidebar";
import BackOfficeFooter from "./components/Backoffice/BackOfficeFooter";
import BackOfficeRankings from "./components/Backoffice/BackOfficeRankings";
import BackOfficeReports from "./components/Backoffice/BackOfficeReports";
import BackOfficeFAQS from "./components/Backoffice/BackOfficeFAQS";
import HomeFeatures from "./components/HomeFeatures";
import Slider from "./components/Slider";

function FlexeeSimRoutes() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div className="FlexeeSimRoutes">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="pt-20">
              <Navbar />
              <Home />
              <FlexeeOverview />
              <HomeFeatures />
              <Slider />
              <Testimonials />
              <Values />
              <DecisionPreview />
              <Footer />
            </div>
          }
        />
        <Route
          exact
          path="/aboutus"
          element={
            <div className="pt-20">
              <Navbar />
              <AboutUs />
              <Footer />
            </div>
          }
        />
        <Route
          exact
          path="/features"
          element={
            <div className="pt-20">
              <Navbar /> <Features />
              <Footer />
            </div>
          }
        />
        <Route
          exact
          path="/preview"
          element={
            <div className="pt-20">
              <Navbar />
              <DecisionPreview />
              <Footer />
            </div>
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            <div className="mt-52">
              <DashboardNavbar />
              <Dashboard />
              <ExploreSim />
              <Footer />
            </div>
          }
        />
        <Route
          exact
          path="/backoffice"
          element={
            <div className="">
              <BackOfficeConnecting />
            </div>
          }
        />
        <Route
          exact
          path="/backoffice/user"
          element={
            <div className="">
              <div className="flex justify-start items-start ">
                {isSideBarOpen && <BackOfficeSidebar />}

                <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                  <div className="pb-10">
                    <BackOfficeNavbar
                      setIsSideBarOpen={setIsSideBarOpen}
                      isSideBarOpen={isSideBarOpen}
                    />
                  </div>
                  <div className="pb-20">
                    <BackOfficeUser />
                  </div>
                </div>
              </div>
              <div className={`w-full  ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                <BackOfficeFooter />
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/backoffice/rankings"
          element={
            <div className="">
              <div className="flex justify-start items-start ">
                {isSideBarOpen && <BackOfficeSidebar />}

                <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                  <div className="pb-10">
                    <BackOfficeNavbar
                      setIsSideBarOpen={setIsSideBarOpen}
                      isSideBarOpen={isSideBarOpen}
                    />
                  </div>
                  <div className="pb-20">
                    <BackOfficeRankings />
                  </div>
                </div>
              </div>
              <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                <BackOfficeFooter />
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/backoffice/reports"
          element={
            <div className="">
              <div className="flex justify-start items-start ">
                {isSideBarOpen && <BackOfficeSidebar />}

                <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                  <div className="pb-10">
                    <BackOfficeNavbar
                      setIsSideBarOpen={setIsSideBarOpen}
                      isSideBarOpen={isSideBarOpen}
                    />
                  </div>
                  <div className="pb-20">
                    <BackOfficeReports />
                  </div>
                </div>
              </div>
              <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                <BackOfficeFooter />
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/backoffice/faqs"
          element={
            <div className="">
              <div className="flex justify-start items-start ">
                {isSideBarOpen && <BackOfficeSidebar />}

                <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                  <div className="pb-10">
                    <BackOfficeNavbar
                      setIsSideBarOpen={setIsSideBarOpen}
                      isSideBarOpen={isSideBarOpen}
                    />
                  </div>
                  <div className="pb-20">
                    <BackOfficeFAQS />
                  </div>
                </div>
              </div>
              <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                <BackOfficeFooter />
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/dashboard/courses"
          element={
            <div className="mt-48">
              <DashboardNavbar />
              <CourseComponent />
              <GroupsTeamsComponent />
              <StudentRequest />
              <Footer />
            </div>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <div className="">
              <Register />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default FlexeeSimRoutes;
