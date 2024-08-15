import React from 'react';
import RevenueDashboard from './NetIncome';
import './main.css'
import HighlightFirmChart from './Evaluate';
import FirmRadarChart from './EvaluateRadar';
import ForecastChart from './ForecastChart';
function Analytics() {
    return (
        <div className="analytics-container">
            <div className="content">
                <FirmRadarChart />
                <RevenueDashboard />
            </div>
            <div className="content">
                <HighlightFirmChart />
                <ForecastChart />
            </div>
        </div>
    );
}

export default Analytics;