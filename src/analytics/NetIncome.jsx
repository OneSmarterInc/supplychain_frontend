import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, LineChart, ResponsiveContainer, ComposedChart
} from 'recharts';
import data from './data.json';
const RevenueDashboard = () => {
  const chart1 = data["chart1"]
  return (
    <ResponsiveContainer width="100%" height={350}>
    <h3 className='pl-6 py-2'>Net Income to Expenses - Previous</h3>

      <ComposedChart
        data={chart1}
        margin={{
          top: 20, right: 10, bottom: 20, left: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="expense" fill="#8884d8" name="Expenses" barSize={45} radius={[10, 10, 0, 0]} />
        <Line type="monotone" dataKey="income" stroke="#ff7300" name="Revenue" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default RevenueDashboard;