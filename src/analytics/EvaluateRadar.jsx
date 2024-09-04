import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const FirmRadarChart = ({ apiData }) => {
  const [highlightedDataKey, setHighlightedDataKey] = useState(null);
  const [evaluation, setEvaluation] = useState([]);
  console.log(apiData);
  
  const transformData = (apiData) => {
    return [
      {
        metric: 'Net Income to Revenues',
        Firm3: apiData.net_income_to_revenues_firm_3,
        Worst: apiData.net_income_to_revenues_worst,
        Average: apiData.net_income_to_revenues_average,
        Best: apiData.net_income_to_revenues_best,
      },
      {
        metric: 'Return on Assets',
        Firm3: apiData.return_on_assets_firm_3,
        Worst: apiData.return_on_assets_worst,
        Average: apiData.return_on_assets_average,
        Best: apiData.return_on_assets_best,
      },
      {
        metric: 'Net Asset Turns',
        Firm3: apiData.net_asset_turns_firm_3,
        Worst: apiData.net_asset_turns_worst,
        Average: apiData.net_asset_turns_average,
        Best: apiData.net_asset_turns_best,
      },
      {
        metric: 'Inventory Turnover',
        Firm3: apiData.inventory_turnover_firm_3,
        Worst: apiData.inventory_turnover_worst,
        Average: apiData.inventory_turnover_average,
        Best: apiData.inventory_turnover_best,
      },
      
      // Add other metrics as needed
    ];
  };

  useEffect(() => {
    if (apiData) {
      setEvaluation(transformData(apiData));
    }
  }, [apiData]);

  const handleLegendMouseEnter = (dataKey) => {
    setHighlightedDataKey(dataKey);
  };

  const handleLegendMouseLeave = () => {
    setHighlightedDataKey(null);
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart outerRadius={150} data={evaluation}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Tooltip />
          <Radar 
            name="Firm 3" 
            dataKey="Firm3" 
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