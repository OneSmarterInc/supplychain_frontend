import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import UserNavBar from "../Components/UserNavBar";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";
import { useToast } from "@chakra-ui/react";
import PlayComponent from "./live_simulation_function";
import UserLoggerApi from "../LoggerApis/UserLoggerApi";

const UserSideLive = () => {
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

  const userId = user.userid;
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
        localStorage.setItem("simData", serializedValue);
      }
    } catch (error) {}
  };

  return (
    <div>
      <UserNavBar />
      <h2 className="text-3xl p-2 pl-10 ">Live Simulation</h2>
      {simData
        .filter((item) => item.is_active === true)
        .reverse()
        .map((item, index) => (
          <PlayComponent
            key={index}
            id={item.simulation_id}
            batch={item.name}
            startDate={item.start_date}
            endDate={item.end_date}
            time={item.time}
            currentQuarter={item.current_quarter}
            firm_data = {item?.firm_data}
          />
        ))}

      <div className="">
        {/* <UserLoggerApi/> */}
      </div>
    </div>
  );
};

export default UserSideLive;
