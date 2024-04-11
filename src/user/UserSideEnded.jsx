import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import UserNavBar from "../Components/UserNavBar";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useToast } from "@chakra-ui/react";

const UserSideEnded = () => {
  const { api } = useContext(MyContext);
  document.body.style.backgroundColor = "#e0e2e4";
  // eslint-disable-next-line
  const [options, setOptions] = useState({
    chart: {
      id: "area-chart",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });
  // eslint-disable-next-line
  const [series, setSeries] = useState([
    {
      name: "Units Sold",
      data: [
        1276, 2386, 3649, 7066, 11132, 30000, 55000, 65526, 56523, 85000, 90236,
        100000,
      ],
    },
  ]);

  useEffect(() => {
    getAllData();
  }, []);
  const [simData, setSimData] = useState([]);
  console.log("SimData-", simData);
  const toast = useToast();
  const user = JSON.parse(localStorage.getItem("user"));
  // const userId = user.userid;
  // const LogedInUserEmail = user.useremail;
  const userId = 3;
  const LogedInUserEmail = "nachikettekade01@gmail.com";

  const getAllData = async () => {
    try {
      const response = await axios.get(
        `${api}/all_simulation/?user_id=${userId}`
      );
      console.log(response.status);
      if (response.status === 200) {
     
        console.log("AllData", response.data);
        const serializedValue = JSON.stringify(response.data);
        setSimData(response.data);
        toast({
          title: "UserSide Ended Simulation Data",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("simData", serializedValue);
      }
    } catch (error) {}
  };

  return (
    <div>
      <UserNavBar />
      <h2 className="text-3xl p-2 pl-10 ">Ended Simulation</h2>
      <div className="flex h-80 bg-slate-200 justify-around items-center mx-10 rounded-lg  border-2 border-neutral-600">
        <div className="info">
          <h2 className="text-3xl p-2 underline underline-offset-1">
            MBA-Batch 2023 |
            <span className="text-3xl p-2">Current Quarter: 6</span>
          </h2>

          <div className="buttons my-2">
            <button className="w-32 h-10 rounded-lg  bg-blue-600 text-white text-center p-2 mx-2 hover:bg-sky-950">
              Results
            </button>
            <button className="w-28 h-10 rounded-lg  bg-green-600 text-white text-center p-2 hover:bg-green-700">
              Reports
            </button>
          </div>
        </div>
        <div className="graph ">
          <div className="mixed-chart pt-4">
            <Chart
              options={options}
              series={series}
              type="area"
              width="450"
         
            />
          </div>
        </div>
      </div>

      <div className="bg-red-200 p-2">
        <table className="table-auto mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Decision Opens</th>
              <th className="px-4 py-2">Decision Closes</th>
              <th className="px-2 py-2">Total Quarters</th>
              <th className="px-4 py-2">Firms</th>
              <th className="px-4 py-2">Firm Data User</th>
              <th className="px-4 py-2">My Firm</th>
            </tr>
          </thead>
          <tbody>
            {simData &&
              simData
                .filter((item) =>(item.is_active===false))
                .map((item, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.start_date}</td>
                    <td className="border px-4 py-2">{item.end_date}</td>
                    <td className="border px-4 py-2">{item.decision_open}</td>
                    <td className="border px-4 py-2">{item.decision_close}</td>
                    <td className="border px-4 py-2 text-center">{item.total_quarters}</td>
                    <td className="border px-4 py-2  text-center">{item.firms}</td>
                    <td className="border px-4 py-2">
                      {Object.keys(item.firm_data).filter(
                        (item) => item === LogedInUserEmail
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      {item.firm_data[LogedInUserEmail]}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserSideEnded;
