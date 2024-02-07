import Demand_generation from "./Demand_generation";
import Distribution_Decision from "./Distribution_Decision";
import Forecast from "./Forecast";
import Home from "./Home";
import IT from "./IT";
import Manufacturing_Decisions from "./Manufacturing_Decisions";
import Procurement_Decisions from "./Procurement_Decisions";
import Service_Decision from "./Service_Decision";
import Transportation_Decision from "./Transportation_Decision";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
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
      </Router>
    </>
  );
}

export default App;
