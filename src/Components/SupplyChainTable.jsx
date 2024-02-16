import React, { useRef, useState } from "react";

const SupplyChainTable = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //supplier and medium options
  const supplierOptions = ["Select", "Supplier A", "Supplier B", "Supplier C"];
  const mediumOptions = ["Select", "Air", "Surface"];
  // let isEmpty = false;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  let newsac_unitsToPass = props.setNewsac_units;

  let [newsac_units, setNewsac_units] = useState({
    name: "Gamma",
    supplier: "",
    medium: "",
    units: "",
  });
  const [sac_units, setsac_units] = useState([
    {
      name: "Gamma",
      supplier: "Select",
      medium: "Air",
      demand: "74000",
      units: "15000",
    },
    {
      name: "Delta",
      supplier: "Supplier B",
      medium: "Select",
      demand: "74000",
      units: "",
    },
    {
      name: "Epsilon",
      supplier: "Select",
      medium: "Surface",
      demand: "10000",
      units: "20000",
    },
  ]);

  const handleInputChange = (index, key, value) => {
    const newsac_units = [...sac_units];
    newsac_units[index][key] = value;
    setsac_units(newsac_units);
  };

  //new entry on change
  let ref = useRef();
  const onchange = (e) => {
    let { name, value } = e.target;
    if (value >= 0 && !value.includes("-")) {
      setNewsac_units({ ...newsac_units, [name]: value });
    }
  };
  const onAddEntry = () => {
    const newEntry = {
      name: newsac_units.name,
      supplier: newsac_units.supplier,
      medium: newsac_units.medium,
      demand: "15000",
      units: newsac_units.units,
    };

    const newsac_unitsToPush = [...sac_units];
    newsac_unitsToPush.push(newEntry);
    setsac_units(newsac_unitsToPush);
    ref.current.click();
    alert("New Entry Added");
  };
  newsac_unitsToPass(sac_units);
  return (
    <div className="flex h-full flex-col justify-between bg-slate-200">
      {" "}
      <div className="">
        <h2 className="text-center text-3xl py-2  ">
          Sub Assembly Components Plant & DC-1
        </h2>
        <div className="h-64 overflow-scroll">
          <table className="table-auto w-full border-separate border-spacing-2 ">
            <thead>
              <tr className="bg-slate-300  ">
                <th className="text-center py-3 text-2xl ">Name</th>
                <th className="text-center py-3 text-2xl ">Supplier</th>
                <th className="text-center py-3 text-2xl ">Medium</th>
                <th className="text-center py-3 text-2xl ">Demands</th>
                <th className="text-center py-3 text-2xl w-28">Units</th>
              </tr>
            </thead>

            <tbody className="h-40 overflow-scroll">
              {sac_units.map((entry, index) => (
                <tr className="bg-slate-300 " key={index}>
                  <td className="text-center w-28  text-xl">
                    {/* {indexOfFirstItem + index + 1}  */}
                    {entry.name}
                  </td>
                  <td className="text-center py-2 text-xl ">
                    {/* {entry.supplier} */}
                    <p className="flex justify-center">
                      <select
                        className={` p-2 pl-3 pr-2 w-32 mx-2   bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm ${
                          entry.supplier.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : " border-green-500 outline-green-500"
                        } placeholder:text-red-400`}
                        name="supplier"
                        value={entry.supplier}
                        onChange={(e) =>
                          handleInputChange(index, "supplier", e.target.value)
                        }
                      >
                        {supplierOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </p>
                  </td>
                  <td className="text-center  text-xl">
                    {/* {entry.medium} */}
                    <p className="flex justify-center">
                      <select
                        className={`p-2 pl-3 pr-2 mx-2  bg-white border border-gray-300 rounded-lg -md shadow-sm sm:text-sm  ${
                          entry.medium.trim() === "Select"
                            ? "border-red-500 outline-red-500"
                            : " border-green-500 outline-green-500"
                        } placeholder:text-red-400`}
                        name="medium"
                        value={entry.medium}
                        onChange={(e) =>
                          handleInputChange(index, "medium", e.target.value)
                        }
                      >
                        {mediumOptions.map((option, i) => (
                          <option key={i} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </p>
                  </td>
                  <td className="text-center  text-xl">{entry.demand}</td>
                  <td className="text-center text-xl">
                    {/* {entry.units} */}
                    <input
                      id="base-input"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500 block w-28 m-2 p-2 text-center  ${
                        !entry.units.trim()
                          ? "border-red-500 outline-red-500"
                          : " border-green-500 outline-green-500"
                      } placeholder:text-red-400`}
                      type="number"
                      name="units"
                      placeholder="Enter Units"
                      value={entry.units}
                      onChange={(e) =>
                        handleInputChange(index, "units", e.target.value)
                      }
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Paginate */}
      <div className=" h-16 flex justify-end items-center">
        <div className="pagination">
          <button className="h-10  bg-gray-700 text-white  hover:bg-slate-800 text-xl text-center cursor-pointer rounded-lg   p-1.5">
            DC 1
          </button>
        </div>

        <div className="text-center">
          {/* temp preview btn */}
          {/* <button
            onClick={handleSubmitForPreview}
            className="h-10  bg-green-700 text-white  hover:bg-green-800 text-xl text-center cursor-pointer rounded-lg mx-2   p-1.5"
          >
            Submit for preview
          </button> */}
        </div>

        {/* Add New entries */}
        <div className="flex flex-row w-30 justify-center">
          {/* Modal start */}
          <div className="modal-start">
            {/* Modal toggle */}
            <button
              onClick={toggleModal}
              sac_units-modal-target="small-modal"
              sac_units-modal-toggle="small-modal"
              className="h-10  bg-gray-700 text-white  hover:bg-slate-800 text-xl text-center cursor-pointer rounded-lg   p-1.5 mx-2"
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
                  <div className="relative bg-white rounded-lg -lg shadow dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-2 md:p-2 border-b rounded-lg -t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Add a New Entry
                      </h3>
                      <button
                        onClick={toggleModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg -lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        sac_units-modal-hide="default-modal"
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500 block  w-[235px] p-2 text-center"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            onChange={onchange}
                            value={newsac_units.name}
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="supplier"
                            placeholder="select one"
                            value={newsac_units.supplier}
                            readOnly
                          />
                          <select
                            className="block w-full p-2 pl-3 pr-2 mx-2  bg-white border border-gray-300 rounded-lg -md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            name="supplier"
                            onChange={onchange}
                            value={newsac_units.supplier}
                          >
                            {supplierOptions.map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="select one"
                            name="medium"
                            value={newsac_units.medium}
                            readOnly
                          />
                          <select
                            className="block w-full p-2 pl-3 pr-2 mx-2  bg-white border border-gray-300 rounded-lg -md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            name="medium"
                            onChange={onchange}
                            value={newsac_units.medium}
                          >
                            {mediumOptions.map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
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
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500 block  w-[235px] p-2 text-center"
                            type="text"
                            name="units"
                            placeholder="Enter Units"
                            onChange={onchange}
                            value={newsac_units.units}
                            required
                          />
                        </p>
                      </div>
                    </form>
                    {/* Modal footer */}
                    <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-lg -b dark:border-gray-600">
                      <button
                        onClick={onAddEntry}
                        className=" h-10  bg-gray-700 text-white  hover:bg-slate-800 text-xl text-center cursor-pointer rounded-lg   p-1.5 w-24"
                      >
                        Add
                      </button>
                      <button
                        onClick={toggleModal}
                        type="button"
                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg -lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        sac_units-modal-hide="default-modal"
                        ref={ref}
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
