import React, { useContext, useState } from "react";
import Chart from "react-apexcharts";
import { HStack, Select } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ForecastPreview from "../../Components/Previews/ForecastPreview";
import MyContext from "../../Components/ContextApi/MyContext";
import ReportModal from "../../report/ReportModal";
import axios from "axios";
import EvaluationReportModal from "../../report/EvaluationReport/EvaluationReportModal";

const ForecastDataChart = ({
  submitForecast,
  ForecastHyperware,
  ForecastMetaware,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState("1");
  const [secondDropdownValue, setSecondDropdownValue] = useState("cpl");
  const [reportData, setReportData] = useState();
  const { api } = useContext(MyContext);

  const location = useLocation();
  const path = location.pathname;

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  let simData = localStorage.getItem("selectedSim");
  simData = JSON.parse(simData);
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  user = user.email;

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
  console.log(secondDropdownValue);

  const handleQuarterSelectChange = (e) => {
    setFirstDropdownValue(e.target.value);
  };

  // const handleReportSelectChange = (e) => {
  //   setSecondDropdownValue(e.target.value);
  //   if (secondDropdownValue === e.target.value) {
  //     handleButtonClick();
  //   }
  // };

  const handleButtonClick = async (e) => {
    // Construct the query parameters
    const queryParams = new URLSearchParams({
      simulation_id: simData[0].simulation_id,
      quarter: firstDropdownValue,
      firm: Object.keys(simData[0]?.firm_data)[0],
    }).toString();

    // Append the query parameters to the URL
    const url = `${api}/reports/${e.target.value}/?${queryParams}`;

    // Make a GET request with the constructed URL
    try {
      const response = await axios.get(url);
      console.log("POST request successful", response.data);
      localStorage.setItem("reportData", JSON.stringify(reportData));
    } catch (error) {
      console.error("Error making POST request:", error);
    }
  };

  console.log("REPORT_DATA:", reportData);

  return (
    <div className="app">
      <div className="row mx-5">
        <div className="mixed-chart flex">
          <div className="w-[510px] h-60">
            {" "}
            {/* temporary div, then remove */}
          </div>
          {/* <Chart options={options} series={series} type="area" width="510" /> */}
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
            {/* Modal ends */}
          </div>
        </div>

        <HStack spacing={3} ml={9}>
          <Select
            width="165px"
            border="1px solid black"
            onChange={(e) => handleQuarterSelectChange(e)}
          >
            {option}
          </Select>
          <Select
            width="165px"
            border="1px solid black"
            onChange={(e) => handleButtonClick(e)}
          >
            <option value="cpl">Corporate P&L Statement </option>
            <option value="hpl">Historical Corporate P&L Statement</option>
            <option value="pcpl">Hyperware P&L Statement</option>
            <option value="mpls">Metaware P&L Statement</option>
            <option value="bl">Balance Sheet</option>
            <option value="cfar">Cash FLow Analysis Report</option>
            <option value="inventory">FINISHED GOODS INVENTORY REPORT</option>
            <option value="pir">PROCUREMENT INVENTORY REPORT</option>
            <option value="odvr">OTHER DECISION VARIABLES REPORT</option>
            <option value="far">FORECASTING ACCURACY REPORT</option>
          </Select>
       
          {/* <ReportModal /> */}
          <EvaluationReportModal/>
        </HStack>
      </div>
    </div>
  );
};

export default ForecastDataChart;
