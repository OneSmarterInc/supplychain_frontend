import { Text } from "@chakra-ui/react";
import React from "react";
import Chart from "react-apexcharts"; // Ensure you've installed react-apexcharts
import { useNavigate } from "react-router-dom";

const PlayComponent = ({ id, batch, startDate, endDate, currentQuarter }) => {
  let navigate = useNavigate();
  let simid = localStorage.getItem("selectedSimulation");
  let simData = localStorage.getItem("simData");
  simData = JSON.parse(simData);

  const filteredSimulation = simData.filter(
    (item) => item.simulation_id === parseInt(simid)
  );
  localStorage.setItem("selectedSim", JSON.stringify(filteredSimulation));

  function handleSubmit() {
    // Perform some action
    const saveData = (id) => {
      localStorage.setItem("selectedSimulation", JSON.stringify(id));
    };
    saveData(id);
    navigate("/forecast"); // navigate to a success page
  }

  return (
    <div className="flex h-80 bg-slate-200 justify-around items-center mx-10 rounded-lg border-2 border-neutral-600">
      <div className="info">
        <h2 className="text-3xl p-2 underline underline-offset-1">
          {batch} |
          <span className="text-3xl p-2">
            Current Quarter : {currentQuarter}
          </span>
        </h2>
        <p className="text-base p-2">
          start Date {startDate} | End Date{endDate}
        </p>
        <div className="buttons my-2">
          <button
            className="w-32 h-10 rounded-lg bg-blue-600 text-white text-center p-2 mx-2 hover:bg-sky-950"
            onClick={handleSubmit}
          >
            Enter
          </button>
          <button className="w-28 h-10 rounded-lg bg-green-600 text-white text-center p-2 hover:bg-green-700">
            Reports
          </button>
        </div>
      </div>
      <div className="graph">
        <div className="mixed-chart pt-4">
          {/* <Chart options={options} series={series} type="area" width="450" /> */}
        </div>
      </div>
    </div>
  );
};

export default PlayComponent;
