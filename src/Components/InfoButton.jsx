import React, { useState } from 'react';

const InfoButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleButtonClick}
        className="bg-gray-200 text-black rounded-lg w-12 h-8 flex items-center justify-center text-lg cursor-pointer"
      >
        info
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Information</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-600 hover:text-gray-900"
              >
                &times;
              </button>
            </div>
            <ul className="text-sm text-gray-700 list-disc pl-5">
              <li>Your firm handles short-term sales volume forecasts for all regions.</li>
              <li>Administrative costs rise by 1% for each 1% forecast error.</li>
              <li>Forecast inaccuracy penalties can double the overhead costs.</li>
              <li>Forecast decisions are independent of procurement and production.</li>
              <li>Good forecasts are essential for supply chain management.</li>
              <li>Accuracy is calculated as 100 * (1 - abs(Forecast-Actual)/Actual).</li>
              <li>A template aids in systematic judgmental sales forecasting.</li>
              <li>Refer to J. Scott Armstrong's article for improving accuracy.</li>
            </ul>
            <div className="mt-4 text-right">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoButton;