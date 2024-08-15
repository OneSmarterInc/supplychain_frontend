import React, { useState, useEffect, useRef } from 'react';

const InfoButton = () => {
  const [hovered, setHovered] = useState(false);
  const [tooltipStyles, setTooltipStyles] = useState({});
  const tooltipRef = useRef(null);

  const handleMouseEnter = () => {
    setHovered(true);
    adjustTooltipPosition();
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const adjustTooltipPosition = () => {
    if (tooltipRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;

      const styles = {};

      // Adjust horizontal position
      if (tooltipRect.right > screenWidth) {
        styles.left = 'auto';
        styles.right = '0';
        styles.transform = 'none';
      } else if (tooltipRect.left < 0) {
        styles.left = '0';
        styles.right = 'auto';
        styles.transform = 'none';
      }

      setTooltipStyles(styles);
    }
  };

  useEffect(() => {
    if (hovered) {
      adjustTooltipPosition();
    }
  }, [hovered]);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-gray-200 text-black rounded-full w-8 h-8 flex items-center justify-center text-lg cursor-pointer"
      >
        i
      </button>

      {hovered && (
        <div
          ref={tooltipRef}
          style={tooltipStyles}
          className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 p-3 rounded-md shadow-lg w-64 z-10"
        >
          <ul className="text-sm text-gray-700 list-disc p-5">
            <li>Your firm handles short-term sales volume forecasts for all regions.</li>
            <li>Administrative costs rise by 1% for each 1% forecast error.</li>
            <li>Forecast inaccuracy penalties can double the overhead costs.</li>
            <li>Forecast decisions are independent of procurement and production.</li>
            <li>Good forecasts are essential for supply chain management.</li>
            <li>Accuracy is calculated as 100 * (1 - abs(Forecast-Actual)/Actual).</li>
            <li>A template aids in systematic judgmental sales forecasting.</li>
            <li>Refer to J. Scott Armstrong's article for improving accuracy.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfoButton;