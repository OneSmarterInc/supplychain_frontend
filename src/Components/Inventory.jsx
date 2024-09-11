import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Image, Spinner, Box } from "@chakra-ui/react"; // Import Spinner from Chakra UI
import MyContext from "./ContextApi/MyContext";
import storage from "../assets/storage.png";
import factory from "../assets/factory.png";

const Inventory = () => {
  const { api } = useContext(MyContext);
  const [data, setData] = useState({
    manufacture: {},
    distributionCenter1: {},
    distributionCenter2: {},
    capital: 0,
  });
  const [selectedSim, setSelectedSim] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    const simulation_id = localStorage.getItem("inventory_simulation_id") || [];
    const firm_key = localStorage.getItem("inventory_firm_key") || [];
    const simData = JSON.parse(localStorage.getItem("selectedSim")) || [];
    setSelectedSim(simData);

    setLoading(true); // Start loading before fetching data
    axios
      .get(`${api}/inventory/`, {
        params: {
          simulation_id,
          firm_key,
          current_quarter: simData[0]?.current_quarter,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data", error))
      .finally(() => setLoading(false)); // Stop loading after fetching data
  }, [api]);

  // Map component names using renamedMappedData
  const getMappedName = (name) => {
    return (
      selectedSim[0]?.renamedMappedData?.componentMapp?.[name] ||
      selectedSim[0]?.renamedMappedData?.dataVariabllesMapp?.[name] ||
      name
    );
  };

  const convertToArray = (obj) =>
    Object.keys(obj).map((key) => ({
      name: getMappedName(key.replace("inventory_", "").replace(/_region\d/, "")),
      value: obj[key],
    }));

  const renderDataBlocks = (dataArray, additionalClasses = "") =>
    dataArray.map((item) => (
      <div key={item.name} className={`p-2 text-center ${additionalClasses}`}>
        <h3 className="text-base md:text-lg font-bold mb-1">{item.value}</h3>
        <p className="text-gray-600 text-sm md:text-base">{item.name}</p>
      </div>
    ));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Show Spinner while loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <h3 className="text-lg md:text-xl font-bold mb-4">Manufacture | Region 1</h3>
            <div className="flex flex-wrap">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {renderDataBlocks(
                  convertToArray(data.manufacture).filter(
                    (item) =>
                      item.name !== getMappedName("hyperware") &&
                      item.name !== getMappedName("metaware")
                  )
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 bg-gray-100 rounded">
                {renderDataBlocks(
                  convertToArray(data.manufacture).filter(
                    (item) =>
                      item.name === getMappedName("hyperware") ||
                      item.name === getMappedName("metaware")
                  ),
                  "bg-gray-50"
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <h3 className="text-lg md:text-xl font-bold mb-4">Distribution Center | Region 2</h3>
            <div className="flex flex-wrap">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {renderDataBlocks(
                  convertToArray(data.distributionCenter1).filter(
                    (item) =>
                      item.name !== getMappedName("hyperware") &&
                      item.name !== getMappedName("metaware") &&
                      item.name !== getMappedName("zero")
                  )
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 bg-gray-100 rounded">
                {renderDataBlocks(
                  convertToArray(data.distributionCenter1).filter(
                    (item) =>
                      item.name === getMappedName("hyperware") ||
                      item.name === getMappedName("metaware") ||
                      item.name === getMappedName("zero")
                  ),
                  "bg-gray-50"
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <h3 className="text-lg md:text-xl font-bold mb-4">Distribution Center | Region 3</h3>
            <div className="flex flex-wrap">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {renderDataBlocks(
                  convertToArray(data.distributionCenter2).filter(
                    (item) =>
                      item.name !== getMappedName("hyperware") &&
                      item.name !== getMappedName("metaware") &&
                      item.name !== getMappedName("zero")
                  )
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-2 bg-gray-100 rounded">
                {renderDataBlocks(
                  convertToArray(data.distributionCenter2).filter(
                    (item) =>
                      item.name === getMappedName("hyperware") ||
                      item.name === getMappedName("metaware") ||
                      item.name === getMappedName("zero")
                  ),
                  "bg-gray-50"
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Inventory;