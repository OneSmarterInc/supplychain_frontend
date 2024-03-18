import React from "react";

const ProcurementPreview = ({ toggleModal, updatedDCData }) => {
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
            <div className="overflow-y-auto h-96">
              {Object.keys(updatedDCData).map((key, index) => (
                <div key={index} className="bg-slate-200 overflow-y-auto">
                  {updatedDCData[key] !== "closed" && (
                    <h2 className="text-xl mt-4 mb-2 font-semibold mx-3">
                      {key}
                    </h2>
                  )}
                  {updatedDCData[key] !== "closed" && (
                    <table className="table-auto w-[700px] mx-auto">
                      <thead className="text-2xl">
                        <tr className="bg-slate-300  ">
                          <th className="text-center py-3 text-xl ">Name</th>
                          <th className="text-center py-3 text-xl ">
                            Supplier
                          </th>
                          <th className="text-center py-3 text-xl ">Medium</th>
                          <th className="text-center py-3 text-xl ">Demands</th>
                          <th className="text-center py-3 text-xl w-28">
                            Units
                          </th>
                        </tr>
                      </thead>
                      <tbody className="h-40 overflow-scroll">
                        {updatedDCData[key] !== "closed" &&
                          updatedDCData[key].map((entry, index) => (
                            <tr key={index} className="bg-slate-300 ">
                              <td className="text-center w-28 text-xl">
                                {entry.name}
                              </td>
                              <td className="text-center py-2 text-xl">
                                {entry.supplier}
                              </td>
                              <td className="text-center py-2 text-xl">
                                {entry.medium}
                              </td>
                              <td className="text-center py-2 text-xl">
                                {entry.demand}
                              </td>
                              <td className="text-center py-2 text-xl">
                                {entry.units}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
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
