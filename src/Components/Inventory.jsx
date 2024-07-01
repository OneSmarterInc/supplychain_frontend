import React, { useContext, useEffect, useState } from "react";
import AdminNavBar from "../Components/AdminNavBar";
import axios from "axios";
import storage from "../assets/storage.png";
import facotry from "../assets/factory.png";
import { Image } from "@chakra-ui/react";
import MyContext from "./ContextApi/MyContext";

const Inventory = () => {
  const { api } = useContext(MyContext);
  const current_quarter = (localStorage.getItem("inventory_current_quarter")) || [];
  const firm_key = (localStorage.getItem("inventory_firm_key")) || [];
  const name = (localStorage.getItem("simulation_name")) || [];



  const [data, setData] = useState({
    manufacture: {},
    distributionCenter1: {},
    distributionCenter2: {},
    capital: 0,
  });
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formatCurrency = (value) => {
    if (typeof value === 'number') {
      return currencyFormatter.format(value);
    }
    return value;
  };

  useEffect(() => {

    const simulation_id = (localStorage.getItem("inventory_simulation_id")) || [];
    const firm_key = (localStorage.getItem("inventory_firm_key")) || [];
    const current_quarter = (localStorage.getItem("inventory_current_quarter")) || [];

    axios.get(`${api}/inventory/`, {
      params: {
        simulation_id: simulation_id,
        firm_key: firm_key,
        current_quarter: 1
      }
    })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });

  }, []);

  const convertToArray = (obj) => {
    return Object.keys(obj).map(key => ({
      name: key.replace('inventory_', '').replace('_region2', '').replace('_region3', ''),
      value: obj[key]
    }));
  };

  const manufactureArray = convertToArray(data.manufacture);
  const distributionCenter1Array = convertToArray(data.distributionCenter1);
  const distributionCenter2Array = convertToArray(data.distributionCenter2);

  return (
    <>
      <AdminNavBar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">

          </h2>
          <h3 className="text-xl font-bold text-gray-800">{name} | {firm_key} | {current_quarter}th Quarter</h3>
        </div>
        <div className="mb-4 bg-gray-400 p-4 rounded-md shadow">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Manufacture | Region 1 | capital - {formatCurrency(data.capital)} </h3>
          </div>
          <div className="flex justify-between">
            <div className="grid grid-cols-5 gap-4">
              {manufactureArray
                .filter(
                  (item) =>
                    item.name !== "hyperware" && item.name !== "metaware"
                )
                .map((item) => (
                  <div
                    key={item.name}
                    className="bg-gray-400 p-4 rounded-lg text-center"
                  >
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {item.value}
                    </h3>
                    <p className="text-gray-600">{item.name}</p>
                  </div>
                ))}
            </div>
            <div className="bg-gray-300 p-4 grid grid-cols-2 rounded-lg">
              {manufactureArray
                .filter(
                  (item) =>
                    item.name === "hyperware" || item.name === "metaware"
                )
                .map((item) => (
                  <div
                    key={item.name}
                    className=" text-blue-gray-900 p-4 rounded-lg text-center mb-2"
                  >
                    <h3 className="text-lg font-bold  mb-1">{item.value}</h3>
                    <p className="">{item.name}</p>
                  </div>
                ))}
            </div>
            <div className="w-34 flex justify-center">   <Image src={facotry} /> </div>
          </div>
        </div>
        <div className="mb-4 bg-gray-400 p-4 rounded-md shadow">
          <div className="flex justify-between">
            {" "}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Distribution Center | Region 2
            </h3>

          </div>
          <div className="flex justify-between">
            <div className="grid grid-cols-5 gap-4">
              {distributionCenter1Array
                .filter(
                  (item) =>
                    item.name !== "hyperware" &&
                    item.name !== "metaware" &&
                    item.name !== "zero"
                )
                .map((item) => (
                  <div key={item.name} className=" p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {item.value}
                    </h3>
                    <p className="text-gray-600">{item.name}</p>
                  </div>
                ))}
            </div>
            <div className="bg-gray-300 grid grid-cols-3 p-4 rounded-lg">
              {distributionCenter1Array
                .filter(
                  (item) =>
                    item.name === "hyperware" ||
                    item.name === "metaware" ||
                    item.name === "zero"
                )
                .map((item) => (
                  <div
                    key={item.name}
                    className="text-blue-gray-900 p-4 rounded-lg text-center mb-2  "
                  >
                    <h3 className="text-lg font-bold  mb-1">{item.value}</h3>
                    <p className="">{item.name}</p>
                  </div>
                ))}
            </div>
            <div className="w-34 flex justify-center">   <Image src={storage} /> </div>
          </div>
        </div>
        <div className="mb-4 bg-gray-400 p-4 rounded-md shadow">
          <div className="flex justify-between">
            {" "}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Distribution Center | Region 3
            </h3>

          </div>

          <div className="flex justify-between">
            <div className="grid grid-cols-5 gap-4">
              {distributionCenter2Array
                .filter(
                  (item) =>
                    item.name !== "hyperware" &&
                    item.name !== "metaware" &&
                    item.name !== "zero"
                )
                .map((item) => (
                  <div key={item.name} className=" p-4 rounded-lg text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {item.value}
                    </h3>
                    <p className="text-gray-600">{item.name}</p>
                  </div>
                ))}
            </div>
            <div className="bg-gray-300 grid grid-cols-3 p-4 rounded-lg">
              {distributionCenter2Array
                .filter(
                  (item) =>
                    item.name === "hyperware" ||
                    item.name === "metaware" ||
                    item.name === "zero"
                )
                .map((item) => (
                  <div
                    key={item.name}
                    className="text-blue-gray-900 p-4 rounded-lg text-center mb-2"
                  >
                    <h3 className="text-lg font-bold  mb-1">{item.value}</h3>
                    <p className="">{item.name}</p>
                  </div>
                ))}
            </div>
            <div className="w-34 flex justify-center">   <Image src={storage} /> </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Inventory;
