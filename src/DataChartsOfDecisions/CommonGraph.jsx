import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import MyContext from "../Components/ContextApi/MyContext";

const CommonGraph = () => {
  const { api } = useContext(MyContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedSim = JSON.parse(localStorage.getItem("selectedSim"));

  let firm_key_new = "";
  if (selectedSim[0]?.firm_data.length) {
    let firm_obj = selectedSim[0]?.firm_data.filter((item, index) => {
      return item.emails.includes(user.email);
    });
    if (firm_obj.length) {
      firm_key_new = firm_obj[0].firmName; // note: only one user in one firm so using firm_obj[0]
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

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
  const fetchData = async () => {
    try {
      const response = await axios.get(`${api}/graph/`, {
        params: {
          simulation_id: selectedSim[0].simulation_id, // replace with actual simulation_id
          firm_key: firm_key_new, // replace with actual firm_key
        },
      });
      const data = response.data;

      // Format the categories to prepend "Q"
      const formattedCategories = data.quarter.map((quarter) => `Q${quarter}`);

      // Flatten the net_income arrays, remove placeholders, and round up the values
      const netIncome = data.net_income
        .map((incomeArray) =>
          incomeArray
            .filter((value) => value !== "-")
            .map((value) => Math.ceil(Number(value)))
        )
        .flat();

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
  return (
    <div>
      {" "}
      <Chart options={options} series={series} type="area" width="510" />
    </div>
  );
};

export default CommonGraph;
