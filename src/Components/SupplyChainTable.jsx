import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const SupplyChainTable = ({ setUpdatedDCData }) => {
  const tableRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDC, setActiveDC] = useState("DC1");
  const [procurementData, setProcurementData] = useState({});
  const [selectedSim, setSelectedSim] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("procurementData"));
    setProcurementData(data || {});
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("selectedSim"));
    setSelectedSim(data || []);
  }, []);

  const supplierOptions = [
    "Select",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.A || "Supplier A",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.B || "Supplier B",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.C || "Supplier C",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.D || "Supplier D",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.E || "Supplier E",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.F || "Supplier F",
    selectedSim[0]?.renamedMappedData?.suppliarMapp?.G || "Supplier G",
  ];

  const mediumOptions = ["Select", "Air", "Surface"];

  const [dcData, setDcData] = useState({});

  useEffect(() => {
    if (procurementData?.sac_units) {
      setDcData(procurementData?.sac_units);
    }
  }, [procurementData?.sac_units]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleDCButtonClick = (dc) => {
    setActiveDC(dc);
  };

  const handleInputChange = (dc, index, key, value) => {
    const updatedData = { ...dcData };
    updatedData[dc][index][key] = value;
    setDcData(updatedData);
  };

  const onAddEntry = (dc) => {
    const newEntry = {
      name: "",
      supplier: "",
      medium: "",
      units: "",
    };
    setDcData((prevData) => ({
      ...prevData,
      [dc]: [...prevData[dc], newEntry],
    }));
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  };

  setUpdatedDCData(dcData);

  return (
    <div className="font-sans h-full flex flex-col justify-between">
      <div>
        <h2 className="text-left text-2xl py-2 font-semibold px-4">
          Sub Assembly Components Plant & {activeDC}
        </h2>
        <div
          ref={tableRef}
          className="h-30 overflow-y-auto ml-4 border-2 border-opacity-50 border-gray-300 rounded-lg"
        >
          {activeDC === "DC1" && dcData?.DC1 !== "closed" && (
            <table className="table-auto w-full border-separate border-spacing-2">
              <thead>
                <tr className="bg-gray-300">
                  <th className="text-center py-1 text-lg font-medium">Name</th>
                  <th className="text-center py-1 text-lg font-medium">Supplier</th>
                  <th className="text-center py-1 text-lg font-medium">Medium</th>
                  <th className="text-center py-1 text-lg font-medium">Units</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {dcData[activeDC]?.map((entry, index) => (
                  <tr className="bg-white" key={index}>
                    <td className="text-center py-2">
                      <input
                        type="text"
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          !entry.name
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        value={entry.name}
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td className="text-center py-2">
                      <select
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          entry.supplier.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        name="supplier"
                        value={entry.supplier}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "supplier", e.target.value)
                        }
                      >
                        {supplierOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-center py-2">
                      <select
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          entry.medium.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        name="medium"
                        value={entry.medium}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "medium", e.target.value)
                        }
                      >
                        {mediumOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-center py-2">
                      <input
                        type="text"
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          !entry.units
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        value={entry.units}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "units", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeDC === "DC2" && dcData?.DC2 !== "closed" && (
            <table className="table-auto w-full border-separate border-spacing-2">
              <thead>
                <tr className="bg-gray-300">
                  <th className="text-center py-3 text-lg font-medium">Name</th>
                  <th className="text-center py-3 text-lg font-medium">Supplier</th>
                  <th className="text-center py-3 text-lg font-medium">Medium</th>
                  <th className="text-center py-3 text-lg font-medium">Units</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {dcData[activeDC]?.map((entry, index) => (
                  <tr className="bg-white" key={index}>
                    <td className="text-center py-2">
                      <input
                        type="text"
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          !entry.name
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        value={entry.name}
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td className="text-center py-2">
                      <select
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          entry.supplier.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        name="supplier"
                        value={entry.supplier}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "supplier", e.target.value)
                        }
                      >
                        {supplierOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-center py-2">
                      <select
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          entry.medium.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        name="medium"
                        value={entry.medium}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "medium", e.target.value)
                        }
                      >
                        {mediumOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-center py-2">
                      <input
                        type="text"
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          !entry.units
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        value={entry.units}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "units", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeDC === "DC3" && dcData?.DC3 !== "closed" && (
            <table className="table-auto w-full border-separate border-spacing-2">
              <thead>
                <tr className="bg-gray-300">
                  <th className="text-center py-3 text-lg font-medium">Name</th>
                  <th className="text-center py-3 text-lg font-medium">Supplier</th>
                  <th className="text-center py-3 text-lg font-medium">Medium</th>
                  <th className="text-center py-3 text-lg font-medium">Units</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {dcData[activeDC]?.map((entry, index) => (
                  <tr className="bg-white" key={index}>
                    <td className="text-center py-2">
                      <input
                        type="text"
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          !entry.name
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        value={entry.name}
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "name", e.target.value)
                        }
                      />
                    </td>
                    <td className="text-center py-2">
                      <select
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          entry.supplier.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        name="supplier"
                        value={entry.supplier}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "supplier", e.target.value)
                        }
                      >
                        {supplierOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-center py-2">
                      <select
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          entry.medium.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        name="medium"
                        value={entry.medium}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "medium", e.target.value)
                        }
                      >
                        {mediumOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-center py-2">
                      <input
                        type="text"
                        className={`p-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm sm:text-sm ${
                          !entry.units
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        }`}
                        value={entry.units}
                        onChange={(e) =>
                          handleInputChange(activeDC, index, "units", e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="h-16 flex justify-between items-center px-4 mt-4">
        <div className="flex space-x-4">
          <button
            onClick={() => handleDCButtonClick("DC1")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC1" && "bg-green-700"
            } disabled:bg-gray-400 disabled:cursor-default`}
            disabled={dcData?.DC1 === "closed"}
          >
            DC 1
          </button>
          <button
            onClick={() => handleDCButtonClick("DC2")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC2" && "bg-green-700"
            } disabled:bg-gray-400 disabled:cursor-default`}
            disabled={dcData?.DC2 === "closed"}
          >
            DC 2
          </button>
          <button
            onClick={() => handleDCButtonClick("DC3")}
            className={`h-10 px-4 bg-blue-600 text-white hover:bg-blue-800 text-lg rounded-lg ${
              activeDC === "DC3" && "bg-green-700"
            } disabled:bg-gray-400 disabled:cursor-default`}
            disabled={dcData?.DC3 === "closed"}
          >
            DC 3
          </button>
        </div>
        <div className="flex">
          <button
            onClick={() => onAddEntry(activeDC)}
            className="h-10 px-6 bg-green-600 text-white hover:bg-green-800 text-lg rounded-lg"
          >
            Add New
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainTable;