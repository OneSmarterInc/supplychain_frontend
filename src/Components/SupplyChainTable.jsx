import React, { useState } from "react";

const SupplyChainTable = () => {
  // Demo data

  const [data, setData] = useState([
    {
      entries: "Alpha",
      supplier: "Supplier 1",
      medium: "Medium 1",
      demand: "74000",
      units: "74000",
    },
    {
      entries: "Beta",
      supplier: "Supplier 2",
      medium: "Medium 2",
      demand: "10000",
      units: "10000",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onAddEntry = () => {
    const newEntry = {
      entries: "Beta",
      supplier: "New Supplier",
      medium: "New Medium",
      demand: "15000",
      units: "15000",
    };

    const newData = [...data];
    newData.push(newEntry);
    setData(newData);

    const lastPage = Math.ceil(newData.length / itemsPerPage);
    setCurrentPage(lastPage);
  };

  //supplierOptions
  const supplierOptions = [
    { value: "Supplier 1", label: "Supplier 1" },
    { value: "Supplier 2", label: "Supplier 2" },
    { value: "Supplier 3", label: "Supplier 3" },
  ];

  const mediumOptions = [
    { value: "Medium 1", label: "Medium 1" },
    { value: "Medium 2", label: "Medium 2" },
    { value: "Medium 3", label: "Medium 3" },
  ];

  return (
    <div className="flex h-full flex-col justify-between bg-slate-200">
      {" "}
      <div className="">
        <h2 className="text-center text-3xl py-2  ">
          Sub Assembly Components Plant & DC-1
        </h2>
        <table className="table-auto w-full border-separate border-spacing-2">
          <tr className="bg-slate-300  ">
            <th className="text-center py-3 text-2xl ">Entries</th>
            <th className="text-center py-3 text-2xl ">Supplier</th>
            <th className="text-center py-3 text-2xl ">Medium</th>
            <th className="text-center py-3 text-2xl ">Demands</th>
            <th className="text-center py-3 text-2xl w-28">Units</th>
          </tr>
          {/* tr starts */}
          {/* <tr className="bg-slate-300 ">
          <td className="text-center py-3 text-xl ">Beta</td>
          <td className="text-center py-3 text-xl ">
            {" "}
            <div className="flex justify-center">
              <select className="block w-full p-2 pl-3 pr-2 mx-2  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="option1">{supplierOptions[0].value}</option>
                <option value="option2">{supplierOptions[1].value}</option>
                <option value="option3">{supplierOptions[2].value}</option>
              </select>
            </div>
          </td>
          <td className="text-center  text-xl ">
            <div className="flex justify-center">
              <select className="block w-full p-2 pl-3 pr-2 mx-2   bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="option1">{mediumOptions[0].value}</option>
                <option value="option2">{mediumOptions[1].value}</option>
                <option value="option3">{mediumOptions[2].value}</option>
              </select>
            </div>
          </td>
          <td className="text-center py-3 text-xl ">74000</td>
          <td className="text-center py-3 text-xl ">74000</td>
        </tr> */}
          <tbody>
            {currentItems.map((entry, index) => (
              <tr className="bg-slate-300 " key={index}>
                <td className="text-center  text-xl">
                  {indexOfFirstItem + index + 1} {entry.entries}
                </td>
                <td className="text-center py-2 text-xl ">
                  {/* {entry.supplier} */}
                  <td className="flex justify-center">
                    <select className="block w-full p-2 pl-3 pr-2 mx-2  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="option1">
                        {supplierOptions[0].value}
                      </option>
                      <option value="option2">
                        {supplierOptions[1].value}
                      </option>
                      <option value="option3">
                        {supplierOptions[2].value}
                      </option>
                    </select>
                  </td>
                </td>
                <td className="text-center  text-xl">
                  {/* {entry.medium} */}
                  <td className="flex justify-center">
                    <select className="block w-full p-2 pl-3 pr-2 mx-2  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <option value="option1">{mediumOptions[0].value}</option>
                      <option value="option2">{mediumOptions[1].value}</option>
                      <option value="option3">{mediumOptions[2].value}</option>
                    </select>
                  </td>
                </td>
                <td className="text-center  text-xl">{entry.demand}</td>
                <td className="text-center  text-xl">{entry.units}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginate */}
      <div className=" h-16 flex justify-end items-center">
        <div className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className=" focus:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300  text-xl text-center mx-2 bg-slate-400 p-2 m1 rounded hover:cursor-pointer hover:scale-105"
              onClick={() => paginate(index + 1)}
            >
              DC {index + 1}
            </button>
          ))}
        </div>
        <p
          onClick={onAddEntry}
          className="active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-300 text-xl text-center mx-2 bg-slate-400 p-2 place-items-start rounded hover:cursor-pointer hover:scale-105"
        >
          Add New Entry+
        </p>
      </div>
    </div>
  );
};

export default SupplyChainTable;
