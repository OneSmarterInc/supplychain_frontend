import Demand_generation from "./Demand_generation";
import Distribution_Decision from "./Distribution_Decision";
import Forecast from "./Forecast";
import IT from "./IT";
import Manufacturing_Decisions from "./Manufacturing_Decisions";
import Procurement_Decisions from "./Procurement_Decisions";
import Service_Decision from "./Service_Decision";
import Transportation_Decision from "./Transportation_Decision";

function App() {
  return (
    <>
      <div className="Procurement_Decisions h-screen">
        <Procurement_Decisions />
      </div>
      <div className="Procurement_Decisions py-2 h-screen mt-8">
        <Manufacturing_Decisions />
      </div>
      <div className="Procurement_Decisions py-2 h-screen mt-16">
        <Distribution_Decision/>
      </div>
      <div className="Procurement_Decisions py-2 h-screen ">
        <Transportation_Decision/>
      </div>
      <div className="Procurement_Decisions py-2 h-screen mt-8">
        <Service_Decision/>
      </div>
      <div className="demand py-2 h-screen mt-14" >
        <Demand_generation />
      </div>
      <div className="Forecast py-2 h-screen mt-14">
        <Forecast />
      </div>
      <div className="IT py-2 h-screen mt-4 ">
        <IT />
      </div>
     
    </>
  );
}

export default App;
