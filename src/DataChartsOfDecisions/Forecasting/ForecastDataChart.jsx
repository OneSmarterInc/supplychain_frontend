import React, { useContext, useState } from "react";
import Chart from "react-apexcharts";
import { HStack, Select } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ForecastPreview from "../../Components/Previews/ForecastPreview";
import MyContext from "../../Components/ContextApi/MyContext";
import ReportModal from "../../report/ReportModal";


const ForecastDataChart = ({
  submitForecast,
  ForecastHyperware,
  ForecastMetaware,
}) => {


  
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstDropdownValue, setFirstDropdownValue] = useState('1');
  const [secondDropdownValue, setSecondDropdownValue] = useState('cpl');
  const { api } = useContext(MyContext);

  const location = useLocation();
  const path = location.pathname;
 
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 
 
 
  let simData = localStorage.getItem("selectedSim");
  simData = JSON.parse(simData);
  let user = localStorage.getItem('user');
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
  const handleButtonClick = async () => {
    // Construct the query parameters
    const queryParams = new URLSearchParams({
      simulation_id: simData[0].simulation_id,
      quarter: firstDropdownValue,
      firm: simData[0].firm_data[user]
    }).toString();
  
    // Append the query parameters to the URL
    const url = `${api}/reports/${secondDropdownValue}/?${queryParams}`;
  
    // Make a GET request with the constructed URL
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    const data = await response.json();
    console.log(data);  // Process your data here
  };
  

  return (
    <div className="app">
      <div className="row mx-5">
        <div className="mixed-chart flex">
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
            {/* Modal ends */}
          </div>
        </div>

        <HStack spacing={3} ml={9}>
          <Select width="165px" border="1px solid black" onChange={(e) => setFirstDropdownValue(e.target.value)}>
            {option}
          </Select>
          <Select width="165px" border="1px solid black" onChange={(e) => setSecondDropdownValue(e.target.value)}>
            <option value="cpl">Corporate P&L Statement </option>
            <option value="hpl">Historical Corporate P&L Statement</option>
            <option value="hpls">Hyperware P&L Statement</option>
            <option value="mpls">Metaware P&L Statement</option>
            <option value="bl">Balance Sheet</option>
            <option value="cfar">Cash FLow Analysis Report</option>
            <option value="fgir">FINISHED GOODS INVENTORY REPORT</option>
            <option value="pir">PROCUREMENT INVENTORY REPORT</option>
            <option value="odvr">OTHER DECISION VARIABLES REPORT</option>
            <option value="far">FORECASTING ACCURACY REPORT</option>
          </Select>
          {/* <button className="h-10  bg-gray-700 text-white  hover:bg-slate-800 text-xl text-center cursor-pointer rounded-lg   p-1.5 w-24 " onClick={handleButtonClick}>
            View
          </button> */}
      <ReportModal />
        </HStack>
      </div>
    </div>
  );
};

export default ForecastDataChart;
