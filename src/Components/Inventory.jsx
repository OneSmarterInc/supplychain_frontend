import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Image } from "@chakra-ui/react";
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

  useEffect(() => {
    const simulation_id = localStorage.getItem("inventory_simulation_id") || [];
    const firm_key = localStorage.getItem("inventory_firm_key") || [];
   
    axios
      .get(`${api}/inventory/`, {
        params: {
          simulation_id,
          firm_key,
          current_quarter: 1,
        },
      })
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data", error));
  }, [api]);

  const convertToArray = (obj) =>
    Object.keys(obj).map((key) => ({
      name: key.replace("inventory_", "").replace(/_region\d/, ""),
      value: obj[key],
    }));

  const renderDataBlocks = (dataArray, additionalClasses = "") =>
    dataArray.map((item) => (
      <div key={item.name} className={`p-2 text-center ${additionalClasses}`}>
        <h3 className="text-lg font-bold mb-1">{item.value}</h3>
        <p className="text-gray-600">{item.name}</p>
      </div>
    ));

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h3 className="text-xl font-bold mb-4">Manufacture | Region 1</h3>
        <div className="flex items-start">
          <div className="grid grid-cols-5 gap-4">
            {renderDataBlocks(
              convertToArray(data.manufacture).filter(
                (item) => item.name !== "hyperware" && item.name !== "metaware"
              )
            )}
          </div>
          <div className="grid grid-cols-2 gap-4 p-2 bg-gray-100 rounded">
            {renderDataBlocks(
              convertToArray(data.manufacture).filter(
                (item) => item.name === "hyperware" || item.name === "metaware"
              ),
              "bg-gray-50"
            )}
          </div>
          <Image src={factory} boxSize="80px" />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <h3 className="text-xl font-bold mb-4">Distribution Center | Region 2</h3>
        <div className="flex items-start">
          <div className="grid grid-cols-5 gap-4">
            {renderDataBlocks(
              convertToArray(data.distributionCenter1).filter(
                (item) =>
                  item.name !== "hyperware" &&
                  item.name !== "metaware" &&
                  item.name !== "zero"
              )
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 p-2 bg-gray-100 rounded">
            {renderDataBlocks(
              convertToArray(data.distributionCenter1).filter(
                (item) =>
                  item.name === "hyperware" ||
                  item.name === "metaware" ||
                  item.name === "zero"
              ),
              "bg-gray-50"
            )}
          </div>
          <Image src={storage} boxSize="80px" />
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm">
        <h3 className="text-xl font-bold mb-4">Distribution Center | Region 3</h3>
        <div className="flex items-start">
          <div className="grid grid-cols-5 gap-4">
            {renderDataBlocks(
              convertToArray(data.distributionCenter2).filter(
                (item) =>
                  item.name !== "hyperware" &&
                  item.name !== "metaware" &&
                  item.name !== "zero"
              )
            )}
          </div>
          <div className="grid grid-cols-3 gap-4 p-2 bg-gray-100 rounded">
            {renderDataBlocks(
              convertToArray(data.distributionCenter2).filter(
                (item) =>
                  item.name === "hyperware" ||
                  item.name === "metaware" ||
                  item.name === "zero"
              ),
              "bg-gray-50"
            )}
          </div>
          <Image src={storage} boxSize="80px" />
        </div>
      </div>
    </div>
  );
};

export default Inventory;