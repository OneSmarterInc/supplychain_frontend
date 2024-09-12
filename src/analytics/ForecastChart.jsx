import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import axios from "axios"; // Assuming axios is used for API calls
import MyContext from "../Components/ContextApi/MyContext";

const ForecastBarChart = ({ simulation_id, firm_key, previous_quarter }) => {
  const { api } = useContext(MyContext); // Get API base URL from context
  const [chartData, setChartData] = useState([]); // State to store fetched data

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/graphforecast/`, {
          params: {
            simulation_id,
            firm_key,
            quarter: previous_quarter, // Send dynamic quarter
          },
        });
        setChartData(response.data); // Set the fetched data to chartData
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };

    fetchData();
  }, [api, simulation_id, firm_key, previous_quarter]); // Re-fetch data when dependencies change

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        {/* <h3 className="pl-6 py-2">Forecast with Actual Demand - Previous</h3> */}
        <BarChart
          data={chartData} // Use dynamic data
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="forecast" fill="#8884d8" radius={[10, 10, 0, 0]}>
            <LabelList dataKey="forecast" position="insideTop" fill="#ffffff" />
          </Bar>
          <Bar dataKey="actual" fill="#82ca9d" radius={[10, 10, 0, 0]}>
            <LabelList dataKey="actual" position="insideTop" fill="#ffffff" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastBarChart;