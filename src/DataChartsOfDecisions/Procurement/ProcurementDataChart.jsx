import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { HStack, Select } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import ProcurementPreview from "../../Components/Previews/ProcurementPreview";
import axios from "axios";
import MyContext from "../../Components/ContextApi/MyContext";
import ReportComponent from "../../report/ReportComponent";

const ProcurementDataChart = ({ updatedDCData, submitProcurement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const [graphData, setGraphData] = useState({
    indicators: [],
    values: [],
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [options, setOptions] = useState({
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: [],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Units Sold",
      data: [],
    },
  ]);

  useEffect(() => {
    getChartData();
  }, []);

  useEffect(() => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      xaxis: {
        categories: graphData?.indicators,
      },
    }));
    setSeries([
      {
        name: "Units Sold",
        data: graphData?.values,
      },
    ]);
  }, [graphData]);

  const { api } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));
  const firm_data = Object.keys(selectedSim[0]?.firm_data)[0];
  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {

      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; //note: only one user in one firm so using firm_obj[0]
    }
  }
  console.log("Firm Key Procurement Data Live Sim: -------", firm_key_new);

  const getChartData = async () => {
    try {
      const response = await axios.get(
        `${api}/procurement_graph/?simulation_id=${
          selectedSim[0].simulation_id
        }&current_quarter=${7}&firm_key=${firm_key_new}`
      );
      console.log(response.status);
      if (response.status === 200) {
        console.log("ProcurementGraph:--", response.data.indicators);
        setGraphData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = () => {
    if (path === "/procurement") {
      submitProcurement();
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
                className="h-10 w-28 bg-gray-700 text-white rounded-lg p-1 hover:bg-slate-800 m-2 text-xl cursor-pointer"
                type="button"
              >
                Preview
              </button>

              {isModalOpen && (
                <>
                  {" "}
                  {path === "/procurement" && (
                    <ProcurementPreview
                      toggleModal={toggleModal}
                      updatedDCData={updatedDCData}
                    />
                  )}
                </>
              )}

              <button
                onClick={onSubmit}
                className="h-10 w-28 bg-green-700 text-white text-center rounded-lg p-1.5 hover:bg-green-800 m-2 text-xl cursor-pointer"
              >
                Submit
              </button>
            </div>
            {/* Modal ends */}
          </div>
        </div>
        
        <ReportComponent />
      </div>
    </div>
  );
};

export default ProcurementDataChart;
