import React from "react";
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
import data from "./data.json";
// Example data transformation for creative representation
const chart3 = data["Chart3"];

const ForecastBarChart = () => {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <h3 className="pl-6 py-2">Forecast with Actual Demand - Previous</h3>

        <BarChart
          data={chart3}
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
