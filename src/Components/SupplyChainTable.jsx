import React, { useState } from "react";

const SupplyChainTable = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  let newDataToPass = props.setNewData;
  let [newData, setNewData] = useState({
    name: "",
    supplier: "",
    medium: "",
    units: "",
  });
  const [data, setData] = useState([
    {
      name: "Gamma",
      supplier: "Supplier A",
      medium: "Air",
      demand: "74000",
      units: "74000",
    },
    {
      name: "Delta",
      supplier: "Supplier B",
      medium: "Surface",
      demand: "74000",
      units: "74000",
    },
    {
      name: "Epsilon",
      supplier: "Supplier B",
      medium: "Surface",
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

  //new entry on change
  const onchange = (e) => {
    setNewData({ ...newData, [e.target.name]: [e.target.value] });
  };
  // console.log("name", newData);
  const onAddEntry = () => {
    const newEntry = {
      name: newData.name,
      supplier: newData.supplier,
      medium: newData.medium,
      demand: "15000",
      units: newData.units,
    };
    newDataToPass(newEntry);

    const newDataToPush = [...data];
    newDataToPush.push(newEntry);
    setData(newDataToPush);

    const lastPage = Math.ceil(newDataToPush.length / itemsPerPage);
    setCurrentPage(lastPage);
    toggleModal();
  };

  //supplierOptions
  const supplierOptions = [
    { value: "Supplier A" },
    { value: "Supplier B" },
    { value: "Supplier C" },
  ];

  const mediumOptions = [{ value: "Air" }, { value: "Surface" }];

  return (
    <div className="flex h-full flex-col justify-between bg-slate-200">
      {" "}
      <div className="">
        <h2 className="text-center text-3xl py-2  ">
          Sub Assembly Components Plant & DC-1
        </h2>
        <table className="table-auto w-full border-separate border-spacing-2">
          <thead>
            <tr className="bg-slate-300  ">
              <th className="text-center py-3 text-2xl ">Name</th>
              <th className="text-center py-3 text-2xl ">Supplier</th>
              <th className="text-center py-3 text-2xl ">Medium</th>
              <th className="text-center py-3 text-2xl ">Demands</th>
              <th className="text-center py-3 text-2xl w-28">Units</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((entry, index) => (
              <tr className="bg-slate-300 " key={index}>
                <td className="text-center w-28  text-xl">
                  {/* {indexOfFirstItem + index + 1}  */}
                  {entry.name}
                </td>
                <td className="text-center py-2 text-xl ">
                  {/* {entry.supplier} */}
                  <p className="flex justify-center">
                    <select
                      className=" p-2 pl-3 pr-2 w-32 mx-2   bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      name="supplier"
                      onChange={onchange}
                      value={newData.supplier}
                    >
                      <option value="supplier A">
                        {supplierOptions[0].value}
                      </option>
                      <option value="supplier B">
                        {supplierOptions[1].value}
                      </option>
                      <option value="supplier C">
                        {supplierOptions[2].value}
                      </option>
                    </select>
                  </p>
                </td>
                <td className="text-center  text-xl">
                  {/* {entry.medium} */}
                  <p className="flex justify-center">
                    <select
                      className=" p-2 pl-3 pr-2 mx-2  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      name="medium"
                      onChange={onchange}
                      value={newData.medium}
                    >
                      <option value="Air">{mediumOptions[0].value}</option>
                      <option value="Surface">{mediumOptions[1].value}</option>
                    </select>
                  </p>
                </td>
                <td className="text-center  text-xl">{entry.demand}</td>
                <td className="text-center text-xl">
                  {/* {entry.units} */}
                  <input
                    id="base-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 m-2   p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="units"
                    onChange={onchange}
                    value={newData.units}
                    required
                  />
                </td>
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
              className="h-10 bg-slate-400 rounded-lg p-2 text-black text-center text-xl cursor-pointer    place-items-start hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2"
              onClick={() => paginate(index + 1)}
            >
              DC {index + 1}
            </button>
          ))}
        </div>

        {/* Add New Product */}

        <div className="flex flex-row w-30 justify-center">
          {/* Modal start */}
          <div className="modal-start">
            {/* Modal toggle */}
            <button
              onClick={toggleModal}
              data-modal-target="small-modal"
              data-modal-toggle="small-modal"
              className="h-10 bg-slate-400 rounded-lg p-2 text-black text-center text-xl cursor-pointer    place-items-start hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2 p-auto"
              type="button"
            >
              Add New
            </button>

            {/* Main modal */}
            {isModalOpen && (
              <div
                id="default-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
              >
                <div className="relative p-4 w-96 max-w-2xl max-h-full">
                  {/* Modal content */}
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Add a New Entry
                      </h3>
                      <button
                        onClick={toggleModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="default-modal"
                      >
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    {/* Modal body */}
                    <form className="p-4 md:p-5 space-y-3" type="submit">
                      <div className="text-base text-start leading-relaxed text-gray-500 dark:text-gray-400">
                        <div className="text-xl flex justify-between  py-2">
                          <span
                            htmlFor="base-input"
                            className="pt-2  mr-3 text-start  text-base font-medium text-gray-900 dark:text-white"
                          >
                            Name:
                          </span>

                          <input
                            id="base-input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[235px] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="name"
                            onChange={onchange}
                            value={newData.name}
                          />
                        </div>
                        <p className="text-xl flex justify-between  py-2">
                          <label
                            htmlFor="base-input"
                            className="pt-2  mr-3 text-start  text-base font-medium text-gray-900 dark:text-white"
                          >
                            Supplier:
                          </label>
                          <input
                            id="base-input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="supplier"
                            placeholder="select one"
                            value={newData.supplier}
                            readOnly
                          />
                          <select
                            className="block w-full p-2 pl-3 pr-2 mx-2  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            name="supplier"
                            onChange={onchange}
                            value={newData.supplier}
                          >
                            <option value="supplier A">
                              {supplierOptions[0].value}
                            </option>
                            <option value="supplier B">
                              {supplierOptions[1].value}
                            </option>
                            <option value="supplier C">
                              {supplierOptions[2].value}
                            </option>
                          </select>
                        </p>
                        <p className="text-xl flex justify-between  py-2">
                          <label
                            htmlFor="base-input"
                            className="pt-2  mr-3 text-start  text-base font-medium text-gray-900 dark:text-white"
                          >
                            Medium:
                          </label>
                          <input
                            id="base-input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="select one"
                            name="medium"
                            value={newData.medium}
                            readOnly
                          />
                          <select
                            className="block w-full p-2 pl-3 pr-2 mx-2  bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            name="medium"
                            onChange={onchange}
                            value={newData.medium}
                          >
                            <option value="Air">
                              {mediumOptions[0].value}
                            </option>
                            <option value="Surface">
                              {mediumOptions[1].value}
                            </option>
                          </select>
                        </p>
                        <p className="text-xl flex justify-start  py-2">
                          <label
                            htmlFor="base-input"
                            className=" pt-1 mr-3 text-start  text-base font-medium text-gray-900 dark:text-white"
                          >
                            Demands:
                          </label>
                          <span>15000</span>
                        </p>
                        <p className="text-xl flex justify-between  py-2">
                          <label
                            htmlFor="base-input"
                            className="pt-2  mr-3 text-start  text-base font-medium text-gray-900 dark:text-white"
                          >
                            Units:
                          </label>
                          <input
                            id="base-input"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  w-[235px] p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="units"
                            onChange={onchange}
                            value={newData.units}
                            required
                          />
                        </p>
                      </div>
                    </form>
                    {/* Modal footer */}
                    <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={onAddEntry}
                        className=" h-10 bg-slate-400 rounded-lg p-2 text-black text-center text-xl cursor-pointer    place-items-start hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2 p-auto w-24 "
                      >
                        Add
                      </button>
                      <button
                        onClick={toggleModal}
                        type="button"
                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        data-modal-hide="default-modal"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Modal ends */}
        </div>
      </div>
    </div>
  );
};

export default SupplyChainTable;