import Demand_generation from "./decisions/Demand_generation";
import Distribution_Decision from "./decisions/Distribution_Decision";
import Forecast from "./decisions/Forecast";
import Home from "./Pages/Home";
import IT from "./decisions/IT";
import Manufacturing_Decisions from "./decisions/Manufacturing_Decisions";
import Procurement_Decisions from "./decisions/Procurement_Decisions";
import Service_Decision from "./decisions/Service_Decision";
import Transportation_Decision from "./decisions/Transportation_Decision";
import Admin from "./Components/Admin";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Create_sim from "../src/createSimulation/Create_sim";
import AdminSideLive from "./admin/AdminSideLive";
import AdminSideEnded from "./admin/AdminSideEnded";
import UserSideLive from "./user/UserSideLive";
import UserSideEnded from "./user/UserSideEnded";
import { useState } from "react";
import QuarterDetails from "./createSimulation/QuarterDetails";
import Stepper from "./createSimulation/Steps";
import Steps from "./createSimulation/Steps";
import AdminNavBar from "./Components/AdminNavBar";

function App() {
  const [noOfQuarters, setNoOfQuarters] = useState();
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="home h-screen">
                <Home />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/procurement"
            element={
              <div className="procurement  h-screen">
                <Procurement_Decisions />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/manufacturing"
            element={
              <div className="manufacturing  h-screen ">
                <Manufacturing_Decisions />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/distribution"
            element={
              <div className="distribution  h-screen ">
                <Distribution_Decision />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/transportation"
            element={
              <div className="transportation  h-screen ">
                <Transportation_Decision />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/service"
            element={
              <div className="service  h-screen">
                <Service_Decision />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/demand"
            element={
              <div className="demand  h-screen ">
                <Demand_generation />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/forecast"
            element={
              <div className="forecast  h-screen ">
                <Forecast />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/it"
            element={
              <div className="it  h-screen">
                <IT />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/admin"
            element={
              <div className="admin  h-screen">
                <Admin />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/signin"
            element={
              <div className="signin  h-screen">
                <Signin />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/signup"
            element={
              <div className="signup  h-screen">
                <Signup />{" "}
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/adminsidelive"
            element={
              <div className="signup  h-screen">
                <AdminSideLive />
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/adminsideended"
            element={
              <div className="signup  h-screen">
                <AdminSideEnded />
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/usersidelive"
            element={
              <div className="signup  h-screen">
                <UserSideLive />
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/usersideended"
            element={
              <div className="signup  h-screen">
                <UserSideEnded />
              </div>
            }
          />
        </Routes>
        <Routes>
          <Route
            exact
            path="/createsim"
            element={
              <div className="createsim h-screen">
                <div className="navbar pb-4">
                  {" "}
                  <AdminNavBar />
                </div>

                <Steps
                  setNoOfQuarters={setNoOfQuarters}
                  noOfQuarters={noOfQuarters}
                />
                {""}
              </div>
            }
          />
        </Routes>
        {/* <Routes>
          <Route
            exact
            path="/createsim"
            element={
              <div className="createsim h-screen">
              <Steps/>
                <Create_sim setNoOfQuarters={setNoOfQuarters} />
                {""}
              </div>
            }
          />
        </Routes>
 
        <Routes>
          <Route
            exact
            path="/quarterdetails"
            element={
              <div className="createsim h-screen">
                <QuarterDetails noOfQuarters={noOfQuarters} />
                {""}
              </div>
            }
          />
        </Routes> */}
      </Router>
    </>
  );
}

export default App;
