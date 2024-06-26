import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useLocation } from "react-router-dom";
import ForecastPreview from "../../Components/Previews/ForecastPreview";
import MyContext from "../../Components/ContextApi/MyContext";
import axios from "axios";
import ReportComponent from "../../report/ReportComponent";

const ForecastDataChart = ({
  submitForecast,
  ForecastHyperware,
  ForecastMetaware,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState("1");
  const [secondDropdownValue, setSecondDropdownValue] = useState("");

  const { api } = useContext(MyContext);

  const location = useLocation();
  const path = location.pathname;

  let simData = localStorage.getItem("selectedSim");
  simData = JSON.parse(simData);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  user = user.email;
  let firm_key_new = "";
  if (simData[0]?.firm_data.length) {
    let firm_obj = simData[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }

  const option = [];
  for (let i = 1; i <= simData[0].current_quarter; i++) {
    option.push(
      <option key={i} value={i}>
        Select Quarter {i}
      </option>
    );
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [options, setOptions] = useState({
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "Units Sold",
      data: [1500, 1560, 1700, 1880, 1970, 2160, 1955],
    },
  ]);

  const onSubmit = () => {
    if (path === "/forecast") {
      submitForecast();
    }
  };

  return (
    <div className="app">
      <div className="row mx-5">
        <div className="mixed-chart flex">
          <div className="w-[510px] h-60">
            {" "}
            {/* temporary div, then remove */}
          </div>
          <Chart options={options} series={series} type="area" width="510" />
          {/* Preview, Reports and submit buttons */}
          <div className="flex flex-col w-[210px] justify-evenly">
            {/* Modal start */}
            <div className="modal-start flex flex-col">
              <button
                onClick={toggleModal}
                data-modal-target="small-modal"
                data-modal-toggle="small-modal"
                className="h-10 w-28 bg-gray-700 text-white rounded-lg  p-1 hover:bg-slate-800 m-2 text-xl cursor-pointer"
                type="button"
              >
                Preview
              </button>

              {isModalOpen && (
                <>
                  {path === "/forecast" && (
                    <ForecastPreview
                      toggleModal={toggleModal}
                      ForecastHyperware={ForecastHyperware}
                      ForecastMetaware={ForecastMetaware}
                    />
                  )}
                </>
              )}

              <button
                onClick={onSubmit}
                className="h-10 w-28 bg-green-700 text-white text-center rounded-lg  p-1.5 hover:bg-green-800 m-2 text-xl cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <ReportComponent />
      </div>
    </div>
  );
};

export default ForecastDataChart;
