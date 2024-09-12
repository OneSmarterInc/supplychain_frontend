import React, { useContext, useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ComposedChart, ResponsiveContainer
} from 'recharts';
import axios from 'axios';  // Assuming Axios is used for API calls
import MyContext from '../Components/ContextApi/MyContext';

const RevenueDashboard = ({ simulation_id, firm_key, previous_quarter }) => {
  const { api } = useContext(MyContext); // Assuming API base URL is provided via context
  const [chartData, setChartData] = useState([]); // State to store fetched chart data

  useEffect(() => {
    // API call to fetch the data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/graphincome/`, {
          params: {
            simulation_id,
            firm_key,
            quarter: previous_quarter, // Pass the quarter dynamically
          },
        });
        setChartData(response.data);  // Set the response data to chartData
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [api, simulation_id, firm_key, previous_quarter]); // Dependencies to trigger API call on change

  // Formatter for tooltip to add $ sign and format with commas
  const tooltipFormatter = (value) => {
    return `$${value.toLocaleString('en-US')}`;
  };

  // Formatter for YAxis ticks to add $ sign and format with commas
  const yAxisTickFormatter = (value) => {
    return `$${value.toLocaleString('en-US')}`;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        data={chartData} // Use the fetched data for the chart
        margin={{
          top: 20, right: 10, bottom: 20, left: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={yAxisTickFormatter} />
        <Tooltip formatter={tooltipFormatter} />
        <Legend />
        <Bar dataKey="expense" fill="#8884d8" name="Expenses" barSize={45} radius={[10, 10, 0, 0]} />
        <Line type="monotone" dataKey="income" stroke="#ff7300" name="Revenue" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default RevenueDashboard;