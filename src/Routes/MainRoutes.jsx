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

const MainRoutes = () => {
  const [noOfQuarters, setNoOfQuarters] = useState();
  return (
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

      <Route
        exact
        path="/procurement"
        element={
          <div className="procurement  h-screen">
            <PrivateRoute>
              <Procurement_Decisions />{" "}
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
        path="/manufacturing"
        element={
          <div className="manufacturing  h-screen ">
            <PrivateRoute>
              <Manufacturing_Decisions />
            </PrivateRoute>{" "}
          </div>
        }
      />

      <Route
        exact
        path="/distribution"
        element={
          <div className="distribution  h-screen ">
            <PrivateRoute>
              <Distribution_Decision />
            </PrivateRoute>{" "}
          </div>
        }
      />

      <Route
        exact
        path="/transportation"
        element={
          <div className="transportation  h-screen ">
            <PrivateRoute>
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
    </Routes>
  );
};

export default MainRoutes;
