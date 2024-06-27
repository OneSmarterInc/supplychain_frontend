import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";
import { useToast } from "@chakra-ui/react";

const GDP = () => {
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const combineSimData = JSON.parse(localStorage.getItem("combineSimData"));
  
  console.log(parseInt(combineSimData.total_quarters) + 3);
  combineSimData.total_quarters = parseInt(combineSimData.total_quarters) + 3;

  const toast = useToast();
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

  // Renames Mapp
  const [suppliarMapp, setSuppliarMapp] = useState({
    A: "A",
    B: "B",
    C: "C",
    D: "D",
    E: "E",
    F: "F",
    G: "G",
  });
  const [distributerMapp, setDistributerMapp] = useState({
    I: "I",
    J: "J",
    K: "K",
    L: "L",
    M: "M",
    N: "N",
  });

  const [componentMapp, setComponentMapp] = useState({
    alpha: "alpha",
    beta: "beta",
    gamma: "gamma",
    epsilon: "epsilon",
    delta: "delta",
  });

  const [RegionMapp, setRegionMapp] = useState({
    region1: "region1",
    region2: "region2",
    region3: "region3",
  });
  const [ChannelMapp, setChannelMapp] = useState({
    channel1: "channel1",
    channel2: "channel2",
  });

  const [renameDataVariable, setRenameDataVariable] = useState({
    hyperware: "hyperware",
    metaware: "metaware",
  });

  const renamedMappedData = {
    dataVariabllesMapp: renameDataVariable,
    RegionMapp: RegionMapp,
    ChannelMapp: ChannelMapp,
    componentMapp: componentMapp,
    distributerMapp: distributerMapp,
    suppliarMapp: suppliarMapp,
  };
  console.log("RenamedMappedData: ", renamedMappedData);

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
    hyperware_default: [currentData?.hyperware],
    metaware_default: [currentData?.metaware],
    demand_grow_rule: {
      gdp: gdp,
      drift: drift,
      ad_positive: higherDemandRange,
      ad_negative: lowerDemandRange,
    },
    renamedMappedData: renamedMappedData,
  };

  const handleSubmit = async () => {
    if (updatedCombineSimData?.total_quarters) {
      try {
        const response = await axios.post(
          `${api}/simulations/simulation/`,
          updatedCombineSimData
        );
        console.log("Success:", response.data);
        toast({
          title: "Simulation Created Successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        navigate("/adminsidelive");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      alert("Please Enter Quarters");
    }
  };

  const handleSupplierInput = (e) => {
    setSuppliarMapp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDistributerInput = (e) => {
    setDistributerMapp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleComponentsInput = (e) => {
    setComponentMapp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegionInput = (e) => {
    setRegionMapp((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto p-6 pt-0 bg-gray-50 min-h-screen">
      {/* <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
        Data Analysis
      </h1> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Current Data
          </h2>
          <div className="mb-6">
            {/* <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Hyperware
            </h3> */}
            <table className="w-full bg-blue-gray-100 h-40 text-center border-collapse border border-gray-200">
              <thead>
                <tr className="">
                  <th className=" py-2 border border-gray-200">
                    <input
                      className="w-32 p-2 border rounded-md"
                      placeholder={"hyperware"}
                      value={renameDataVariable["hyperware"]}
                      name={"hyperware"}
                      onChange={(e) => {
                        setRenameDataVariable({
                          ...renameDataVariable,
                          hyperware: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </th>
                  {Object.keys(RegionMapp).map((item, index) => {
                    return (
                      <th className="px-2 py-2 border border-gray-200">
                        <input
                          key={index}
                          type="text"
                          name={item}
                          onChange={(e) => {
                            handleRegionInput(e);
                          }}
                          placeholder={item}
                          value={RegionMapp[item]}
                          className="w-full p-2 border rounded-md"
                        />
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      className="w-full p-2 border rounded-md"
                      placeholder={"channel1"}
                      value={ChannelMapp["channel1"]}
                      name={"channel1"}
                      onChange={(e) => {
                        setChannelMapp({
                          ...ChannelMapp,
                          channel1: e.target.value,
                        });
                      }}
                      type="text"
                    />
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
                <tr className="">
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      className="w-full p-2 border rounded-md"
                      placeholder={"channel2"}
                      value={ChannelMapp["channel2"]}
                      name={"channel2"}
                      onChange={(e) => {
                        setChannelMapp({
                          ...ChannelMapp,
                          channel2: e.target.value,
                        });
                      }}
                      type="text"
                    />
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
            {/* <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Metaware
            </h3> */}
            <table className="w-full h-40 bg-blue-gray-100 text-center border-collapse border border-gray-300">
              <thead>
                {/* regionmapp */}
                <tr className="">
                  <th className=" py-2 border border-gray-200">
                    <input
                      className="w-32 p-2 border rounded-md"
                      placeholder={"metaware"}
                      value={renameDataVariable["metaware"]}
                      name={"metaware"}
                      onChange={(e) => {
                        setRenameDataVariable({
                          ...renameDataVariable,
                          metaware: e.target.value,
                        });
                      }}
                      type="text"
                    />
                  </th>
                  {Object.keys(RegionMapp).map((item, index) => {
                    return (
                      <th className="px-2 py-2 border border-gray-200">
                        <input
                          key={index}
                          type="text"
                          name={item}
                          onChange={(e) => {
                            handleRegionInput(e);
                          }}
                          placeholder={item}
                          value={RegionMapp[item]}
                          className="w-full p-2 border rounded-md"
                        />
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      className="w-full p-2 border rounded-md"
                      placeholder={"channel1"}
                      value={ChannelMapp["channel1"]}
                      name={"channel1"}
                      onChange={(e) => {
                        setChannelMapp({
                          ...ChannelMapp,
                          channel1: e.target.value,
                        });
                      }}
                      type="text"
                    />
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
                <tr className="">
                  <td className="px-4 py-2 border border-gray-200">
                    <input
                      className="w-full p-2 border rounded-md"
                      placeholder={"channel2"}
                      value={ChannelMapp["channel2"]}
                      name={"channel2"}
                      onChange={(e) => {
                        setChannelMapp({
                          ...ChannelMapp,
                          channel2: e.target.value,
                        });
                      }}
                      type="text"
                    />
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
            {/* <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Hyperware
            </h3> */}
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
            {/* <h3 className="text-xl font-semibold mb-2 text-indigo-500">
              Metaware
            </h3> */}
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
      {/* Sub Assembly Components */}

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Components</h2>
        <div>
          <label
            htmlFor="actualDemand"
            className="block text-gray-600 font-semibold mb-2"
          >
            Components Rename
          </label>
          <div className="flex gap-2">
            {Object.keys(componentMapp).map((item, index) => {
              return (
                <input
                  key={index}
                  name={item}
                  onChange={(e) => handleComponentsInput(e)}
                  type="text"
                  placeholder={item}
                  value={componentMapp[item]}
                  className="w-1/2 p-2 border rounded-md"
                />
              );
            })}
          </div>
        </div>
        {/* suppliar and distributer */}
        <div>
          <label
            htmlFor="actualDemand"
            className="block text-gray-600 font-semibold mb-2"
          >
            Suppliar Rename
          </label>

          <div className="flex gap-2">
            {Object.keys(suppliarMapp).map((item, index) => {
              return (
                <input
                  key={index}
                  name={item}
                  onChange={(e) => handleSupplierInput(e)}
                  type="text"
                  placeholder={item}
                  value={suppliarMapp[item]}
                  className="w-1/2 p-2 border rounded-md"
                />
              );
            })}
          </div>
        </div>{" "}
        <div>
          <label
            htmlFor="actualDemand"
            className="block text-gray-600 font-semibold mb-2"
          >
            Distributer Rename
          </label>
          <div className="flex gap-2">
            {Object.keys(distributerMapp).map((item, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  name={item}
                  onChange={(e) => {
                    handleDistributerInput(e);
                  }}
                  placeholder={item}
                  value={distributerMapp[item]}
                  className="w-1/2 p-2 border rounded-md"
                />
              );
            })}
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
