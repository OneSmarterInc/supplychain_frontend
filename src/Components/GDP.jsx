import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";

const GDP = () => {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const combineSimData = JSON.parse(localStorage.getItem("combineSimData"));

  const [currentData, setCurrentData] = useState({
    hyperware: {
      region1: {
        channel1: 20000,
        channel2: 16000,
      },
      region2: {
        channel1: 20000,
        channel2: 11000,
      },
      region3: {
        channel1: 35000,
        channel2: 10000,
      },
    },
    metaware: {
      region1: {
        channel1: 5200,
        channel2: 1000,
      },
      region2: {
        channel1: 20002,
        channel2: 11004,
      },
      region3: {
        channel1: 35060,
        channel2: 10000,
      },
    },
  });

  const [growthData, setGrowthData] = useState({});
  const [gdp, setGdp] = useState(2);
  const [drift, setDrift] = useState(0.5);
  const [lowerDemandRange, setLowerDemandRange] = useState(500);
  const [higherDemandRange, setHigherDemandRange] = useState(500);

  useEffect(() => {
    // Calculate and set initial growth data
    const initialGrowthData = calculateGrowthForAll(currentData);
    setGrowthData(initialGrowthData);
  }, [gdp, drift, lowerDemandRange, higherDemandRange]);

  const handleInputChange = (e, section, region, channel) => {
    const value = parseInt(e.target.value, 10);
    setCurrentData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [region]: {
          ...prevData[section][region],
          [channel]: value,
        },
      },
    }));

    // Recalculate growth for the specific item being changed
    const newGrowthValue = calculateGrowth(section, region, channel, value);
    setGrowthData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [region]: {
          ...prevData[section][region],
          [channel]: newGrowthValue,
        },
      },
    }));
  };

  const calculateGrowthForAll = (data) => {
    const updatedData = {};
    for (const section in data) {
      updatedData[section] = {};
      for (const region in data[section]) {
        updatedData[section][region] = {};
        for (const channel in data[section][region]) {
          updatedData[section][region][channel] = calculateGrowth(
            section,
            region,
            channel,
            data[section][region][channel]
          );
        }
      }
    }
    return updatedData;
  };

  const calculateGrowth = (section, region, channel, currentItemValue) => {
    const actualValueRandomize =
      Math.random() * (higherDemandRange * 2 + 1) - lowerDemandRange;

    const randomValue = gdp + Math.random() * drift;
    const percentageAmount = Math.floor((randomValue / 100) * currentItemValue);
    const gdpValue = percentageAmount + currentItemValue;
    const actualDemand = gdpValue + currentItemValue;
    const growthValue = gdpValue;

    return growthValue;
  };

  const updatedCombineSimData = {
    ...combineSimData,
    current_demand_data: currentData,
    growth_demand_data: growthData,
  };

  const handleSubmit = async () => {
    if (updatedCombineSimData?.total_quarters) {
      try {
        const response = await axios.post(
          `${api}/simulations/simulation/`,
          updatedCombineSimData
        );
        console.log("Success:", response.data);
        navigate("/adminsidelive");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert("Please Enter Quarters");
    }
  };
  return (
    <div className="container mx-auto p-6 pt-0 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Data Analysis
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Current Data
          </h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Hyperware
            </h3>
            <table className="w-full h-40 text-center border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200">Channel</th>
                  <th className="px-4 py-2 border border-gray-200">Region 1</th>
                  <th className="px-4 py-2 border border-gray-200">Region 2</th>
                  <th className="px-4 py-2 border border-gray-200">Region 3</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    Channel 1
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.hyperware.region1.channel1}
                      onChange={(e) =>
                        handleInputChange(e, "hyperware", "region1", "channel1")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.hyperware.region2.channel1}
                      onChange={(e) =>
                        handleInputChange(e, "hyperware", "region2", "channel1")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.hyperware.region3.channel1}
                      onChange={(e) =>
                        handleInputChange(e, "hyperware", "region3", "channel1")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    Channel 2
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.hyperware.region1.channel2}
                      onChange={(e) =>
                        handleInputChange(e, "hyperware", "region1", "channel2")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.hyperware.region2.channel2}
                      onChange={(e) =>
                        handleInputChange(e, "hyperware", "region2", "channel2")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.hyperware.region3.channel2}
                      onChange={(e) =>
                        handleInputChange(e, "hyperware", "region3", "channel2")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Metaware
            </h3>
            <table className="w-full h-40 text-center border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200">Channel</th>
                  <th className="px-4 py-2 border border-gray-200">Region 1</th>
                  <th className="px-4 py-2 border border-gray-200">Region 2</th>
                  <th className="px-4 py-2 border border-gray-200">Region 3</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    Channel 1
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.metaware.region1.channel1}
                      onChange={(e) =>
                        handleInputChange(e, "metaware", "region1", "channel1")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.metaware.region2.channel1}
                      onChange={(e) =>
                        handleInputChange(e, "metaware", "region2", "channel1")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.metaware.region3.channel1}
                      onChange={(e) =>
                        handleInputChange(e, "metaware", "region3", "channel1")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    Channel 2
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.metaware.region1.channel2}
                      onChange={(e) =>
                        handleInputChange(e, "metaware", "region1", "channel2")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.metaware.region2.channel2}
                      onChange={(e) =>
                        handleInputChange(e, "metaware", "region2", "channel2")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      type="number"
                      value={currentData.metaware.region3.channel2}
                      onChange={(e) =>
                        handleInputChange(e, "metaware", "region3", "channel2")
                      }
                      className="w-20 p-2 border rounded-md"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Growth Data</h2>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Hyperware
            </h3>
            <table className="w-full h-40 text-center border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200">Channel</th>
                  <th className="px-4 py-2 border border-gray-200">Region 1</th>
                  <th className="px-4 py-2 border border-gray-200">Region 2</th>
                  <th className="px-4 py-2 border border-gray-200">Region 3</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    Channel 1
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.hyperware?.region1?.channel1 || 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.hyperware?.region2?.channel1 || 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.hyperware?.region3?.channel1 || 0}
                  </td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    Channel 2
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.hyperware?.region1?.channel2 || 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.hyperware?.region2?.channel2 || 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.hyperware?.region3?.channel2 || 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Metaware
            </h3>
            <table className="w-full h-40 text-center border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200">Channel</th>
                  <th className="px-4 py-2 border border-gray-200">Region 1</th>
                  <th className="px-4 py-2 border border-gray-200">Region 2</th>
                  <th className="px-4 py-2 border border-gray-200">Region 3</th>
                </tr>
              </thead>
              <tbody>
                <tr className="even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    Channel 1
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.metaware?.region1?.channel1 || 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.metaware?.region2?.channel1 || 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.metaware?.region3?.channel1 || 0}
                  </td>
                </tr>
                <tr className="even:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-200">
                    Channel 2
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.metaware?.region1?.channel2 || 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.metaware?.region2?.channel2 || 0}
                  </td>
                  <td className="px-4 py-2 border border-gray-200">
                    {growthData.metaware?.region3?.channel2 || 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* growth  */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Growth Parameters
        </h2>
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div>
            <label
              htmlFor="gdp"
              className="block text-gray-600 font-semibold mb-2"
            >
              GDP (%)
            </label>
            <input
              type="number"
              id="gdp"
              value={gdp}
              onChange={(e) => setGdp(parseFloat(e.target.value))}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="drift"
              className="block text-gray-600 font-semibold mb-2"
            >
              Drift (%)
            </label>
            <input
              type="number"
              id="drift"
              value={drift}
              onChange={(e) => setDrift(parseFloat(e.target.value))}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="actualDemand"
            className="block text-gray-600 font-semibold mb-2"
          >
            Actual Demand (units)
          </label>
          <div className="flex gap-2">
            <input
              onChange={(e) => {
                setLowerDemandRange(parseInt(e.target.value, 10));
              }}
              type="number"
              id="actualDemand"
              value={lowerDemandRange}
              className="w-1/2 p-2 border rounded-md"
            />
            <span className="self-center">to</span>
            <input
              onChange={(e) => {
                setHigherDemandRange(parseInt(e.target.value, 10));
              }}
              type="number"
              id="actualDemand"
              value={higherDemandRange}
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Simulation
        </button>
      </div>
    </div>
  );
};

export default GDP;
