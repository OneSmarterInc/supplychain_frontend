import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from './data.json'
const Chart2 =  data['Chart2']
const CompactBarChart = () => {
  return (
    
    <ResponsiveContainer width="40%" height={1000}>
    <h3 className='pl-6 py-2'>Evaluation units Detailed  - Previous</h3>
      <BarChart
        data={Chart2}
        layout="vertical"
        margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={150} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="Firm 3" fill="#82ca9d" barSize={15}   />
        <Bar dataKey="Worst" fill="#8884d8" barSize={15}  />
        <Bar dataKey="Average" fill="#ffc658" barSize={15}  />
        <Bar dataKey="Best" fill="#ff7300" barSize={15}  />
      </BarChart>
    </ResponsiveContainer>
   

  );
};

export default CompactBarChart;