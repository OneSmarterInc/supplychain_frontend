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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminSideLive from "../admin/AdminSideLive";
import AdminSideEnded from "../admin/AdminSideEnded";
import UserSideLive from "../user/UserSideLive";
import UserSideEnded from "../user/UserSideEnded";
import { useState } from "react";
import Steps from "../createSimulation/Steps";
import AdminNavBar from "../Components/AdminNavBar";
import { PrivateRoute } from "./PrivateRoutes";
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

const MainRoutes = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [noOfQuarters, setNoOfQuarters] = useState();
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div className="home h-screen">
             <FlexeeNavbar />
              <FlexeeHome />
              <FlexeeOverview />
              <FlexeeHomeFeatures />
              <FlexeeSlider />
              <FlexeeTestimonials />
              <FlexeeValues />
              <FlexeeDecisionPreview />
              <FlexeeFooter />
          </div>
        }
      />

      <Route
        exact
        path="/procurement"
        element={
          <div className="procurement  h-screen">
            <PrivateRoute>
            <BackOfficeNavbar />
              <Sidebar />
              <Procurement_Decisions />{" "}
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/Dashboard"
        element={
          <div className="procurement  h-screen">
            <PrivateRoute>
              <Sidebar />
              <BackOfficeNavbar />
              <Analytics />{" "}

            </PrivateRoute>
          </div>
        }
      />
      <Route
        exact
        path="/joinnow"
        element={
          <div className="procurement  h-screen">
            <PrivateRoute>
              <JoinNow />{" "}
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/manufacture"
        element={
          <div className="manufacturing  h-screen ">
            <PrivateRoute>
            <BackOfficeNavbar />
            <Sidebar />
              <Manufacturing_Decisions />
            </PrivateRoute>{" "}
          </div>
        }
      />

      <Route
        exact
        path="/landingpage"
        element={
          <div className="manufacturing  h-screen ">
            {/* <PrivateRoute> */}
            <LandingPage />
            {/* </PrivateRoute>{" "} */}
          </div>
        }
      />

      <Route
        exact
        path="/distribution"
        element={
          <div className="distribution  h-screen ">
            <PrivateRoute>
            <BackOfficeNavbar />
            <Sidebar />
              <Distribution_Decision />
            </PrivateRoute>{" "}
          </div>
        }
      />

      <Route
        exact
        path="/transport"
        element={
          <div className="transportation  h-screen ">
            <PrivateRoute>
            <BackOfficeNavbar />
            <Sidebar />
              <Transportation_Decision />
            </PrivateRoute>{" "}
          </div>
        }
      />

      <Route
        exact
        path="/service"
        element={
          <div className="service  h-screen">
            <PrivateRoute>
              {" "}
            <BackOfficeNavbar />
              <Sidebar />
              <Service_Decision />
            </PrivateRoute>{" "}
          </div>
        }
      />

      <Route
        exact
        path="/demand"
        element={
          <div className="demand  h-screen ">
            <PrivateRoute>
            <BackOfficeNavbar />
            <Sidebar />
              <Demand_generation />
            </PrivateRoute>{" "}
          </div>
        }
      />

      <Route
        exact
        path="/forecast"
        element={
          <div className="forecast  h-screen ">
            <PrivateRoute>
            <BackOfficeNavbar />
            <Sidebar/>
              <Forecast />
            </PrivateRoute>{" "}
          </div>
        }
      />

      <Route
        exact
        path="/it"
        element={
          <div className="it  h-screen">
            <PrivateRoute>
            <BackOfficeNavbar />
            <Sidebar />
            <IT />
            </PrivateRoute>{" "}
          </div>
        }
      />

      <Route
        exact
        path="/admin"
        element={
          <div className="admin  h-screen">
            <Admin />
          </div>
        }
      />

      <Route
        exact
        path="/signin"
        element={
          <div className="signin  h-screen">
            <PrivateRoute>
              <Signin />{" "}
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/signup"
        element={
          <div className="signup  h-screen">
            <Signup />{" "}
          </div>
        }
      />

      <Route
        exact
        path="/adminsidelive"
        element={
          <div className="signup  h-screen">
            <PrivateRoute>
              <AdminSideLive />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/adminsideended"
        element={
          <div className="signup  h-screen">
            <PrivateRoute>
              <AdminSideEnded />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/usersidelive"
        element={
          <div className="signup  h-screen">
            <PrivateRoute>
            
            <BackOfficeNavbar />
              <UserSideLive />
            </PrivateRoute>
          </div>
        }
      />

      <Route
        exact
        path="/usersideended"
        element={
          <div className="signup  h-screen">
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
          <div className="signup  h-screen">
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
              {" "}
              <PrivateRoute>
                <AdminNavBar />
              </PrivateRoute>
            </div>

            <Steps
              setNoOfQuarters={setNoOfQuarters}
              noOfQuarters={noOfQuarters}
            />
            {""}
          </div>
        }
      />

      {/* <FlexeeSimRoutes /> */}

      <Route
          exact
          path="/flexeesim/"
          element={
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
          }
        />
        <Route
          exact
          path="/flexeesim/aboutus"
          element={
            <div className="pt-20">
              <FlexeeNavbar />
              <FlexeeAboutUs />
              <FlexeeFooter />
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/features"
          element={
            <div className="pt-20">
              <FlexeeNavbar /> <FlexeeFeatures />
              <FlexeeFooter />
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/preview"
          element={
            <div className="pt-20">
              <FlexeeNavbar />
              <FlexeeDecisionPreview />
              <FlexeeFooter />
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/dashboard"
          element={
            <div className="mt-52">
              <FlexeeDashboardNavbar />
              <FlexeeDashboard />
              <FlexeeExploreSim />
              <FlexeeFooter />
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/backoffice"
          element={
            <div className="">
              <FlexeeBackOfficeConnecting />
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/backoffice/user"
          element={
            <div className="">
              <div className="flex justify-start items-start ">
                {isSideBarOpen && <FlexeeBackOfficeSidebar />}

                <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
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
              <div className={`w-full  ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                <FlexeeBackOfficeFooter />
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/backoffice/rankings"
          element={
            <div className="">
              <div className="flex justify-start items-start ">
                {isSideBarOpen && <FlexeeBackOfficeSidebar />}

                <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
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
              <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                <FlexeeBackOfficeFooter />
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/backoffice/reports"
          element={
            <div className="">
              <div className="flex justify-start items-start ">
                {isSideBarOpen && <FlexeeBackOfficeSidebar />}

                <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
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
              <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                <FlexeeBackOfficeFooter />
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/backoffice/faqs"
          element={
            <div className="">
              <div className="flex justify-start items-start ">
                {isSideBarOpen && <FlexeeBackOfficeSidebar />}

                <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
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
              <div className={`w-full ${isSideBarOpen ? "ml-60 " : "ml-0"}`}>
                <FlexeeBackOfficeFooter />
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/dashboard/courses"
          element={
            <div className="mt-48">
              <FlexeeDashboardNavbar />
              <FlexeeCourseComponent />
              <FlexeeGroupsTeamsComponent />
              {/* <FlexeeStudentRequest /> */}
              <FlexeeFooter />
            </div>
          }
        />
        <Route
          exact
          path="/flexeesim/register"
          element={
            <div className="">
              <FlexeeRegister />
            </div>
          }
        />
    </Routes>
  );
};

export default MainRoutes;
