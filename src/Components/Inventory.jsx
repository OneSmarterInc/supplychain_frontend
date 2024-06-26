import React from "react";
import AdminNavBar from "../Components/AdminNavBar";

const Inventory = () => {
  const manufacture = [
    { name: "Alpha", value: 750000 },
    { name: "Beta", value: 750000 },
    { name: "Gamma", value: 154000 },
    { name: "Delta", value: 75800 },
    { name: "Epsilon", value: 228000 },
    { name: "Hyperware", value: 15450 },
    { name: "Metaware", value: 15450 },
  ];

  const distributionCenter1 = [
    { name: "Gamma", value: 750000 },
    { name: "Delta", value: 750000 },
    { name: "Epsilon", value: 750000 },
    { name: "Product Zero", value: 10000 },
    { name: "Hyperware", value: 15450 },
    { name: "Metaware", value: 15450 },
  ];

  const distributionCenter2 = [
    { name: "Gamma", value: 750000 },
    { name: "Delta", value: 750000 },
    { name: "Epsilon", value: 750000 },
    { name: "Product Zero", value: 10000 },
    { name: "Hyperware", value: 15450 },
    { name: "Metaware", value: 15450 },
  ];

  return (
    <>
      {" "}
      <AdminNavBar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {/* Simulations &gt; MBA 2024 &gt; procurement &gt; Inventory */}
          </h2>
          <h3 className="text-xl font-bold text-gray-800">5th Quarter</h3>
        </div>
        <div className="mb-4 bg-gray-400 p-4 rounded-md shadow">
          <div className="flex justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Manufacture</h3>
          </div>
          <div className="flex justify-between">
            <div className="grid grid-cols-5 gap-4">
              {manufacture
                .filter(
                  (item) =>
                    item.name !== "Hyperware" && item.name !== "Metaware"
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
              {manufacture
                .filter(
                  (item) =>
                    item.name === "Hyperware" || item.name === "Metaware"
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
            <div className="w-24 flex justify-center">{/* img */}</div>
          </div>
        </div>
        <div className="mb-4 bg-gray-400 p-4 rounded-md shadow">
          <div className="flex justify-between">
            {" "}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Distribution Center - Region 1 (Owned)
            </h3>
            <h4 className="text-gray-200">warehouse-4 3</h4>
          </div>
          <div className="flex justify-between">
            <div className="grid grid-cols-5 gap-4">
              {distributionCenter1
                .filter(
                  (item) =>
                    item.name !== "Hyperware" &&
                    item.name !== "Metaware" &&
                    item.name !== "Product Zero"
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
              {distributionCenter1
                .filter(
                  (item) =>
                    item.name === "Hyperware" ||
                    item.name === "Metaware" ||
                    item.name === "Product Zero"
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
            <div className="w-24 flex justify-center">{/* img */}</div>
          </div>
        </div>
        <div className="mb-4 bg-gray-400 p-4 rounded-md shadow">
          <div className="flex justify-between">
            {" "}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Distribution Center - Region 2 (Owned)
            </h3>
            <h4 className="text-gray-200">warehouse-4 3</h4>
          </div>

          <div className="flex justify-between">
            <div className="grid grid-cols-5 gap-4">
              {distributionCenter2
                .filter(
                  (item) =>
                    item.name !== "Hyperware" &&
                    item.name !== "Metaware" &&
                    item.name !== "Product Zero"
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
              {distributionCenter2
                .filter(
                  (item) =>
                    item.name === "Hyperware" ||
                    item.name === "Metaware" ||
                    item.name === "Product Zero"
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
            <div className="w-24 flex justify-center">{/* img */}</div>
          </div>
        </div>
        <div className="bg-gray-400 p-4 rounded-md shadow">
          <div className="flex justify-between">
            {" "}
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Distribution Center - Region 3
            </h3>
            <h4 className="text-gray-200">warehouse-4 3</h4>
          </div>
          <div className="grid">(Not Owned / Sourced)</div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
