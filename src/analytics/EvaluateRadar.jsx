import React, { useState } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip
} from 'recharts';
import data from './data.json'

const evaluation = data['evaluation']

const FirmRadarChart = () => {
  const [highlightedDataKey, setHighlightedDataKey] = useState(null);

  const handleLegendMouseEnter = (dataKey) => {
    setHighlightedDataKey(dataKey);
  };

  const handleLegendMouseLeave = () => {
    setHighlightedDataKey(null);
  };

  return (
    <div>
      <h3 className='pl-6 py-2'>Evaluation report your firm to industry  - Previous</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius={150} data={evaluation}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Tooltip />
          <Radar 
            name="you" 
            dataKey="your's" 
            stroke="#8884d8" 
            fill="#8884d8" 
            fillOpacity={highlightedDataKey === 'Firm3' || highlightedDataKey === null ? 0.6 : 0.1} 
          />
          <Radar 
            name="Worst" 
            dataKey="Worst" 
            stroke="#ff7300" 
            fill="#ff7300" 
            fillOpacity={highlightedDataKey === 'Worst' || highlightedDataKey === null ? 0.3 : 0.1} 
          />
          <Radar 
            name="Average" 
            dataKey="Average" 
            stroke="#82ca9d" 
            fill="#82ca9d" 
            fillOpacity={highlightedDataKey === 'Average' || highlightedDataKey === null ? 0.3 : 0.1} 
          />
          <Radar 
            name="Best" 
            dataKey="Best" 
            stroke="#ffc658" 
            fill="#ffc658" 
            fillOpacity={highlightedDataKey === 'Best' || highlightedDataKey === null ? 0.3 : 0.1} 
          />
          <Legend 
            onMouseEnter={(e) => handleLegendMouseEnter(e.dataKey)} 
            onMouseLeave={handleLegendMouseLeave} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FirmRadarChart;