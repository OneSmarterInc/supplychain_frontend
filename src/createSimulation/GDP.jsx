import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../Components/ContextApi/MyContext";
import { useToast } from "@chakra-ui/react";
import SubAssemblyComponents from "../Components/SubAssemblyComponent";

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
    alpha: "Plastics",
    beta: "Casings",
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

  // sub assembly component section here

  const [subAssemblyComponents, setSubAssemblyComponents] = useState([
    {
      supplier: "Supplier A",
      gamma: {
        cost: 12,
        delivery_inpercent: 80,
        deliveryChange_inpercent: 2,
        failure_inpercent: 2.0,
      },
      delta: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      epsilon: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
    },
    {
      supplier: "Supplier B",
      gamma: {
        cost: 14,
        delivery_inpercent: 85,
        deliveryChange_inpercent: 4,
        failure_inpercent: 1.9,
      },
      delta: {
        cost: 15,
        delivery_inpercent: 75,
        deliveryChange_inpercent: 4,
        failure_inpercent: 2.6,
      },
      epsilon: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
    },
    {
      supplier: "Supplier C",
      gamma: {
        cost: 13,
        delivery_inpercent: 85,
        deliveryChange_inpercent: 6,
        failure_inpercent: 2.6,
      },
      delta: {
        cost: 16,
        delivery_inpercent: 78,
        deliveryChange_inpercent: 6,
        failure_inpercent: 2.5,
      },
      epsilon: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
    },
    {
      supplier: "Supplier D",
      gamma: {
        cost: 22,
        delivery_inpercent: 90,
        deliveryChange_inpercent: 8,
        failure_inpercent: 1.2,
      },
      delta: {
        cost: 24,
        delivery_inpercent: 80,
        deliveryChange_inpercent: 8,
        failure_inpercent: 1.8,
      },
      epsilon: {
        cost: 29,
        delivery_inpercent: 80,
        deliveryChange_inpercent: 8,
        failure_inpercent: 1.1,
      },
    },
    {
      supplier: "Supplier E",
      gamma: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      delta: {
        cost: 14,
        delivery_inpercent: 70,
        deliveryChange_inpercent: 10,
        failure_inpercent: 2.7,
      },
      epsilon: {
        cost: 20,
        delivery_inpercent: 75,
        deliveryChange_inpercent: 10,
        failure_inpercent: 1.7,
      },
    },
    {
      supplier: "Supplier F",
      gamma: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      delta: {
        cost: 13,
        delivery_inpercent: 70,
        deliveryChange_inpercent: 12,
        failure_inpercent: 2.8,
      },
      epsilon: {
        cost: 19,
        delivery_inpercent: 77,
        deliveryChange_inpercent: 12,
        failure_inpercent: 1.8,
      },
    },
    {
      supplier: "Supplier G",
      gamma: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      delta: {
        cost: "disabled",
        delivery_inpercent: "disabled",
        deliveryChange_inpercent: "disabled",
        failure_inpercent: "disabled",
      },
      epsilon: {
        cost: 21,
        delivery_inpercent: 78,
        deliveryChange_inpercent: 14,
        failure_inpercent: 1.7,
      },
    },
  ]);

  console.log("subassembly component", subAssemblyComponents);

  const handleSubAssemblyInputChange = (
    event,
    supplierIndex,
    component,
    field
  ) => {
    const updatedSubAssemblyComponents = [...subAssemblyComponents];
    updatedSubAssemblyComponents[supplierIndex] = {
      ...updatedSubAssemblyComponents[supplierIndex],
      [component]: {
        ...updatedSubAssemblyComponents[supplierIndex][component],
        [field]: parseFloat(event.target.value),
      },
    };
    setSubAssemblyComponents(updatedSubAssemblyComponents);
  };

  const renderInput = (componentName, index, field, disabled) => (
    <input
      type="number"
      className={`w-full px-2 py-1 border rounded ${
        disabled ? "bg-gray-200 cursor-not-allowed" : "bg-white"
      }`}
      value={subAssemblyComponents[index][componentName][field]}
      onChange={(event) =>
        handleSubAssemblyInputChange(event, index, componentName, field)
      }
      disabled={disabled}
    />
  );

  // Sub assembly component ends here

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
    // subAssemblyComponents: subAssemblyComponents
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
        {/* Sub assembly component table here */}
        <div className="">
          <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">
              Exhibit 5: Sub-Assembly Component Characteristics
            </h2>
            <table className="w-full table-auto border border-green-700 border-spacing-3 gap-3">
              <thead>
                <tr className="bg-blue-100">
                  <th className="py-2 px-4 border-b border-r border-gray-300 text-left">
                    Supplier
                  </th>
                  <th
                    colSpan={3}
                    className="py-2 px-4 border-b border-r border-gray-300 text-center"
                  >
                    Gamma
                  </th>
                  <th
                    colSpan={3}
                    className="py-2 px-4 border-b border-r border-gray-300 text-center"
                  >
                    Delta
                  </th>
                  <th
                    colSpan={3}
                    className="py-2 px-4 border-b border-gray-300 text-center"
                  >
                    Epsilon
                  </th>
                </tr>
                <tr className="bg-blue-100">
                  <th className="py-2 px-4 border-b border-gray-300 text-left"></th>
                  <th className="py-2 px-4 border-b border-l  border-gray-300 text-center">
                    Cost
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Delivery
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Failure
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Cost
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Delivery
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Failure
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Cost
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Delivery
                  </th>
                  <th className="py-2 px-4 border-b border-l border-gray-300 text-center">
                    Failure
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {subAssemblyComponents.map((component, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                  >
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-left">
                      {component.supplier}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      <div className="flex items-center space-x-1">
                        <p className="text-green-500">$</p>
                        {renderInput(
                          "gamma",
                          index,
                          "cost",
                          component.gamma.cost === "disabled"
                        )}
                      </div>
                    </td>
                    <td className="delivery py-2 px-4 border-b border-r  border-gray-300 text-center">
                      <div className="flex">
                        {renderInput(
                          "gamma",
                          index,
                          "delivery_inpercent",
                          component.gamma.delivery_inpercent === "disabled"
                        )}
                        <p className="text-red-500 mx-1">±</p>
                        {renderInput(
                          "gamma",
                          index,
                          "deliveryChange_inpercent",
                          component.gamma.deliveryChange_inpercent ===
                            "disabled"
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      {renderInput(
                        "gamma",
                        index,
                        "failure_inpercent",
                        component.gamma.failure_inpercent === "disabled"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      <div className="flex items-center space-x-1">
                        <p className="text-green-500">$</p>
                        {renderInput(
                          "delta",
                          index,
                          "cost",
                          component.delta.cost === "disabled"
                        )}
                      </div>
                    </td>
                    <td className="delivery py-2 px-4 border-b border-r  border-gray-300 text-center">
                      <div className="flex">
                        {renderInput(
                          "delta",
                          index,
                          "delivery_inpercent",
                          component.delta.delivery_inpercent === "disabled"
                        )}
                        <p className="text-red-500 mx-1">±</p>
                        {renderInput(
                          "delta",
                          index,
                          "deliveryChange_inpercent",
                          component.delta.deliveryChange_inpercent ===
                            "disabled"
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      {renderInput(
                        "delta",
                        index,
                        "failure_inpercent",
                        component.delta.failure_inpercent === "disabled"
                      )}
                    </td>
                    <td className="py-2 px-4 border-b border-r border-gray-300 text-center">
                      <div className="flex items-center space-x-1">
                        <p className="text-green-500">$</p>
                        {renderInput(
                          "epsilon",
                          index,
                          "cost",
                          component.epsilon.cost === "disabled"
                        )}
                      </div>
                    </td>
                    <td className="delivery py-2 px-4 border-b border-r  border-gray-300 text-center">
                      <div className="flex">
                        {renderInput(
                          "epsilon",
                          index,
                          "delivery_inpercent",
                          component.epsilon.delivery_inpercent === "disabled"
                        )}
                        <p className="text-red-500 mx-1">±</p>
                        {renderInput(
                          "epsilon",
                          index,
                          "deliveryChange_inpercent",
                          component.epsilon.deliveryChange_inpercent ===
                            "disabled"
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 text-center">
                      {renderInput(
                        "epsilon",
                        index,
                        "failure_inpercent",
                        component.epsilon.failure_inpercent === "disabled"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
