import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { HStack, Select } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ReportComponent from "../report/ReportComponent";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import CommonGraph from "./CommonGraph";

const ITDataChart = ({ submitIt, suppliers, reportValues }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;
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
      firm_key_new = firm_obj[0].firmName; // note: only one user in one firm so using firm_obj[0]
    }
  }

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
      name: "Net Income",
      data: [],
    },
  ]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api}/graph/`, {
        params: {
          simulation_id: selectedSim[0].simulation_id, // replace with actual simulation_id
          firm_key: firm_key_new // replace with actual firm_key
        }
      });
      const data = response.data;

      // Format the categories to prepend "Q"
      const formattedCategories = data.quarter.map((quarter) => `Q${quarter}`);

      // Flatten the net_income arrays, remove placeholders, and round up the values
      const netIncome = data.net_income.map(incomeArray => 
        incomeArray.filter(value => value !== "-").map(value => Math.ceil(Number(value)))
      ).flat();

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: formattedCategories,
        },
      }));

      setSeries([
        {
          name: "Net Income",
          data: netIncome,
        },
      ]);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = () => {
    if (path === "/it") {
      submitIt();
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
          {/* <Chart options={options} series={series} type="area" width="510" /> */}
          <CommonGraph/>
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

              <button
                onClick={onSubmit}
                className="h-10 w-28 bg-green-700 text-white text-center rounded-lg  p-1.5 hover:bg-green-800 m-2 text-xl cursor-pointer"
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

export default ITDataChart;
