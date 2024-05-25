import { Toast } from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";

const SupplyChainTable = ({ setUpdatedDCData }) => {
  const tableRef = useRef(null);
  // <SupplyChainTable getDcdata={getDcData}  setUpdatedDCData={setUpdatedDCData} /> from parent
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDC, setActiveDC] = useState("DC1"); // Track active DC
  const procurementData = JSON.parse(localStorage.getItem("procurementData"));

  const supplierOptions = [
    "Select",
    "supplierA",
    "supplierB",
    "supplierC",
    "supplierD",
  ];
  const mediumOptions = ["Select", "Air", "Surface"];

  // State variables to hold data for each DC
  const [dcData, setDcData] = useState(procurementData?.sac_units);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  console.log("DC DATA", dcData);

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

    // Scroll to the bottom of the table when a new entry is added
    if (tableRef.current) {
      tableRef.current.scrollTop = tableRef.current.scrollHeight;
    }
  };
  // // Scroll to the bottom of the table when a new entry is added
  // useEffect(() => {
  //   if (tableRef.current) {
  //     tableRef.current.scrollBottom = tableRef.current.scrollHeight;
  //   }
  // }, [dcData]);

  // Function to pass updated data to the parent component
  setUpdatedDCData(dcData);

  return (
    <div
      style={{ fontFamily: "ABeeZee" }}
      className="flex h-full flex-col justify-between bg-slate-200"
    >
      <div className="">
        <h2 className="text-start text-xl py-1 font-semibold px-2  ">
          Sub Assembly Components Plant & {activeDC}
        </h2>
        <div
          ref={tableRef}
          className="h-100 ml-2 overflow-scroll border-2 border-opacity-50 border-blue-gray-200"
        >
          {/* Conditionally render tables based on activeDC */}
          {activeDC === "DC1" && dcData.DC1 !== "closed" && (
            <table className="table-auto w-full border-separate border-spacing-2 ">
              <thead>
                <tr className="bg-slate-300  ">
                  <th className="text-center py-3 text-lg ">Name</th>
                  <th className="text-center py-3 text-lg ">Supplier</th>
                  <th className="text-center py-3 text-lg ">Medium</th>

                  <th className="text-center py-3 text-lg w-28">Units</th>
                </tr>
              </thead>

              <tbody ref={tableRef} className="h-40 overflow-scroll-auto">
                {dcData[activeDC]?.map((entry, index) => (
                  <tr className="bg-slate-300 " key={index}>
                    <td className="text-center w-28 text-xl">
                      <input
                        type="text"
                        className={`p-2 pl-3 pr-2 w-28 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm  placeholder:text-red-400`}
                        value={entry.name}
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleInputChange(
                            activeDC,
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </td>

                    <td className="text-center py-2 text-xl ">
                      <p className="flex justify-center">
                        <select
                          className={`p-2 pl-3 pr-2 w-32 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                            entry.supplier.trim() === "Select"
                              ? "border-red-500 outline-red-500"
                              : " border-green-500 outline-green-500"
                          } placeholder:text-red-400`}
                          name="supplier"
                          value={entry.supplier}
                          onChange={(e) =>
                            handleInputChange(
                              activeDC,
                              index,
                              "supplier",
                              e.target.value
                            )
                          }
                        >
                          {supplierOptions?.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </p>
                    </td>
                    <td className="text-center py-2 text-xl">
                      <p className="flex justify-center">
                        <select
                          className={`p-2 pl-3 pr-2 w-32 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                            entry.medium.trim() === "Select"
                              ? "border-red-500 outline-red-500"
                              : " border-green-500 outline-green-500"
                          } placeholder:text-red-400`}
                          name="medium"
                          value={entry.medium}
                          onChange={(e) =>
                            handleInputChange(
                              activeDC,
                              index,
                              "medium",
                              e.target.value
                            )
                          }
                        >
                          {mediumOptions?.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </p>
                    </td>

                    <td className="text-center py-2 text-xl">
                      <input
                        type="text"
                        className={`p-2 pl-3 pr-2 w-32 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                          entry.units === ""
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        } placeholder:text-red-400`}
                        value={entry.units}
                        onChange={(e) =>
                          handleInputChange(
                            activeDC,
                            index,
                            "units",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeDC === "DC2" && dcData.DC2 !== "closed" && (
            <table className="table-auto w-full border-separate border-spacing-2 ">
              <thead>
                <tr className="bg-slate-300  ">
                  <th className="text-center py-3 text-lg ">Name</th>
                  <th className="text-center py-3 text-lg ">Supplier</th>
                  <th className="text-center py-3 text-lg ">Medium</th>

                  <th className="text-center py-3 text-lg w-28">Units</th>
                </tr>
              </thead>

              <tbody className="h-40 overflow-scroll">
                {dcData[activeDC]?.map((entry, index) => (
                  <tr className="bg-slate-300 " key={index}>
                    <td className="text-center w-28 text-xl">
                      <input
                        type="text"
                        className={`p-2 pl-3 pr-2 w-28 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm  placeholder:text-red-400`}
                        value={entry.name}
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleInputChange(
                            activeDC,
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="text-center py-2 text-xl ">
                      <p className="flex justify-center">
                        <select
                          className={`p-2 pl-3 pr-2 w-32 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                            entry.supplier.trim() === "Select"
                              ? "border-red-500 outline-red-500"
                              : " border-green-500 outline-green-500"
                          } placeholder:text-red-400`}
                          name="supplier"
                          value={entry.supplier}
                          onChange={(e) =>
                            handleInputChange(
                              activeDC,
                              index,
                              "supplier",
                              e.target.value
                            )
                          }
                        >
                          {supplierOptions?.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </p>
                    </td>
                    <td className="text-center py-2 text-xl">
                      <p className="flex justify-center">
                        <select
                          className={`p-2 pl-3 pr-2 w-32 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                            entry.medium.trim() === "Select"
                              ? "border-red-500 outline-red-500"
                              : " border-green-500 outline-green-500"
                          } placeholder:text-red-400`}
                          name="medium"
                          value={entry.medium}
                          onChange={(e) =>
                            handleInputChange(
                              activeDC,
                              index,
                              "medium",
                              e.target.value
                            )
                          }
                        >
                          {mediumOptions?.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </p>
                    </td>

                    <td className="text-center py-2 text-xl">
                      <input
                        type="text"
                        className={`p-2 pl-3 pr-2 w-32 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                          entry.units === ""
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        } placeholder:text-red-400`}
                        value={entry.units}
                        onChange={(e) =>
                          handleInputChange(
                            activeDC,
                            index,
                            "units",
                            e.target.value
                          )
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeDC === "DC3" && dcData.DC3 !== "closed" && (
            <table className="table-auto w-full border-separate border-spacing-2 ">
              <thead>
                <tr className="bg-slate-300  ">
                  <th className="text-center py-3 text-lg ">Name</th>
                  <th className="text-center py-3 text-lg ">Supplier</th>
                  <th className="text-center py-3 text-lg ">Medium</th>
                  <th className="text-center py-3 text-lg ">Demands</th>
                  <th className="text-center py-3 text-lg w-28">Units</th>
                </tr>
              </thead>

              <tbody className="h-40 overflow-scroll">
                {dcData[activeDC]?.map((entry, index) => (
                  <tr className="bg-slate-300 " key={index}>
                    <td className="text-center w-28 text-xl">
                      <input
                        type="text"
                        className={`p-2 pl-3 pr-2 w-28 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                          entry.demand.trim() === ""
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        } placeholder:text-red-400`}
                        value={entry.name}
                        placeholder="Enter Name"
                        onChange={(e) =>
                          handleInputChange(
                            activeDC,
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td className="text-center py-2 text-xl ">
                      <p className="flex justify-center">
                        <select
                          className={`p-2 pl-3 pr-2 w-32 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                            entry.supplier.trim() === "Select"
                              ? "border-red-500 outline-red-500"
                              : " border-green-500 outline-green-500"
                          } placeholder:text-red-400`}
                          name="supplier"
                          value={entry.supplier}
                          onChange={(e) =>
                            handleInputChange(
                              activeDC,
                              index,
                              "supplier",
                              e.target.value
                            )
                          }
                        >
                          {supplierOptions?.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </p>
                    </td>
                    <td className="text-center py-2 text-xl">
                      <p className="flex justify-center">
                        <select
                          className={`p-2 pl-3 pr-2 w-32 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                            entry.medium.trim() === "Select"
                              ? "border-red-500 outline-red-500"
                              : " border-green-500 outline-green-500"
                          } placeholder:text-red-400`}
                          name="medium"
                          value={entry.medium}
                          onChange={(e) =>
                            handleInputChange(
                              activeDC,
                              index,
                              "medium",
                              e.target.value
                            )
                          }
                        >
                          {mediumOptions?.map((option, i) => (
                            <option key={i} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </p>
                    </td>

                    <td className="text-center py-2 text-xl">
                      <input
                        type="text"
                        className={`p-2 pl-3 pr-2 w-32 mx-2 bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                          entry.units === ""
                            ? "border-red-500 outline-red-500"
                            : "border-green-500 outline-green-500"
                        } placeholder:text-red-400`}
                        value={entry.units}
                        onChange={(e) =>
                          handleInputChange(
                            activeDC,
                            index,
                            "units",
                            e.target.value
                          )
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

      <div className=" h-16 flex justify-end items-center">
        <div className="pagination">
          <button
            onClick={() => handleDCButtonClick("DC1")}
            className={`h-10 mx-1 bg-blue-gray-400 text-white hover:bg-slate-800 text-xl text-center cursor-pointer rounded-lg p-1.5 ${
              activeDC === "DC1" && "bg-green-800 "
            }  disabled:bg-gray-400  disabled:cursor-default`}
            disabled={dcData.DC1 === "closed"}
          >
            DC 1
          </button>
          {/* Similarly, handle buttons for DC2 and DC3 */}
          <button
            onClick={() => handleDCButtonClick("DC2")}
            className={`h-10 mx-1 bg-blue-gray-400 text-white hover:bg-slate-800 text-xl text-center cursor-pointer rounded-lg p-1.5 ${
              activeDC === "DC2" && "bg-green-800 "
            }  disabled:bg-gray-400 disabled:cursor-default `}
            disabled={dcData.DC2 === "closed"}
          >
            DC 2
          </button>
          <button
            onClick={() => handleDCButtonClick("DC3")}
            className={`h-10 mx-1 bg-blue-gray-400 text-white hover:bg-slate-800 text-xl text-center cursor-pointer rounded-lg p-1.5 ${
              activeDC === "DC3" && "bg-green-800 "
            }  disabled:bg-gray-400 disabled:cursor-default  `}
            disabled={dcData.DC3 === "closed"}
          >
            DC 3
          </button>
        </div>

        <div className="flex flex-row w-30 justify-center">
          <button
            onClick={() => onAddEntry(activeDC)}
            className="h-10 bg-blue-gray-400 text-white  hover:bg-slate-800 text-xl text-center cursor-pointer rounded-lg   p-1.5 mx-2 hover:bg-green-700  "
          >
            Add New
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainTable;
