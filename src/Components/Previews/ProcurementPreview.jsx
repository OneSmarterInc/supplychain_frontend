import React from "react";

const ProcurementPreview = ({ toggleModal, newsac_units }) => {
  return (
    <div>
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
      >
        <div className="relative p-4 w-[800px] max-w-3xl max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg  shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-2 border-b rounded-lg  dark:border-gray-600">
              <h3 className="text-xl mx-3 font-semibold text-gray-900 dark:text-white">
                Preview
              </h3>
              <button
                onClick={toggleModal}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg -lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* Modal body */}
            <table className="table-auto w-[700px] mx-auto">
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
                {newsac_units.map((entry, index) => (
                  <tr className="bg-slate-300 " key={index}>
                    <td className="text-center w-28  text-xl">
                      {/* {indexOfFirstItem + index + 1}  */}
                      {entry.name}
                    </td>
                    <td className="text-center py-2 text-xl ">
                      {/* {entry.supplier} */}
                      <p className="flex justify-center">
                        <span
                          className=" p-2 pl-3 pr-2 w-32 mx-2   bg-white border border-gray-300 rounded-lg -md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          name="supplier"
                        >
                          {entry.supplier}
                        </span>
                      </p>
                    </td>
                    <td className="text-center  text-xl">
                      {/* {entry.medium} */}
                      <p className="flex justify-center">
                        <span
                          className=" p-2 pl-3 pr-2 w-32 mx-2   bg-white border border-gray-300 rounded-lg -md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          name="supplier"
                        >
                          {entry.medium}
                        </span>
                      </p>
                    </td>
                    <td className="text-center  text-xl">{entry.demand}</td>
                    <td className="text-center text-xl">
                      {/* {entry.units} */}
                      <p
                        id="base-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg -lg focus:ring-blue-500 focus:border-blue-500 block w-28 m-2   p-2 text-center"
                        type="text"
                        name="units"
                      >
                        {entry.units}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Modal footer */}
            <div className="flex justify-end items-center p-4 md:p-3 border-t border-gray-200 rounded-lg -b dark:border-gray-600">
              <button
                onClick={toggleModal}
                type="button"
                className="h-10 bg-slate-400 rounded-lg -lg p-2 text-black text-center text-xl cursor-pointer  ease-in duration-150  place-items-start hover:cursor-pointer active:bg-violet-700 focus:bg-violet-500 active:outline-none hover:ring hover:ring-violet-400 mx-2 p-auto"
                data-modal-hide="default-modal"
              >
                All Fine
              </button>
              <button
                onClick={toggleModal}
                type="button"
                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg -lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                data-modal-hide="default-modal"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcurementPreview;
