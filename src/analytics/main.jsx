import { Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Financial from "./Financial";
import MyContext from "../Components/ContextApi/MyContext";
import axios from "axios";
import { Button } from "@material-tailwind/react";

const Analytics = () => {
  const navigate = useNavigate();
  const {api}= useContext(MyContext);
  const [dashboardData, setDashBoardData] = useState({
    "financialData": [],
    "operationalData": [],
    "customerData": [],
    "externalData": []
});



  const selectedSimData =
    JSON.parse(localStorage.getItem("selectedSimData")) || {};
  
  const [selectedQuarter, setSelectedQuarter] = useState(selectedSimData[0].current_quarter-1);

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const getData = async () => {
    try {
      const response = await axios.get(`${api}/dashboard/${selectedSimData[0].simulation_id}/${firm_key_new}/${selectedQuarter}/`);

      setDashBoardData(response.data);
      console.log(dashboardData.financialData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  let firm_key_new = "";
  if (

    selectedSimData[0]?.firm_data &&
    Array.isArray(selectedSimData[0].firm_data)
  ) {
    let firm_obj = selectedSimData[0].firm_data.filter((item) => {
      console.log(item.emails, user.email);
      
      return item.emails && item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName;
    }
  }

  const getTextColorForMetric = (value, worst, avg, best) => {
    if (value >= avg && value <= best) return "text-green-600";
    if (value >= worst && value < avg) return "text-orange-500";
    return "text-red-600";
  };

  
  useEffect(() => {
    getData();
  }, [selectedQuarter]);

  const financialData = dashboardData.financialData;
  const operationalData = dashboardData.operationalData;
  const customerData = dashboardData.customerData;
  const externalData = dashboardData.externalData;
  

  const handleSectionRedirect = (section) => {
    switch (section) {
      case "financial":
        navigate("/financial");
        break;
      case "operational":
        navigate("/operational");
        break;
      case "customer":
        navigate("/customer");
        break;
      case "external":
        navigate("/external");
        break;
      default:
        break;
    }
  };
const trigger = async () =>{
const response = await axios.get(`${api}/trigger/?simulation_id=${selectedSimData[0].simulation_id}`);
selectedSimData[0].current_quarter = response.data[0];
localStorage.setItem("selectedSimData", JSON.stringify(selectedSimData));
alert("updated");

}
  return (
    <div className="w-3/5 mx-auto font-sans h-[100%] mb-4 " >
      
      <Button onClick={trigger}>Trigger </Button>

      <Text className="text-center text-lg text-gray-700 font-semibold mt-0.5">
        Course : <span className="text-red-600"> {selectedSimData[0].course} </span> | Your Team
        : <span className="text-red-600">{firm_key_new}</span>
      </Text>
      <hr />
      <p className="text-center text-lg text-gray-700 font-semibold mt-0.5">
        PERFORMANCE DASHBOARD
      </p>
      <hr />

      <div className="flex items-center justify-between mt-1">
        <div className="flex space-x-2">
          <p className="text-center text-lg text-gray-700 font-semibold ">
            Quarter :
          </p>
          {Array.from({ length: selectedSimData[0].current_quarter -1  }, (_, i) => (
            <div
              key={i + 1}
              onClick={() => setSelectedQuarter(i + 1)}
              className={`flex items-center justify-center w-6 h-6 rounded-full border-2 cursor-pointer  mt-0.8
          ${
            selectedQuarter === i + 1
              ? "bg-gradient-to-r from-red-500 to-red-700 text-white border-red-600"
              : "bg-gray-100 text-gray-600 border-gray-400"
          } transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <button
          className="bg-gradient-to-r from-red-500 to-red-600 text-white py-1 m-1 px-2 rounded hover:scale-105 transition-all duration-300 ease-in-out"
          onClick={() => navigate("/Forecast")}
        >
          Decisions <i className="fas fa-arrow-up-right-from-square ml-2"></i>
        </button>
      </div>
      <p className="text-center text-sm text-red-700 ">
        Note: To view the detailed dashboard, click on the metric headings
        (e.g., Financial).
      </p>

      <div className="overflow-x-auto  rounded-lg border border-gray-200">
        <table className="min-w-full text-sm  text-gray-800 border-collapse bg-white rounded-lg font-bold text-center align-middle">
          <thead className="bg-gradient-to-r from-gray-200 to-gray-300 ">
            <tr className="font-normal">
              <th className="pl-4 align-left text-left">Measures</th>
              <th className="p-2 align-middle">{firm_key_new} </th>
              <th className="p-2 align-middle">Worst</th>
              <th className="p-2 align-middle">Average</th>
              <th className="p-2 align-middle">Best</th>
            </tr>
          </thead>
          <tbody>
            {/* Financial Section */}
            <tr
              onClick={() => handleSectionRedirect("financial")}
              className="cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <th
                colSpan="5"
                className="py-2 px-2 text-red-700 bg-gray-50 font-bold uppercase text-sm shadow-inner"
              >
                <div className="flex justify-between items-center">
                  <span>
                    <i className="fas fa-chart-line mr-2"></i>
                    Financial
                  </span>
                  <i className="fas fa-arrow-up-right-from-square pr-2"></i>
                </div>
              </th>
            </tr>
            {financialData.map((item, index) => (
              <tr
                key={index}
                className={`border-b-2 hover:bg-gray-50 transition-all duration-300 ${
                  index % 2 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3  text-left align-left pl-4">{item.label}</td>
                <td
                  className={`p-3  ${getTextColorForMetric(
                    item.value,
                    item.worst,
                    item.avg,
                    item.best
                  )} font-bold`}
                >
                  {item.value}%
                </td>
                <td className="p-3 align-middle">{item.worst}%</td>
                <td className="p-3 align-middle">{item.avg}%</td>
                <td className="p-3 align-middle">{item.best}%</td>
              </tr>
            ))}

            {/* Operational Section */}
            <tr
              onClick={() => handleSectionRedirect("operational")}
              className="cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <th
                colSpan="5"
                className="py-2 px-2 text-red-700 bg-gray-50 font-bold uppercase text-sm "
              >
                 <div className="flex justify-between items-center">
                  <span>
                  <i className="fas fa-cogs mr-2"></i>
                  Operational
                  </span>
                  <i className="fas fa-arrow-up-right-from-square  pr-2"></i>
                </div>
               
              </th>
            </tr>
            {operationalData.map((item, index) => (
              <tr
                key={index}
                className={`border-b-2 hover:bg-gray-50 transition-all duration-300 ${
                  index % 2 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3  text-left align-left pl-4">{item.label}</td>
                <td
                  className={`p-3 ${getTextColorForMetric(
                    item.value,
                    item.worst,
                    item.avg,
                    item.best
                  )} font-bold`}
                >
                  {item.value} %
                </td>
                <td className="p-3 align-middle">{item.worst}%</td>
                <td className="p-3 align-middle">{item.avg}%</td>
                <td className="p-3 align-middle">{item.best}%</td>
              </tr>
            ))}

            {/* Customer Section */}
            <tr
              onClick={() => handleSectionRedirect("customer")}
              className="cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <th
                colSpan="5"
                className="py-2 px-2 text-red-700 bg-gray-50 font-bold uppercase text-sm "
              >
              <div className="flex justify-between items-center">
                  <span>
                <i className="fas fa-users mr-2"></i>
                Customer 
                  </span>
                  <i className="fas fa-arrow-up-right-from-square  pr-2"></i>
                </div> 
              </th>
            </tr>
            {customerData.map((item, index) => (
              <tr
                key={index}
                className={`border-b-2 hover:bg-gray-50 transition-all duration-300 ${
                  index % 2 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3  text-left align-left pl-4">{item.label}</td>
                <td
                  className={`p-3 ${getTextColorForMetric(
                    item.value,
                    item.worst,
                    item.avg,
                    item.best
                  )} font-bold`}
                >
                  {item.value}%
                </td>
                <td className="p-3 align-middle">{item.worst}%</td>
                <td className="p-3 align-middle">{item.avg}%</td>
                <td className="p-3 align-middle">{item.best}%</td>
              </tr>
            ))}

            {/* External Section */}
            <tr
              // onClick={() => handleSectionRedirect("external")}
              className=" hover:bg-gray-100 transition-all duration-300 ease-in-out"
            >
              <th
                colSpan="5"
                className="py-2 px-2 text-red-700 bg-gray-50 font-bold uppercase text-sm   text-left align-left"
              >
                <i className="fas fa-globe mr-2"></i>
                External 
              </th>
            </tr>
            {externalData.map((item, index) => (
              <tr
                key={index}
                className={`border-b-2 hover:bg-gray-50 transition-all duration-300 ${
                  index % 2 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3  text-left align-left pl-4">{item.label}</td>
                <td
                  className={`p-3 ${getTextColorForMetric(
                    item.value,
                    item.worst,
                    item.avg,
                    item.best
                  )} font-semibold`}
                >
                  {item.value}
                </td>
                <td className="p-3 align-middle">{item.worst}</td>
                <td className="p-3 align-middle">{item.avg}</td>
                <td className="p-3 align-middle">{item.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
